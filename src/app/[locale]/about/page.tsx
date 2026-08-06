import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { OpenApplication } from "@/components/about/OpenApplication";

const timeline = [
  {
    date: { en: "August 2019", da: "August 2019" },
    title: { en: "The idea begins", da: "Idéens oprindelse" },
    body: {
      en: "Martin, Alfred and Tan start shaping a parking knowledge platform after parking fines in Aarhus.",
      da: "Martin, Alfred og Tan begynder at forme en platform til parkeringsviden efter p-bøder i Aarhus."
    },
    image: "/images/projects/sensors/sensordata-herning-cover.jpg"
  },
  {
    date: { en: "January 2020", da: "Januar 2020" },
    title: { en: "Prototype and launch", da: "Prototype og lancering" },
    body: {
      en: "The first app prototype is built, setting the foundation for the company later that year.",
      da: "Den første app-prototype bliver bygget og skaber grundlaget for virksomheden senere samme år."
    },
    image: "/images/app/papp-app-phone.png",
    imageFit: "contain" as const
  },
  {
    date: { en: "February 2021", da: "Februar 2021" },
    title: { en: "Data integration and AI", da: "Dataintegration og AI" },
    body: {
      en: "Live parking data and AI forecasting move from idea to active development.",
      da: "Live parkeringsdata og AI-prognoser går fra idé til aktiv udvikling."
    },
    image: "/images/projects/consultancy/dataoptimering-faaborg-cover.jpg"
  },
  {
    date: { en: "May 2022", da: "Maj 2022" },
    title: { en: "IoT research and investment", da: "IoT-undersøgelse og -investering" },
    body: {
      en: "Investment and early municipal testing turn IoT data collection into a real product track.",
      da: "Investering og tidlige kommunale tests gør IoT-dataindsamling til et konkret produktspor."
    },
    image: "/images/products/sensors/parking-sensor-closeup.jpg"
  },
  {
    date: { en: "March 2023", da: "Marts 2023" },
    title: { en: "Papp Insights debuts", da: "Debut for Insights-værktøj" },
    body: {
      en: "Papp Insights launches as the place where sensor, parking-house and external data meet.",
      da: "Papp Insights lanceres som stedet, hvor sensor-, parkeringshus- og eksterne data samles."
    },
    image: "/images/products/insights/papp-insights-current.png"
  },
  {
    date: { en: "August 2025", da: "August 2025" },
    title: { en: "Vehicle database integration", da: "Integration af bildatabase" },
    body: {
      en: "A strategic partnership adds vehicle type, fuel, brand and location intelligence to the data layer.",
      da: "Et strategisk partnerskab tilføjer biltype, drivmiddel, mærke og lokationsindsigt til datalaget."
    },
    image: "/images/projects/cameras/parkeringsmoenstre-ishoej-cover.jpg"
  },
  {
    date: { en: "December 2025", da: "December 2025" },
    title: { en: "Smart camera concept", da: "Smart kamera-koncept" },
    body: {
      en: "A battery-powered camera concept is developed to read parking and street activity with precision.",
      da: "Et batteridrevet kamerakoncept udvikles til præcist at aflæse aktivitet på parkeringspladser og gader."
    },
    image: "/images/products/cameras/camera-street-measurement.jpg"
  },
  {
    date: { en: "March 2026", da: "Marts 2026" },
    title: { en: "Papp AI", da: "Papp AI" },
    body: {
      en: "AI workflows help users understand their data faster and act without waiting for manual analysis.",
      da: "AI-arbejdsgange hjælper brugere med at forstå deres data hurtigere og handle uden at vente på manuel analyse."
    },
    image: "/images/projects/sensors/sensordata-herning-image12.png"
  },
  {
    date: { en: "September 2026", da: "September 2026" },
    title: { en: "Our own sensor", da: "Vores egen sensor" },
    body: {
      en: "After more than two years of development, Papp launches its first in-ground parking sensor.",
      da: "Efter mere end to års udvikling lancerer Papp sin første nedgravede parkeringssensor."
    },
    image: "/images/projects/sensors/iot-teknologi-varde-image1.jpg"
  },
  {
    date: { en: "November 2026", da: "November 2026" },
    title: { en: "Insights 2.0", da: "Insights 2.0" },
    body: {
      en: "Insights is rebuilt as a smarter 24/7 platform for navigating collected mobility intelligence.",
      da: "Insights genopbygges som en smartere 24/7-platform til at navigere i indsamlet mobilitetsviden."
    },
    image: "/images/products/insights/papp-insights-current.png"
  },
  {
    date: { en: "Today", da: "I dag" },
    title: { en: "Intelligent mobility", da: "Intelligent mobilitet" },
    body: {
      en: "Papp helps cities and operators make mobility decisions from real behaviour, not assumptions.",
      da: "Papp hjælper byer og operatører med at træffe mobilitetsbeslutninger ud fra reel adfærd, ikke antagelser."
    },
    image: "/images/hero/mobility-city-visual.png",
    imageFit: "contain" as const
  }
];

