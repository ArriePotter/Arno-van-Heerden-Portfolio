import type { Metadata } from "next";
import Link from "next/link";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { ScrollNav } from "@/components/ScrollNav";
import { WhyToggle } from "@/components/case-study/WhyToggle";
import styles from "@/components/case-study/CaseStudy.module.css";

export const metadata: Metadata = {
  title: "Project Khoisān · Arno van Heerden",
  description: "Case study: a training app that shows today's session first.",
};

// MOCK of the case-study layout. Structure: the 7 chapters of decision 0008. Layout rules
// from the Research page: chapter nav with "you are here" (teardown #4), role/constraints/
// timeline up front and what was cut (NN/g, evidence ledger), headings that tell the story
// on their own (NN/g layer-cake), image sections as a grey "pause" (teardown), the why shown
// with image + code + a toggle (moodboard, rauno.me steal), AI honesty (CLAUDE.md #7),
// "explore more" before the footer (teardown). Copy comes from the Khoisān brief; anything
// not decided yet is in [brackets].
// `tick`: each chapter's line in the side scroll nav (61 lines, a chapter every 10).
const chapters = [
  { id: "brief", label: "Brief", tick: 0 },
  { id: "discover", label: "Discover", tick: 10 },
  { id: "define", label: "Define + Explore", tick: 20 },
  { id: "iterations", label: "Iterations", tick: 30 },
  { id: "solution", label: "Solution", tick: 40 },
  { id: "result", label: "Result", tick: 50 },
  { id: "learn", label: "Measure & learn", tick: 60 },
];

function Chapter({
  id,
  n,
  heading,
  children,
}: {
  id: string;
  n: number;
  heading: string;
  children: React.ReactNode;
}) {
  const label = chapters.find((c) => c.id === id)?.label;
  return (
    <section id={id} className={styles.chapter} aria-labelledby={`${id}-h`}>
      <p className={styles.kicker}>
        {String(n).padStart(2, "0")} · {label}
      </p>
      <h2 id={`${id}-h`} className={styles.heading}>
        {heading}
      </h2>
      {children}
    </section>
  );
}

// A grey "pause" for visuals: only imagery, then the text continues (teardown: sananes.co).
function Pause({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <figure className={`${styles.pause} ${wide ? styles.wide : ""}`}>
      <div className={styles.shot} role="img" aria-label={`${label} (placeholder)`}>
        <span className={styles.placeholderTag}>Image</span>
      </div>
      <figcaption className={styles.figLabel}>{label}</figcaption>
    </figure>
  );
}

