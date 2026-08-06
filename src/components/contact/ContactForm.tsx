"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { siteBasePath } from "@/lib/site/basePath";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [isSentVisual, setIsSentVisual] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function playSentVisual() {
    setIsSentVisual(true);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsSentVisual(false);
      timerRef.current = null;
    }, 2500);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      privacyAccepted: form.get("privacyAccepted") === "on"
    };

    if (siteBasePath) {
      const subject = encodeURIComponent(`Website enquiry from ${payload.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          "",
          payload.message
        ].join("\n")
      );

      playSentVisual();
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    playSentVisual();

    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        {locale === "da" ? "Navn" : "Name"}
        <input name="name" required autoComplete="name" placeholder=" " />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" placeholder=" " />
      </label>
      <label className="contact-form__wide">
        {locale === "da" ? "Besked" : "Message"}
        <textarea name="message" required minLength={10} rows={6} placeholder=" " />
      </label>
      <label className="checkbox-label contact-form__wide">
        <input name="privacyAccepted" type="checkbox" required />
        <span>{locale === "da" ? "Jeg accepterer, at Papp kontakter mig om min henvendelse." : "I accept that Papp may contact me about this enquiry."}</span>
      </label>
      <button className={`papp-button papp-button--primary contact-form__submit ${isSentVisual ? "is-success" : ""}`} type="submit" disabled={isSentVisual}>
        <span className="contact-form__submit-text">{locale === "da" ? "Send henvendelse" : "Send enquiry"}</span>
        <svg className="contact-form__submit-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" pathLength="30" />
        </svg>
      </button>
    </form>
  );
}
