#!/usr/bin/env python3
"""Nudge Claude to update project memory at the right moments.

Wired in .claude/settings.json. Reads the hook payload on stdin and, when a
trigger fires, injects a short reminder into Claude's context. It never blocks
anything: on any error it exits silently.

Triggers
- UserPromptSubmit: Arno states a preference, rule or decision, or asks to
  remember something; plus a periodic checkpoint every CHECKPOINT_EVERY prompts.
- PostToolUse (Bash): a PR merge or a push. These are milestones.
- SessionStart (compact/resume): context was lost or restored, so re-check
  that "where we left off" is current.
"""
import json
import os
import re
import sys
import tempfile

CHECKPOINT_EVERY = 12

DECISION_PATTERNS = re.compile(
    r"\b("
    r"remember|memory|from now on|going forward|in future|"
    r"always|never|stop (doing|using)|don'?t (ever|do that)|"
    r"i prefer|my preference|i'?d rather|"
    r"approved|i agree|agreed|decided|decision|let'?s go with|we'?ll go with|go with option"
    r")\b",
    re.IGNORECASE,
)

MILESTONE_COMMANDS = re.compile(r"\b(gh pr merge|git push)\b")

RULE = (
    "Memory rule (CLAUDE.md > Memory): save durable facts to project memory: "
    "preferences/corrections (feedback), decisions and project state (project), "
    "accounts/tools/links (reference). Update an existing memory instead of duplicating, "
    "and skip anything already recorded in the repo or only relevant to this conversation."
)


def emit(event, text):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": event, "additionalContext": text}}))


def bump_counter(session_id):
    path = os.path.join(tempfile.gettempdir(), f"avh-memory-nudge-{session_id or 'nosession'}")
    try:
        with open(path) as f:
            count = int(f.read().strip() or 0) + 1
    except (OSError, ValueError):
        count = 1
    with open(path, "w") as f:
        f.write(str(count))
    return count


def main():
    data = json.load(sys.stdin)
    event = data.get("hook_event_name", "")

    if event == "UserPromptSubmit":
        prompt = data.get("prompt", "")
        count = bump_counter(data.get("session_id"))
        if DECISION_PATTERNS.search(prompt):
            emit(event, "This message may contain a preference, rule or decision from Arno. "
                        "If it is durable, save or update the matching memory now, and tell Arno in one line. "
                        "Decisions about the product also get a docs/decisions record. " + RULE)
        elif count % CHECKPOINT_EVERY == 0:
            emit(event, f"Checkpoint ({count} prompts this session): briefly check whether project memory "
                        "('Where we left off' in design-career-roadmap.md and any new preferences) is current; "
                        "update it if not, without interrupting the task. " + RULE)

    elif event == "PostToolUse":
        command = (data.get("tool_input") or {}).get("command", "")
        if MILESTONE_COMMANDS.search(command):
            emit(event, "Milestone reached (push/merge). Update 'Where we left off' in project memory: "
                        "what just shipped, what's next, anything pending. " + RULE)

    elif event == "SessionStart":
        if data.get("source") in ("compact", "resume"):
            emit(event, "Context was compacted or resumed. Re-read MEMORY.md and 'Where we left off' "
                        "before continuing, and save anything from the recent work that isn't recorded yet.")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
