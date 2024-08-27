import { useBoard } from "@/context/board";

export const TextStatus = () => {
  const { reveal, totalChoices, totalPlayers, average } = useBoard();

  let text = `${totalChoices} de ${totalPlayers} votos 🗳️`;

  if (totalChoices === 0) {
    text = "Ninguém escolheu ainda... 😴";
  }

  if (totalChoices === totalPlayers) {
    text = "Todos escolheram! 🎉";
  }

  if (reveal) {
    text = `Temos uma média de ${average} pontos 📊`;
  }

  if (totalPlayers === 1) {
    text = "Sozinho por aqui... 😴, tente convidar mais jogadores!";
  }

  return <span className="text-sm text-gray-500">{text}</span>;
};
