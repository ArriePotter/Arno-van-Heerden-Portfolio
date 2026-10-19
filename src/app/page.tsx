import { AboutPage } from "@/components/AboutPage";
import { BackgroundWhy } from "@/components/BackgroundWhy";
import { Cover } from "@/components/Cover";
import { CoverFooter } from "@/components/CoverFooter";
import { IntroZoom } from "@/components/IntroZoom";
import { MenuBar } from "@/components/MenuBar";
import { OpeningPage } from "@/components/OpeningPage";
import { Placeholder } from "@/components/Placeholder";
import { WorkPage } from "@/components/WorkPage";

export default function Home() {
  return (
    <>
      <BackgroundWhy />
      <CoverFooter />
      <MenuBar />
      <main id="main" className="relative z-1">
        <Cover />
        <IntroZoom intro={<OpeningPage />} work={<WorkPage />} />
        <AboutPage />
        <Placeholder id="contact" title="Get in touch" />
      </main>
    </>
  );
}
