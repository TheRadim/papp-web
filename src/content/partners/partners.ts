import type { Partner } from "@/content/types";

export const partners: Partner[] = [
  { slug: "varde", name: "Varde Kommune", logo: "/images/partners/varde.png", category: "client", published: true },
  { slug: "thisted", name: "Thisted Kommune", logo: "/images/partners/thisted.png", category: "client", published: true },
  { slug: "aalborg", name: "Aalborg Kommune", logo: "/images/partners/aalborg.png", category: "client", published: true },
  { slug: "aarhus-erhverv", name: "Aarhus Erhverv", logo: "/images/partners/aarhus-erhverv.png", category: "partner", published: true },
  { slug: "ishoej", name: "Ishøj Kommune", logo: "/images/partners/ishoej.png", category: "client", published: true },
  { slug: "herning", name: "Herning Kommune", logo: "/images/partners/herning.png", category: "client", published: true },
  { slug: "gentofte", name: "Gentofte Kommune", logo: "/images/partners/gentofte.png", category: "client", published: true },
  { slug: "frederiksberg", name: "Frederiksberg Kommune", logo: "/images/partners/frederiksberg.png", category: "client", published: true },
  { slug: "eifo", name: "EIFO", logo: "/images/partners/eifo.png", category: "supporter", published: true },
  { slug: "innovationsfonden", name: "Innovationsfonden", logo: "/images/partners/innovationsfonden.png", category: "supporter", published: true },
  { slug: "dtu", name: "DTU", logo: "/images/partners/dtu.png", category: "partner", published: true },
  { slug: "scanview", name: "Scanview", logo: "/images/partners/scanview.png", category: "partner", published: true }
];

export function getPartners() {
  return partners.filter((partner) => partner.published);
}
