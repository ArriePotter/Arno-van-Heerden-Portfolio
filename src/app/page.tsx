import { BackgroundWhy } from "@/components/BackgroundWhy";
import { Cover } from "@/components/Cover";
import { CoverFooter } from "@/components/CoverFooter";
import { MenuBar } from "@/components/MenuBar";
import { OpeningPage } from "@/components/OpeningPage";
import { Placeholder } from "@/components/Placeholder";

export default function Home() {
  return (
    <>
      <BackgroundWhy />
      <CoverFooter />
      <MenuBar />
      <main id="main" className="relative z-1">
        <Cover />
        <OpeningPage />
        <Placeholder id="work" title="Work" />
        <Placeholder id="about" title="About" />
        <Placeholder id="contact" title="Get in touch" />
      </main>
    </>
  );
}
