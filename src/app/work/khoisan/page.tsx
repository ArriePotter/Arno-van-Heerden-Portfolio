import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Khoisān · Arno van Heerden",
};

// Placeholder so the Work card has somewhere to go; the case study is written next
// (7-chapter template, decision 0008).
export default function KhoisanCaseStudy() {
  return (
    <main id="main" className="grid min-h-svh place-content-center gap-4 px-6 text-center">
      <p className="font-mono text-xs tracking-wider text-text-muted uppercase">Case study 01</p>
      <h1 className="font-serif text-4xl">Project Khoisān</h1>
      <p className="text-text-muted">The full case study is coming next.</p>
      <Link href="/#work" className="underline underline-offset-4">
        Back to Work
      </Link>
    </main>
  );
}
