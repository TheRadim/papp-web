import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { pageMetadata } from "@/lib/seo/metadata";
import { withBasePath } from "@/lib/site/basePath";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { OpenApplication } from "@/components/about/OpenApplication";

const timeline = [
  {
    date: { en: "August 2019", da: "August 2019" },
    title: { en: "The idea begins", da: "Idéens oprindelse" },
    body: {
      en: "Martin, Alfred and Tan imagine a parking knowledge-sharing platform after parking fines in Aarhus.",
      da: "Martin, Alfred og Tan udtænker en platform til vidensdeling om parkering som reaktion på p-bøder i Aarhus."
    }
  },
  {
    date: { en: "January 2020", da: "Januar 2020" },
    title: { en: "Prototype and launch", da: "Prototype og lancering" },
    body: {
      en: "Students create the first app prototype, leading to the company's establishment later that year.",
      da: "Studerende skaber den første app-prototype, hvilket fører til virksomhedens etablering senere samme år."
    }
  },
  {
    date: { en: "February 2021", da: "Februar 2021" },
    title: { en: "Data integration and AI", da: "Dataintegration og AI" },
    body: {
      en: "Aarhus collaboration integrates live data; AI-powered occupancy forecasting begins with grant support and the GTC Accelerate programme.",
      da: "Aarhus-samarbejde integrerer live-data; AI-drevet belægningsprognose igangsat med tilskud og GTC Accelerate-program."
    }
  },
  {
    date: { en: "May 2022", da: "Maj 2022" },
    title: { en: "IoT research and investment", da: "IoT-undersøgelse og -investering" },
    body: {
      en: "Discussions about the potential of IoT data collection begin; investment is secured; IoT testing starts with Aarhus Kommune.",
      da: "Diskussioner om IoT-dataindsamlingens potentiale begyndte; investering sikret; IoT-test indledt med Aarhus Kommune."
    }
  },
  {
    date: { en: "March 2023", da: "Marts 2023" },
    title: { en: "Papp Insights debuts", da: "Debut for Insights-værktøj" },
    body: {
      en: "Papp Insights launches, collecting data from parking garages, connected IoT sensors and external data sources.",
      da: "Lancering af værktøjet Papp Insights, der indsamler data fra parkeringshuse, tilsluttede IoT-sensorer og ekstern data."
    }
  },
  {
    date: { en: "Today", da: "I dag" },
    title: { en: "Intelligent mobility", da: "Intelligent mobilitet" },
    body: {
      en: "Papp's mission is to make city traffic smarter and more sustainable, respond to increasing urbanisation and support a more collaborative future.",
      da: "Papps mission, der fokuserer på intelligent mobilitet, er at gøre bytrafikken smartere og mere bæredygtig, imødekomme den stigende urbanisering og fremme en fremtid med samarbejde."
    }
  }
];

function linkedinSearch(name: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${name} Papp Mobility`)}`;
}

const teamMembers = [
  {
    name: "Tan Minh Nguyen Tran",
    role: { en: "CEO", da: "CEO" },
    image: "/images/team/tan-profile.png",
    email: "tan.tran@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/tanminhnguyentran/"
  },
  {
    name: "Martin Holk Rasmussen",
    role: { en: "Data Specialist", da: "Data Specialist" },
    image: "/images/team/martin-profile.png",
    email: "martin.rasmussen@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/martinholk/"
  },
  {
    name: "Alfred Röttger Rydahl",
    role: { en: "Software Developer", da: "Softwareudvikler" },
    image: "/images/team/alfred-profile.png",
    email: "alfred.rydahl@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/alfred-r%C3%B6ttger-rydahl-8a6707a2/"
  },
  {
    name: "Martine Winther",
    role: { en: "Development Consultant", da: "Udviklingskonsulent" },
    image: "/images/team/martine-profile.png",
    email: "martine.winther@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/martine-winther-54b29696/"
  },
  {
    name: "Carina Von Staffeldt Beck Mejlshede",
    role: { en: "Mechanical Engineer", da: "Mechanical Engineer" },
    image: "/images/team/carina-profile.jpg",
    linkedinUrl: "https://www.linkedin.com/in/carina-staffeldt-918b732b4/"
  },
  {
    name: "Maxim Zavidei",
    role: { en: "Backend Software Engineer", da: "Backend-softwareingeniør" },
    image: "/images/team/max-profile.png",
    email: "maxim.zavidei@pappmobility.com",
    linkedinUrl: "https://www.linkedin.com/in/v1max/"
  },
  {
    name: "Radim Theiner",
    role: { en: "Product Owner", da: "Product Owner" },
    image: "/images/team/radim-profile.png",
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
          <AboutTimeline items={timeline} locale={locale} />
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
                {member.image ? (
                  <Image
                    src={withBasePath(member.image)}
                    alt=""
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                  />
                ) : (
                  <span className="team-card__initials" aria-hidden="true">
                    {member.initials}
                  </span>
                )}
                <span className="team-card__scrim" aria-hidden="true" />
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
