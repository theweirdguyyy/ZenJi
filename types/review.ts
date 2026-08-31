export type FitFeedback = "Runs Small" | "True to Size" | "Runs Large";

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  fitFeedback: FitFeedback;
  tags?: string[];
  verifiedPurchase: boolean;
  userPhotos?: string[];
}
