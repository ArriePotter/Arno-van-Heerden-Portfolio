import { AboutPage } from "@/components/AboutPage";
import { BackgroundWhy } from "@/components/BackgroundWhy";
import { ContactPage } from "@/components/ContactPage";
import { Cover } from "@/components/Cover";
import { CoverFooter } from "@/components/CoverFooter";
import { IntroZoom } from "@/components/IntroZoom";
import { MenuBar } from "@/components/MenuBar";
import { OpeningPage } from "@/components/OpeningPage";
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
        <ContactPage />
      </main>
    </>
  );
}
