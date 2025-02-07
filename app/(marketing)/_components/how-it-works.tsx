import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Crie uma Sala",
    description:
      "Configure uma sala privada de estimativas para sua equipe em segundos.",
  },
  {
    number: "02",
    title: "Convide sua Equipe",
    description:
      "Compartilhe o link da sala com os membros da equipe para entrada instantânea.",
  },
  {
    number: "03",
    title: "Comece a Votar",
    description:
      "Apresente as tarefas e permita que os membros votem usando cartas de planning poker.",
  },
  {
    number: "04",
    title: "Alcance o Consenso",
    description:
      "Discuta as estimativas e chegue a um consenso em equipe de forma eficiente.",
  },
];
export const HowItWorks = () => {
  return (
    <section className="container py-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-black">
          Como Funciona
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comece a usar o Pontim em quatro passos simples
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex-1 min-w-[250px] max-w-[300px]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-gray-900 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
