// Helper functions to get random messages with translations
export const getRandomWelcomeMessage = (t: (key: string) => string): string => {
  const welcomeKeys = [
    "jumped",
    "entered",
    "arrived",
    "cameToPlay",
    "inTheArea",
    "cameToAdd",
    "joinedUs",
    "inTheGame",
    "cameToScore",
  ];
  const randomKey = welcomeKeys[Math.floor(Math.random() * welcomeKeys.length)];
  return t(`dashboard.shared.welcome.joined.${randomKey}`);
};

export const getRandomLeaveMessage = (t: (key: string) => string): string => {
  const leaveKeys = [
    "leftRoom",
    "jumpedOut",
    "couldntHandle",
    "gaveUp",
    "wentAway",
    "didntWantToPlay",
    "didntWantAnything",
    "didntWantToRisk",
  ];
  const randomKey = leaveKeys[Math.floor(Math.random() * leaveKeys.length)];
  return t(`dashboard.shared.welcome.left.${randomKey}`);
};
