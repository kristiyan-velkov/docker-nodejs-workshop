export const BOOK_PRIZE = {
  title: "Docker for Frontend Developers",
  subtitle: "The Complete Guide for React.js Developers",
  author: "Kristiyan Velkov",
  authorTitle: "Docker Captain",
  url: "https://www.dockerfrontend.com",
  imageUrl:
    "https://dockerfrontend.com/docker-for-reactjs-developers-logo.png",
  stats: [
    { value: "450+", label: "Pages" },
    { value: "30", label: "Chapters" },
    { value: "50+", label: "Examples" },
  ],
  regularPrice: 54.99,
  currency: "USD",
} as const;

export const WORKSHOP_PRIZES = [
  {
    place: 1,
    label: "1st place",
    reward: "Free book",
    discount: 100,
    description:
      "The first participant to complete all workshop tasks wins the full eBook — completely free.",
    accent: "amber",
    icon: "trophy" as const,
  },
  {
    place: 2,
    label: "2nd place",
    reward: "90% off",
    discount: 90,
    description:
      "Second finisher gets the book for just $5.49 — a 90% discount on the full guide.",
    accent: "slate",
    icon: "medal" as const,
  },
  {
    place: 3,
    label: "3rd place",
    reward: "80% off",
    discount: 80,
    description:
      "Third finisher receives an 80% discount — pay only $10.99 for the complete eBook.",
    accent: "orange",
    icon: "medal" as const,
  },
] as const;

export const TOTAL_WORKSHOP_TASKS = 10;
