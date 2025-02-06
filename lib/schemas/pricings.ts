export interface Pricing {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
