export interface ContactPageData {
  headerSection: {
    title: { en: string; de: string };
    description: { en: string; de: string };
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  addressSection: {
    address: { en: string; de: string };
    googleMapEmbedUrl: string;
  };
  businessHours: Array<{
    day: string;
    time: string;
  }>;
  ctaSection: {
    ctaText: { en: string; de: string };
  };
}
