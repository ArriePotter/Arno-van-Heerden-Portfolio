// One entry per page in the scroll nav. `tick` is the tick (0–47) that marks the page:
// Home is the first tick, Contact the last.
export const chapters = [
  { id: "home", label: "Home", tick: 0 },
  { id: "intro", label: "Intro", tick: 12 },
  { id: "work", label: "Work", tick: 24 },
  { id: "about", label: "About", tick: 36 },
  { id: "contact", label: "Contact", tick: 47 },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
