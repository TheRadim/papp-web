import Image from "next/image";
import { getPartners } from "@/lib/content/accessors";

export function PartnerLogoLoop() {
  const partners = getPartners();

  return (
    <div className="partner-strip" aria-label="Papp Mobility partners and collaborators">
      <div className="partner-track">
        {[...partners, ...partners].map((partner, index) => (
          <span key={`${partner.slug}-${index}`}>
            {partner.logo ? <Image src={partner.logo} alt={partner.name} width={150} height={80} /> : partner.name}
          </span>
        ))}
      </div>
    </div>
  );
}
