import { Cover } from "@/components/Cover";
import { MenuBar } from "@/components/MenuBar";
import { OpeningPage } from "@/components/OpeningPage";
import { Placeholder } from "@/components/Placeholder";

export default function Home() {
  return (
    <>
      <MenuBar />
      <main id="main">
        <Cover />
        <OpeningPage />
        <Placeholder id="work" title="Work" />
        <Placeholder id="about" title="About" />
        <Placeholder id="contact" title="Get in touch" />
      </main>
    </>
  );
}
