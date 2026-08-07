import Link from "next/link";
import { Facebook, Linkedin, Mail } from "lucide-react";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-minimal">
          <div className="footer-social" aria-label={locale === "da" ? "Sociale links" : "Social links"}>
            <a href={company.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} aria-hidden="true" />
            </a>
            <a href={company.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
          <a className="footer-email" href={`mailto:${company.email}`} aria-label={company.email}>
            <span className="footer-envelope" aria-hidden="true">
              <Mail size={18} />
              <span className="footer-envelope__letter" />
            </span>
            <span>{company.email}</span>
          </a>
          <div className="footer-legal">
            <Link href={`/${locale}/privacy`}>{locale === "da" ? "Privatlivspolitik" : "Privacy Policy"}</Link>
            <span>© {company.copyrightYear} {company.legalName}.</span>
            <span>CVR {company.cvr}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
