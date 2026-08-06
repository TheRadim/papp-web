import type { Locale, Testimonial } from "@/content/types";

export const testimonials: Testimonial[] = [
  {
    slug: "aarhus-data-basis",
    quote: {
      en: "Papp's data and sparring helped create a decision basis for business-parking work in Aarhus.",
      da: "Papps data og sparring var en stor hjælp i arbejdet med beslutningsgrundlag for erhvervsparkering i Aarhus."
    },
    organisation: "Aarhus Kommune",
    published: true,
    contentStatus: "needs-review"
  },
  {
    slug: "faaborg-city-development",
    quote: {
      en: "The collaboration opened several new efforts around city-centre behaviour and long-term urban development.",
      da: "Samarbejdet åbnede for flere nye indsatser omkring adfærd i bymidten og langsigtet byudvikling."
    },
    organisation: "Faaborg-Midtfyn Kommune",
    published: true,
    contentStatus: "needs-review"
  },
  {
    slug: "herning-useful-data",
    quote: {
      en: "Papp Mobility delivered usable data that strengthened parking and mobility work.",
      da: "Papp Mobility leverede brugbare data, der styrkede arbejdet med parkering og mobilitet."
    },
    organisation: "Herning Kommune",
    published: true,
    contentStatus: "needs-review"
  },
  {
    slug: "damhustorvet-camera-insight",
    quote: {
      en: "Papp Mobility delivered valuable insight into the actual use of the parking area at Damhustorvet and created a solid data basis for future initiatives. The battery-powered camera solution was easy to implement and gave detailed insight into parking behaviour and traffic patterns.",
      da: "Papp Mobility har leveret værdifuld indsigt i den faktiske anvendelse af parkeringsområdet på Damhustorvet og skabt et solidt datagrundlag for fremtidige tiltag. Den batteridrevne kameraløsning var nem at implementere og gav detaljeret indsigt i parkeringsadfærd og trafikmønstre."
    },
    organisation: "Damhustorvet case",
    published: false,
    contentStatus: "approved"
  }
];

export function getTestimonials(_locale: Locale) {
  return testimonials.filter((testimonial) => testimonial.published);
}

export function getTestimonialBySlug(slug: string) {
  return testimonials.find((testimonial) => testimonial.slug === slug);
}
