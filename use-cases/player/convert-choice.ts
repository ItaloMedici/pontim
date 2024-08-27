export function convertChoice(playerChoice: string) {
  return Buffer.from(playerChoice, "base64").toString();
}

export function hideChoice(playerChoice: string) {
  return Buffer.from(playerChoice).toString("base64");
}
