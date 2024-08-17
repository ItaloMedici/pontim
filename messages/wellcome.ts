const wellcomeMessages = [
  "pulou sala 🪂",
  "entrou na sala 🎉",
  "chegou junto 🚀",
  "veio pra jogar 🎲",
  "está na área 🏟",
  "chegou pra somar 🧮",
  "colou com nóis 🤙",
  "está no jogo 🃏",
  "veio pra pontuar 🏆",
];

export const randomWellcomeMessage =
  wellcomeMessages[Math.floor(Math.random() * wellcomeMessages.length)];

const leaveMessages = [
  "saiu da sala 🏃‍♂️💨",
  "pulou fora 🪂",
  "não aguentou a pressão 🥵",
  "desistiu 🤦‍♂️",
  "foi embora 😢",
  "não quis jogar 😔",
  "não quis saber de nada 🙄",
  "não quis se arriscar 🤷‍♂️",
];

export const randomLeaveMessage =
  leaveMessages[Math.floor(Math.random() * leaveMessages.length)];
