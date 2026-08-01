import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { pageMetadata } from "@/lib/seo/metadata";
import { withBasePath } from "@/lib/site/basePath";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutTimeline } from "@/components/about/AboutTimeline";

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
    email: "tan.tran@pappmobility.com"
  },
  {
    name: "Martin Holk Rasmussen",
    role: { en: "Data Specialist", da: "Data Specialist" },
    image: "/images/team/martin-profile.png",
    linkedinUrl: "https://www.linkedin.com/in/martinholk/"
  },
  {
    name: "Alfred Röttger Rydahl",
    role: { en: "Software Developer", da: "Softwareudvikler" },
    image: "/images/team/alfred-profile.png",
    linkedinUrl: "https://www.linkedin.com/in/alfred-r%C3%B6ttger-rydahl-8a6707a2/"
  },
  {
    name: "Martine Winther",
    role: { en: "Development Consultant", da: "Udviklingskonsulent" },
    image: "/images/team/martine-profile.png",
    email: "martine.winther@pappmobility.com"
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
    linkedinUrl: "https://www.linkedin.com/in/v1max/"
  },
  {
    name: "Radim Theiner",
    role: { en: "Product Owner", da: "Product Owner" },
    image: "/images/team/radim-profile.png",
    linkedinUrl: "https://www.linkedin.com/in/therad/"
  },
  {
    name: "Henrik Gade Hyldgaard",
    role: { en: "System Engineer", da: "System engineer" },
    initials: "HH"
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
          <details className="open-application">
            <summary>
              <span>{locale === "da" ? "Slut dig til os!" : "Join us!"}</span>
              <strong>{locale === "da" ? "Åben ansøgning(m/f/d)" : "Open application (m/f/d)"}</strong>
              <em>{locale === "da" ? "København/Aarhus/eksternt" : "Copenhagen/Aarhus/remote"}</em>
              <ArrowDown aria-hidden="true" size={34} strokeWidth={2.4} />
            </summary>
            <div className="open-application__body">
              <h3>{locale === "da" ? "Jobbeskrivelse" : "Job description"}</h3>
              <div>
                <p>
                  {locale === "da"
                    ? "Klar til at være en del af noget større? Hos Papp Mobility er vi altid på udkig efter passionerede, fremsynede personer, der er lige så begejstrede for urban mobilitet, som vi er."
                    : "Ready to be part of something bigger? At Papp Mobility, we are always looking for passionate, forward-thinking people who are as excited about urban mobility as we are."}
                </p>
                <p>
                  {locale === "da"
                    ? "Uanset om du er en studerende, der leder efter en praktikplads, en professionel, der overvejer et karriereskift, eller en ekspert, der søger nye udfordringer, vil vi gerne høre fra dig. Dine unikke færdigheder og dit perspektiv kan være den manglende brik i vores stræben efter at omdefinere urban mobilitet."
                    : "Whether you are a student looking for an internship, a professional considering a career move, or an expert seeking new challenges, we would like to hear from you. Your skills and perspective may be the missing piece in our work to redefine urban mobility."}
                </p>
                <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                  {locale === "da" ? "Ansøg på Linkedin" : "Apply on LinkedIn"}
                </a>
              </div>
            </div>
          </details>
        </div>
      </Section>
    </>
  );
}
