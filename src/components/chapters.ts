// One entry per page in the scroll nav. `tick` is the tick (0–47) that marks the page.
export const chapters = [
  { id: "home", label: "Home", tick: 4 },
  { id: "intro", label: "Intro", tick: 12 },
  { id: "work", label: "Work", tick: 20 },
  { id: "about", label: "About", tick: 30 },
  { id: "contact", label: "Contact", tick: 40 },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