export default function KhoisanCaseStudy() {
  return (
    <>
      <header className={styles.top}>
        <Link href="/#work" className={styles.back}>
          <span aria-hidden="true">←</span> Work
        </Link>
        <a href="/resume.pdf" className={styles.resume}>
          Resume
        </a>
      </header>

      <main id="main" className={styles.page}>
        <div className={styles.layout}>
          {/* The home page's scroll nav, stood up on the left (wide screens); a simple
              chapter row on narrow screens. */}
          <div className={styles.sideNav}>
            <ScrollNav chapters={chapters} ticks={61} vertical label="Chapters" />
          </div>
          <ChapterNav chapters={chapters} />

          <div className={styles.content}>
            {/* Hero: what it is, one focal point, the facts a hiring manager looks for first. */}
            <section className={styles.hero} aria-labelledby="cs-title">
              <p className={styles.kicker}>Case study 01</p>
              <h1 id="cs-title" className={styles.title}>
                Project Khoisān
              </h1>
              <p className={styles.lede}>
                A training app that answers one question first: <em>what do I run today?</em>
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>Role</dt>
                  <dd>Design lead: research, direction, every decision</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd>AI-assisted: Claude made the frames and code</dd>
                </div>
                <div>
                  <dt>Users</dt>
                  <dd>Two trail runners preparing for MUT 60</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>Oct 2026 · a 3-week round</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>Web app, phone first</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>[Shipped / in use: to fill]</dd>
                </div>
              </dl>
            </section>

            <Pause label="Hero: today's session on both phones" wide />

            <article className={styles.chapters}>
            <Chapter id="brief" n={1} heading="Opening the app felt overwhelming">
              <p>
                When I opened the app on my phone, everything competed for attention and I
                didn&rsquo;t know where to start reading. What I needed in that moment was
                today&rsquo;s session, and I had to dig for it.
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Problem:</strong> no clear place to start; today&rsquo;s session is buried.
                </li>
                <li>
                  <strong>Goal:</strong> by race day, the app was the one place we used to understand
                  and follow our training.
                </li>
                <li>
                  <strong>Constraints:</strong> 3 weeks, two users, an existing plan engine we
                  didn&rsquo;t change.
                </li>
              </ul>
            </Chapter>

            <Chapter id="discover" n={2} heading="Trust, not features, was the riskiest assumption">
              <p>
                Both runners want to follow the plan strictly without second-guessing it, but
                neither has had a chance to trust an AI-adjusted plan yet. [Research findings
                with Daan: to fill.]
              </p>
              <blockquote className={styles.quote}>
                <p>&ldquo;We focus on our running, not on navigating the app.&rdquo;</p>
                <footer>Guiding principle from the brief</footer>
              </blockquote>
            </Chapter>

            <Chapter id="define" n={3} heading="Today's session first, everything else second">
              <p>
                In scope: today&rsquo;s session, why the plan changed, sign-in and onboarding. Out:
                stats, predicted finish time, race tips, a native app.
              </p>
              <Pause label="Directions explored: [A · B · C]" />
            </Chapter>

            <Chapter id="iterations" n={4} heading="[Six] rounds before the trail sign stuck">
              <p>
                Each version, and what forced the change: a dev limit, a research finding or a
                late change. [Versions and reasons: to fill from Khoisān&rsquo;s decision log.]
              </p>
              <div className={styles.versions}>
                {["v1", "v2", "v3"].map((v) => (
                  <figure key={v} className={styles.version}>
                    <div className={styles.shot} role="img" aria-label={`Version ${v} (placeholder)`}>
                      <span className={styles.placeholderTag}>{v}</span>
                    </div>
                    <figcaption className={styles.figLabel}>[What changed and why]</figcaption>
                  </figure>
                ))}
              </div>
            </Chapter>

            <Chapter id="solution" n={5} heading="Every screen answers “what do I run today?”">
              <p>
                The final design, with each key decision&rsquo;s why and its source. Switch the why
                on to see it on the screen itself.
              </p>
              <WhyToggle
                caption="Today's session"
                notes={[
                  {
                    label: "Today's session at the top",
                    why: "The brief's core need: know today's session within ~10 seconds of opening.",
                    source: "Khoisān brief, Q1 + Q4",
                  },
                  {
                    label: "Why the plan changed",
                    why: "Trust was the riskiest assumption, so changes to the plan are explained, not hidden.",
                    source: "Khoisān brief, Q2",
                  },
                  {
                    label: "[Decision 3]",
                    why: "[Why it works]",
                    source: "[Source]",
                  },
                ]}
              />
              <figure className={styles.code}>
                <figcaption className={styles.figLabel}>[Code that makes it work: placeholder]</figcaption>
                <pre>
                  <code>{`// Today's session comes first: everything else is one tap away.
const today = plan.sessions.find((s) => isToday(s.date));
return <TodayCard session={today} reason={today.changeReason} />;`}</code>
                </pre>
              </figure>
            </Chapter>

            <Chapter id="result" n={6} heading="[Live on both phones by 25 Oct]">
              <p>[What shipped: build and release. To fill after the release.]</p>
              <Pause label="Shipped screens" />
            </Chapter>

            <Chapter id="learn" n={7} heading="What we measured, skipped and would change">
              <ul className={styles.list}>
                <li>
                  <strong>Measured:</strong> can each of us say today&rsquo;s session within ~10 s of
                  opening? Monthly 1–5 trust rating. [Results: to fill.]
                </li>
                <li>
                  <strong>Cut, and why:</strong> stats, predicted finish time and race tips, to keep
                  the round to today&rsquo;s session.
                </li>
                <li>
                  <strong>Skipped:</strong> [phases skipped, named honestly, e.g. code before design].
                </li>
                <li>
                  <strong>Next time:</strong> [what I&rsquo;d change].
                </li>
              </ul>

              {/* AI honesty: who did what (CLAUDE.md non-negotiable #7). */}
              <aside className={styles.ai} aria-labelledby="ai-h">
                <h3 id="ai-h">Where AI helped, and where it didn&rsquo;t</h3>
                <p>
                  I framed the problem, did the research with Daan, chose the directions and
                  approved every step. Claude made the Figma frames and wrote the code. [Where it
                  failed: to fill.]
                </p>
              </aside>
            </Chapter>
            </article>
          </div>
        </div>

        {/* Explore more, just above the footer (teardown: sananes.co). */}
        <nav aria-label="More work" className={styles.more}>
          <p className={styles.kicker}>Explore more</p>
          <div className={styles.moreGrid}>
            <span className={styles.moreCard}>
              <span className={styles.figLabel}>Case study 02</span>
              Coming soon
            </span>
            <Link href="/#work" className={styles.moreCard}>
              <span className={styles.figLabel}>Back to</span>
              All work
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}
