import { Logo } from "@/components/logo";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 py-8 px-4">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Logo.Text color="white" />
          <p className="text-gray-400 text-sm text-center">
            A plataforma que aprimora a colaboração em equipe, tornando a
            estimativa de tarefas fácil e eficiente. Pontue seus cards de forma
            divertida e rápida.
          </p>
        </div>

        <div className="w-full border-t border-gray-800" />

        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} Pontim. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
