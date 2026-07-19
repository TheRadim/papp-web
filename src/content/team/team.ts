import type { Locale, TeamMember } from "@/content/types";

export const team: TeamMember[] = [
  {
    slug: "team-placeholder",
    name: "Team details pending",
    role: { en: "Owner review needed", da: "Afventer ejerreview" },
    image: "/images/brand/papp-logo-round.png",
    published: false,
    contentStatus: "needs-content"
  }
];

export function getTeam(_locale: Locale) {
  return team.filter((member) => member.published);
}
