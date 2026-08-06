"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { siteBasePath, withBasePath } from "@/lib/site/basePath";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<string | null>(null);

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

      setStatus(locale === "da" ? "Din mail-app åbnes med beskeden udfyldt." : "Your email app is opening with the message filled in.");
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
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
      <button className="papp-button papp-button--primary" type="submit">
        <span>{locale === "da" ? "Send henvendelse" : "Send enquiry"}</span>
      </button>
      {status ? (
        <div className="contact-form__success" role="status">
          <Image src={withBasePath("/images/ui/done.svg")} alt="" width={54} height={54} unoptimized />
          <p>{status}</p>
        </div>
      ) : null}
    </form>
  );
}
