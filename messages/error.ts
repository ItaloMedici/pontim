// Helper function to get random error message with translations
export const getRandomErrorMessage = (t: (key: string) => string): string => {
  const errorKeys = [
    "general",
    "again",
    "somethingWrong",
    "tryAgain",
    "failed",
  ];
  const randomKey = errorKeys[Math.floor(Math.random() * errorKeys.length)];
  return t(`dashboard.shared.errors.${randomKey}`);
};
