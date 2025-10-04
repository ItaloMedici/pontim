export type AuthenticatedUser = {
  name: string;
  email: string;
  image?: string;
  planName?: string;
  id: string;
  isGuest?: false;
};
