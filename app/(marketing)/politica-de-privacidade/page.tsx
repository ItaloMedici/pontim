import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Cookie,
  Database,
  Eye,
  FileText,
  Github,
  Globe,
  Lock,
  Mail,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

export default function PoliticaDePrivacidadePage() {
  const dataTypes = [
    {
      title: "Nome completo",
      description: "para identificação na plataforma",
    },
    {
      title: "Endereço de email",
      description: "para autenticação e comunicação",
    },
    {
      title: "Foto do perfil",
      description: "para personalização da interface",
    },
    {
      title: "ID único do Google",
      description: "para autenticação segura",
    },
  ];

  const usageData = [
    {
      title: "Dados de sessão",
      description: "salas criadas, participação em votações",
    },
    {
      title: "Preferências",
      description: "salas favoritas, configurações de usuário",
    },
    {
      title: "Histórico de votação",
      description: "escolhas feitas durante as estimativas",
    },
    {
      title: "Informações de assinatura",
      description: "plano ativo, status de pagamento",
    },
  ];

  const technicalData = [
    {
      title: "Endereço IP",
      description: "para segurança e localização aproximada",
    },
    {
      title: "User-Agent",
      description: "navegador e sistema operacional",
    },
    {
      title: "Dados de performance",
      description: "tempo de carregamento, erros",
    },
    {
      title: "Analytics",
      description: "através do Google Analytics (anonimizado)",
    },
  ];

  const userRights = [
    {
      icon: FileText,
      title: "Acesso e Portabilidade",
      items: [
        "Confirmação de tratamento",
        "Acesso aos dados",
        "Portabilidade dos dados",
      ],
    },
    {
      icon: Settings,
      title: "Correção e Exclusão",
      items: [
        "Correção de dados",
        "Eliminação dos dados",
        "Revogação do consentimento",
      ],
    },
  ];

  const securityMeasures = [
    "Criptografia TLS/SSL - todas as transmissões de dados",
    "Autenticação segura - OAuth 2.0 with Google",
    "Banco de dados seguro - PostgreSQL with backup criptografado",
    "Monitoramento - logs de segurança e detecção de anomalias",
    "Acesso restrito - apenas pessoal autorizado",
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Documento Legal
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Política de Privacidade
            </h1>

            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <p className="text-lg">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </header>

          <div className="space-y-12">
            {/* Introduction */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    1. Introdução
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A Pontim está comprometida com a proteção da sua privacidade
                    e dos seus dados pessoais. Esta Política de Privacidade
                    explica como coletamos, usamos, compartilhamos e protegemos
                    suas informações quando você usa nossa plataforma de Scrum
                    Poker, conforme as disposições da Lei Geral de Proteção de
                    Dados (LGPD - Lei 13.709/2018).
                  </p>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Resumo da Nossa Abordagem de Privacidade
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        Coletamos apenas dados essenciais para o funcionamento
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        Não vendemos seus dados para terceiros
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        Você pode excluir sua conta a qualquer momento
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        Usamos criptografia para proteger dados sensíveis
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        Somos transparentes sobre cookies e tracking
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Controller */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Controlador de Dados
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    O controlador de dados pessoais para fins desta política é o
                    projeto Pontim. Para questões relacionadas à privacidade,
                    entre em contato conosco através do email:{" "}
                    <a
                      href="mailto:support@pontim.org"
                      className="text-gray-800 underline hover:text-gray-900"
                    >
                      support@pontim.org
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    3. Dados Coletados
                  </h2>

                  <div className="space-y-8">
                    {/* Voluntary Data */}
                    <div className="border-l-4 border-gray-300 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        3.1 Dados Fornecidos Voluntariamente
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Quando você se cadastra via Google OAuth, coletamos:
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {dataTypes.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                          >
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Usage Data */}
                    <div className="border-l-4 border-gray-300 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        3.2 Dados de Uso da Plataforma
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Durante o uso do Pontim, coletamos automaticamente:
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {usageData.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                          >
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Data */}
                    <div className="border-l-4 border-gray-300 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        3.3 Dados Técnicos
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Coletamos automaticamente dados técnicos para melhorar o
                        serviço:
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {technicalData.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                          >
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Cookie className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    6. Cookies e Tecnologias Similares
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Cookies Essenciais
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium text-gray-800">
                              Sessão de autenticação
                            </div>
                            <div className="text-sm text-gray-600">
                              mantém você logado
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium text-gray-800">
                              Preferências
                            </div>
                            <div className="text-sm text-gray-600">
                              lembra suas configurações
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium text-gray-800">
                              CSRF Token
                            </div>
                            <div className="text-sm text-gray-600">
                              proteção contra ataques
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Cookies Analíticos
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium text-gray-800">
                              Google Analytics
                            </div>
                            <div className="text-sm text-gray-600">
                              entender uso da plataforma
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-medium text-gray-800">
                              Performance
                            </div>
                            <div className="text-sm text-gray-600">
                              monitorar velocidade e erros
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Controle de Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Você pode gerenciar cookies através das configurações do
                      seu navegador. Note que desabilitar cookies essenciais
                      pode afetar a funcionalidade da plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    8. Seus Direitos (LGPD)
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Conforme a LGPD, você tem os seguintes direitos:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {userRights.map((category, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <category.icon className="w-5 h-5 text-gray-600" />
                          <h3 className="font-semibold text-gray-900">
                            {category.title}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Como Exercer Seus Direitos
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Para exercer qualquer direito, envie um email para{" "}
                      <a
                        href="mailto:support@pontim.org"
                        className="text-gray-800 underline hover:text-gray-900"
                      >
                        support@pontim.org
                      </a>{" "}
                      com o assunto &quot;Direitos LGPD&quot;. Responderemos em
                      até 15 dias úteis.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    9. Segurança
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Implementamos medidas técnicas e organizacionais para
                    proteger seus dados:
                  </p>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <ul className="space-y-3">
                      {securityMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {measure}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  10. Transferência Internacional
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Alguns de nossos provedores estão localizados fora do Brasil
                  (Google, Stripe, Vercel). Asseguramos que essas transferências
                  atendem aos requisitos da LGPD através de cláusulas
                  contratuais adequadas.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  11. Menores de Idade
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nossa plataforma não é direcionada a menores de 16 anos. Não
                  coletamos intencionalmente dados de menores. Se tomarmos
                  conhecimento de coleta inadvertida, excluiremos os dados
                  imediatamente.
                </p>
              </div>
            </div>

            {/* Contact */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                15. Contato e DPO
              </h2>
              <p className="text-gray-700 mb-6">
                Para questões relacionadas à privacidade e proteção de dados:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="mailto:support@pontim.org"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email geral</div>
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

              <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Transparência Total
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  O Pontim é um projeto open-source. Você pode revisar nosso
                  código e práticas de dados no GitHub:
                </p>
                <a
                  href="https://github.com/ItaloMedici/pontim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Ver Código no GitHub
                </a>
              </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Dúvidas sobre Privacidade?
                </h3>
                <p className="text-gray-700 text-sm">
                  Estamos aqui para esclarecer qualquer questão sobre como
                  tratamos seus dados. Entre em contato conosco e responderemos
                  rapidamente.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
