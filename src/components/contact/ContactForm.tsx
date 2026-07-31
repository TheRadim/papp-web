"use client";

import { useState } from "react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { siteBasePath } from "@/lib/site/basePath";

interface ContactFormProps {
  locale: Locale;
}

const interests = ["Parking Sensors", "Camera Analytics", "Papp Insights", "Analysis", "Consultancy", "App", "Other"];

export function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      organisation: String(form.get("organisation") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      interest: String(form.get("interest") ?? ""),
      message: String(form.get("message") ?? ""),
      privacyAccepted: form.get("privacyAccepted") === "on"
    };

    if (siteBasePath) {
      const subject = encodeURIComponent(`Website enquiry from ${payload.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${payload.name}`,
          `Organisation: ${payload.organisation}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone || "-"}`,
          `Interest: ${payload.interest}`,
          "",
          payload.message
        ].join("\n")
      );

      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setStatus(locale === "da" ? "Din mail-app åbnes med beskeden udfyldt." : "Your email app is opening with the message filled in.");
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(
      response.ok
        ? locale === "da"
          ? "Tak. Beskeden er registreret."
          : "Thanks. Your message has been received."
        : locale === "da"
          ? "Levering er ikke konfigureret endnu. Skriv til hey@pappmobility.com."
          : "Delivery is not configured yet. Please email hey@pappmobility.com."
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        {locale === "da" ? "Navn" : "Name"}
        <input name="name" required autoComplete="name" placeholder=" " />
      </label>
      <label>
        {locale === "da" ? "Organisation" : "Organisation"}
        <input name="organisation" required autoComplete="organization" placeholder=" " />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" placeholder=" " />
      </label>
      <label>
        {locale === "da" ? "Telefon, valgfri" : "Phone, optional"}
        <input name="phone" autoComplete="tel" placeholder=" " />
      </label>
      <label className="contact-form__wide">
        {locale === "da" ? "Interesseområde" : "Area of interest"}
        <select name="interest" required defaultValue="">
          <option value="" disabled>
            {locale === "da" ? "Vælg område" : "Choose an area"}
          </option>
          {interests.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
      </label>
      <label className="contact-form__wide">
        {locale === "da" ? "Besked" : "Message"}
        <textarea name="message" required minLength={10} rows={6} placeholder=" " />
      </label>
      <label className="checkbox-label contact-form__wide">
        <input name="privacyAccepted" type="checkbox" required />
        <span>{locale === "da" ? "Jeg accepterer, at Papp kontakter mig om min henvendelse." : "I accept that Papp may contact me about this enquiry."}</span>
      </label>
      <button className="papp-button papp-button--primary" type="submit">
        <span>{locale === "da" ? "Send henvendelse" : "Send enquiry"}</span>
      </button>
      {status ? <p role="status">{status}</p> : null}
    </form>
  );
}