function linkedinSearch(name: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${name} Papp Mobility`)}`;
}

const teamMembers = [
  {
    name: "Tan Minh Nguyen Tran",
    role: { en: "CEO", da: "CEO" },
    email: "tan.tran@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/tanminhnguyentran/"
  },
  {
    name: "Martin Holk Rasmussen",
    role: { en: "Data Specialist", da: "Data Specialist" },
    email: "martin.rasmussen@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/martinholk/"
  },
  {
    name: "Alfred Röttger Rydahl",
    role: { en: "Software Developer", da: "Softwareudvikler" },
    email: "alfred.rydahl@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/alfred-r%C3%B6ttger-rydahl-8a6707a2/"
  },
  {
    name: "Martine Winther",
    role: { en: "Development Consultant", da: "Udviklingskonsulent" },
    email: "martine.winther@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/martine-winther-54b29696/"
  },
  {
    name: "Carina Von Staffeldt Beck Mejlshede",
    role: { en: "Mechanical Engineer", da: "Mechanical Engineer" },
    linkedinUrl: "https://www.linkedin.com/in/carina-staffeldt-918b732b4/"
  },
  {
    name: "Maxim Zavidei",
    role: { en: "Backend Software Engineer", da: "Backend-softwareingeniør" },
    email: "maxim.zavidei@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/v1max/"
  },
  {
    name: "Radim Theiner",
    role: { en: "Product Owner", da: "Product Owner" },
    email: "radim.theiner@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/therad/"
  },
  {
    name: "Henrik Gade Hyldgaard",
    role: { en: "System Engineer", da: "System engineer" },
    initials: "HH",
    email: "henrik.hyldgaard@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/henrik-gade-hyldgaard-17233240/"
  }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "About | Papp Mobility", da: "Om os | Papp Mobility" },
      description: {
        en: "Learn how Papp Mobility connects data collection, analysis and advisory work.",
        da: "Læs hvordan Papp Mobility forbinder dataindsamling, analyse og rådgivning."
      }
    },
    "/about"
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const timelineItems = timeline.map((item, index) =>
    index === 0
      ? {
          ...item,
          image: "/images/corporate/insights-meeting-city.jpg"
        }
      : {
          date: item.date,
          title: item.title,
          body: item.body
        }
  );

  return (
    <>
      <Section>
        <div className="about-hero-block">
          <SectionHeading
            eyebrow={locale === "da" ? "Om Papp" : "About Papp"}
            title={locale === "da" ? "Historien om Papp Mobility" : "The Story of Papp Mobility"}
            body={
              locale === "da"
                ? "Oplev vores historie. En dynamisk fortælling, der følger vores ydmyge begyndelse, banebrydende innovationer og urokkelige engagement i at revolutionere den måde, verden tilgår parkeringsløsninger på."
                : "Explore our story. A dynamic journey through our humble beginnings, breakthrough innovations and steady commitment to changing how the world approaches parking solutions."
            }
          />
        </div>
      </Section>
      <Section tone="soft">
        <div className="about-timeline-layout">
          <SectionHeading
            eyebrow={locale === "da" ? "Historie" : "History"}
            title={locale === "da" ? "Fra idé til intelligent mobilitet." : "From idea to intelligent mobility."}
            body={locale === "da" ? "Følg punkterne gennem Papps udvikling fra parkeringsapp til data, IoT og Insights." : "Follow the milestones as Papp moves from parking app to data, IoT and Insights."}
          />
          <AboutTimeline items={timelineItems} locale={locale} />
        </div>
      </Section>
      <Section>
        <div className="about-team-layout">
          <SectionHeading
            eyebrow={locale === "da" ? "Hvem er vi?" : "Who are we?"}
            title={locale === "da" ? "Mød de hjerner, der former fremtiden inden for parkeringsteknologi." : "Meet the minds shaping the future of parking technology."}
          />
          <div className="team-grid">
            {teamMembers.map((member) => (
              <a
                className="team-card"
                href={member.linkedinUrl ?? linkedinSearch(member.name)}
                key={member.name}
                rel="noreferrer"
                target="_blank"
                aria-label={`${member.name} on LinkedIn`}
              >
                <span className="team-card__portrait" aria-hidden="true">
                  <span>{member.initials ?? member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                </span>
                <span className="team-card__content">
                  <h3>{member.name}</h3>
                  <p>{member.role[locale]}</p>
                  <span>{member.email ?? company.email}</span>
                </span>
              </a>
            ))}
          </div>
          <OpenApplication locale={locale} />
        </div>
      </Section>
    </>
  );
}
