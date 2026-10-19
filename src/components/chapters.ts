// Number of lines in the home page scroll nav.
export const TICKS = 80;

// One entry per page in the scroll nav. `tick` is the line (0 to TICKS − 1) that marks
// the page: Home is the first line, Contact the last.
export const chapters = [
  { id: "home", label: "Home", tick: 0 },
  { id: "intro", label: "Intro", tick: 20 },
  { id: "work", label: "Work", tick: 40 },
  { id: "about", label: "About", tick: 60 },
  { id: "contact", label: "Contact", tick: 79 },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
