import { useBoard } from "@/context/board";

export const TextStatus = () => {
  const { reveal, totalChoices, totalPlayers } = useBoard();

  let text = `${totalChoices} de ${totalPlayers} votos 🗳️`;

  if (totalChoices === 0) {
    text = "Ninguém escolheu ainda... 😴";
  }

  if (totalChoices === totalPlayers) {
    text = "Todos escolheram! 🎉";
  }

  if (reveal) {
    text = "Revelado!";
  }

  return <span className="text-sm text-gray-500">{text}</span>;
};
