import { Logo } from "@/components/logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 py-12 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <Logo.Text color="white" />
              <p className="text-gray-400 text-sm max-w-md">
                A plataforma que aprimora a colaboração em equipe, tornando a
                estimativa de tarefas fácil e eficiente. Pontue seus cards de
                forma divertida e rápida.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="bg-gray-100 hover:bg-gray-200 text-back px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Criar Sala Gratuita
                </Link>
                <Link
                  href="/pricing"
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Ver Planos
                </Link>
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Aprenda</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/scrum-poker"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Scrum Poker
                </Link>
              </li>
              <li>
                <Link
                  href="/story-points"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Story Points
                </Link>
              </li>
              <li>
                <Link
                  href="/fibonacci"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Fibonacci
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Blog</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Todos os Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/dicas-performance-planning-poker"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Dicas de Performance
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/metricas-eficiencia-planning"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Métricas de Eficiência
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/casos-reais-planning-poker"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Casos Reais
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Preços
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@pontim.org"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ItaloMedici/pontim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-800 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Pontim. Todos os direitos reservados.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 text-xs">
            <Link
              href="/termos-de-uso"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacidade
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Feito por Italo Medici</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
