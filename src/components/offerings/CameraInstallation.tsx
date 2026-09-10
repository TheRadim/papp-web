import Image from "next/image";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

export function CameraInstallation({ locale }: { locale: Locale }) {
  const da = locale === "da";
  const cards = [
    { image: "professional-installation", title: da ? "Professionel installation fra start" : "Professional installation from the start", body: da ? "Vi planlægger placering og dækning sammen med jer, monterer kameraet og kontrollerer måleområdet. I får en løsning, der passer til stedet og det spørgsmål, I skal have besvaret." : "We plan camera placement and coverage with you, mount the equipment and check the measurement area. You get a setup suited to the site and the question you need answered." },
    { image: "battery-solution", title: da ? "Batteridrevne målinger i op til tre uger" : "Battery-powered measurements for up to three weeks", body: da ? "Papps batteridrevne løsning gør kortvarige målinger enkle at sætte i gang. Brug den til at undersøge parkeringsmønstre, dokumentere en forsøgsordning eller sammenligne aktivitet før og efter en ændring." : "Papp’s battery-powered solution makes short-term measurement straightforward. Use it to study parking patterns, document a trial or compare activity before and after a change." },
    { image: "installed-camera", title: da ? "Langvarig installation, løbende indsigt" : "Long-term installation, ongoing insight", body: da ? "Ved løbende målinger planlægger vi en fast installation med strøm og forbindelse tilpasset stedet. Følg udviklingen over tid, og brug målingerne som grundlag for drift og planlægning." : "For ongoing measurement, we plan a permanent installation with power and connectivity suited to the location. Follow changes over time and use the measurements to inform operations and planning." }
  ];
  return (
    <section className="camera-installation papp-section">
      <div className="container">
        <div className="section-heading section-heading--start">
          <p className="eyebrow">{da ? "Installation" : "Installation"}</p>
          <h2>{da ? "Fra tre ugers måling til en varig løsning." : "From a three-week study to a lasting solution."}</h2>
          <p>{da ? "Nem, professionel opsætning til både kortvarige projekter og langvarige installationer." : "Straightforward, professional setup for both short-term projects and long-term installations."}</p>
        </div>
        <div className="camera-installation__grid">
          {cards.map((card, index) => (
            <article key={card.image}>
              <Image src={withBasePath(`/images/camera/${card.image}.webp`)} alt={card.title} width={1600} height={1067} sizes="(max-width: 768px) 100vw, 33vw" />
              <div><span className="eyebrow">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
