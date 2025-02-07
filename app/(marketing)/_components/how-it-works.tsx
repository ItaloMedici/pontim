"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const HowItWorks = () => {
  return (
    <section className="container py-20 bg-white">
      <motion.div
        className="mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-black"
          variants={itemVariants}
        >
          Como Funciona
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Comece a usar o Pontim em quatro passos simples
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative flex-1 min-w-[250px] max-w-[300px]"
              variants={itemVariants}
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
                <ArrowRight
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300"
                  aria-label="Próximo passo"
                  role="img"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
