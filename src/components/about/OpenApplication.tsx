"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";

interface OpenApplicationProps {
  locale: Locale;
}

export function OpenApplication({ locale }: OpenApplicationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="open-application" data-open={isOpen}>
      <p className="open-application__kicker">{locale === "da" ? "Slut dig til os!" : "Join us!"}</p>
      <button
        type="button"
        className="open-application__toggle"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{locale === "da" ? "Åben ansøgning(m/f/d)" : "Open application (m/f/d)"}</span>
        <em>{locale === "da" ? "København/Aarhus/eksternt" : "Copenhagen/Aarhus/remote"}</em>
        <ArrowDown aria-hidden="true" size={28} strokeWidth={2.2} />
      </button>
      <div className="open-application__panel" aria-hidden={!isOpen}>
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
      </div>
    </section>
  );
}
