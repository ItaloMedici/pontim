export function convertChoice(playerChoice: string) {
  return Buffer.from(playerChoice, "base64").toString();
}
