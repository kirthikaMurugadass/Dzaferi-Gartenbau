export interface ContactPageData {
  headerSection: {
    title: string;
    description: string;
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  addressSection: {
    address: string;
    googleMapEmbedUrl: string;
  };
  businessHours: Array<{
    day: string;
    time: string;
  }>;
  ctaSection: {
    ctaText: string;
  };
}
