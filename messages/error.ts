const errorMessages = [
  "Ops, algo deu errado",
  "Puts, de novo?",
  "Vish, algo deu errado",
  "Vacilamos nessa, tenta de novo",
  "Deu ruim, algo deu errado",
];

export const randomErrorMessage =
  errorMessages[Math.floor(Math.random() * errorMessages.length)];
