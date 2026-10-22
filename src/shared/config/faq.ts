export interface FaqItem {
  question: string;
  answer: string;
}

// i18n keys of the platform FAQ (texts live in locales under "faq")
export const FAQ_ITEMS: FaqItem[] = [
  "platform",
  "registration",
  "criteria",
  "benefits",
  "review",
].map((key) => ({
  question: `faq.${key}.question`,
  answer: `faq.${key}.answer`,
}));
