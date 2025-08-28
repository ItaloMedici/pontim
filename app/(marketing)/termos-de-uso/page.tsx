import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Github,
  Mail,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

export default function TermosDeUsoPage() {
  const serviceFeatures = [
    "Criação de salas de votação para Planning Poker",
    "Sistemas de votação (Fibonacci, T-shirt sizing, etc.)",
    "Votação em tempo real e sincronizada",
    "Notificações interativas com som",
    "Planos gratuitos e premium",
  ];

  const canDo = [
    "Usar a plataforma para estimativas ágeis legítimas",
    "Criar salas e convidar membros de sua equipe",
    "Compartilhar links de sala com participantes autorizados",
    "Utilizar as funcionalidades conforme documentado",
  ];

  const cannotDo = [
    "Usar a plataforma para fins ilegais ou não autorizados",
    "Tentar interferir, comprometer ou danificar a plataforma",
    "Fazer engenharia reversa ou tentar extrair código-fonte",
    "Usar bots, scripts ou outras ferramentas automatizadas não autorizadas",
    "Violar direitos de propriedade intelectual",
    "Transmitir spam, malware ou conteúdo malicioso",
    "Assediar, ameaçar ou intimidar outros usuários",
  ];

  const keyPoints = [
    "Use a plataforma de forma responsável e legal",
    "Mantenha sua conta segura",
    "Respeite outros usuários e a propriedade intelectual",
    "Leia nossa Política de Privacidade",
    "Entre em contato conosco em caso de dúvidas",
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Documento Legal
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Termos de Uso
            </h1>

            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <p className="text-lg">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </header>

          <div className="space-y-12">
            {/* Section 1 */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    1. Aceite dos Termos
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Ao acessar e usar a plataforma Pontim (
                    <strong>pontim.org</strong>), você concorda em cumprir e
                    estar vinculado a estes Termos de Uso. Se você não concordar
                    com qualquer parte destes termos, não deve usar nossa
                    plataforma.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Descrição do Serviço
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    O Pontim é uma plataforma open-source de Scrum Poker que
                    permite às equipes realizarem estimativas ágeis de forma
                    colaborativa e em tempo real. O serviço inclui:
                  </p>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <ul className="space-y-3">
                      {serviceFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    3. Cadastro e Conta de Usuário
                  </h2>

                  <div className="space-y-6">
                    <div className="border-l-4 border-gray-300 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        3.1 Requisitos de Cadastro
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Para utilizar certas funcionalidades, você deve criar
                        uma conta através do Google OAuth. Ao se cadastrar, você
                        declara que:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">
                            Todas as informações fornecidas são verdadeiras e
                            precisas
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">
                            Você tem capacidade legal para aceitar estes termos
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">
                            Você é maior de 16 anos de idade
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        3.2 Responsabilidade pela Conta
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Você é responsável por manter a confidencialidade de sua
                        conta e por todas as atividades realizadas através dela.
                        Notifique-nos imediatamente sobre qualquer uso não
                        autorizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 - Usage */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    4. Uso Aceitável
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Você PODE
                      </h3>
                      <ul className="space-y-3">
                        {canDo.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Você NÃO PODE
                      </h3>
                      <ul className="space-y-3">
                        {cannotDo.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional sections */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  5. Planos e Pagamentos
                </h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      5.1 Plano Gratuito
                    </h3>
                    <p className="text-gray-600">
                      Funcionalidades básicas com limites no número de salas,
                      participantes e rounds.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      5.2 Planos Premium
                    </h3>
                    <p className="text-gray-600">
                      Processados via Stripe com funcionalidades avançadas.
                      Cancelamento a qualquer momento.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      5.3 Reembolsos
                    </h3>
                    <p className="text-gray-600">
                      Não oferecemos reembolsos para serviços já prestados,
                      exceto quando exigido por lei.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  6. Propriedade Intelectual
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  O Pontim é licenciado sob MIT License. O código-fonte está
                  disponível no GitHub. Respeitamos os direitos de propriedade
                  intelectual e esperamos que os usuários façam o mesmo.
                </p>

                <h2 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                  7. Privacidade e Dados
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Coletamos e processamos dados pessoais conforme nossa{" "}
                  <a
                    href="/politica-de-privacidade"
                    className="text-gray-800 underline hover:text-gray-900"
                  >
                    Política de Privacidade
                  </a>
                  , em conformidade com a LGPD.
                </p>
              </div>
            </div>

            {/* Legal sections */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  8. Limitações de Responsabilidade
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  O Pontim é fornecido &quot;como está&quot; e &quot;conforme
                  disponível&quot;. Não garantimos que o serviço será
                  ininterrupto, seguro ou livre de erros. Nossa responsabilidade
                  é limitada ao máximo permitido por lei.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    9. Suspensão e Encerramento
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Podemos suspender ou encerrar sua conta por violação destes
                    termos. Você pode encerrar sua conta a qualquer momento.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    10. Modificações dos Termos
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Podemos modificar estes termos a qualquer momento. Mudanças
                    significativas serão comunicadas por email ou através da
                    plataforma.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  11. Lei Aplicável e Jurisdição
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estes termos são regidos pelas leis brasileiras. Qualquer
                  disputa será resolvida nos tribunais competentes do Brasil,
                  especificamente no foro da comarca de residência do réu.
                </p>
              </div>
            </div>

            {/* Contact section */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                12. Contato
              </h2>
              <p className="text-gray-700 mb-6">
                Para questões sobre estes Termos de Uso, entre em contato
                conosco:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="mailto:support@pontim.org"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">
                      support@pontim.org
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/ItaloMedici/pontim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">GitHub</div>
                    <div className="text-sm text-gray-600">
                      github.com/ItaloMedici/pontim
                    </div>
                  </div>
                </a>
              </div>
            </section>

            {/* Summary */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resumo dos Pontos Principais
                </h3>
                <ul className="space-y-2">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
