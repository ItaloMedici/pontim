"use client";

import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Lightbulb,
  PlayCircle,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export default function StoryPointsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const benefits = [
    {
      icon: Target,
      title: "Estimativa Mais Precisa",
      description: "Humanos são melhores em comparar tarefas relativamente",
    },
    {
      icon: Users,
      title: "Independente de Quem Executa",
      description:
        "Uma tarefa de 5 pontos continua sendo 5 pontos para qualquer desenvolvedor",
    },
    {
      icon: BarChart3,
      title: "Considera Múltiplos Fatores",
      description: "Complexidade, esforço e incerteza em uma única medida",
    },
  ];

  const scales = [
    {
      title: "Sequência de Fibonacci",
      subtitle: "Mais Popular",
      values: "1, 2, 3, 5, 8, 13, 21, 34, 55, 89",
      description:
        "A lacuna crescente reflete a maior incerteza em tarefas maiores",
      color: "blue",
    },
    {
      title: "T-shirt Sizing",
      subtitle: "Intuitivo",
      values: "XS, S, M, L, XL, XXL",
      description: "Mais intuitivo para equipes iniciantes",
      color: "green",
    },
    {
      title: "Potências de 2",
      subtitle: "Simples",
      values: "1, 2, 4, 8, 16, 32",
      description: "Simples e com crescimento exponencial",
      color: "purple",
    },
  ];

  const examples = [
    {
      points: "1 Ponto",
      title: "Tarefa Simples",
      items: [
        "Alterar texto de um botão",
        "Ajustar cor de um elemento",
        "Adicionar validação simples",
      ],
      color: "green",
    },
    {
      points: "3 Pontos",
      title: "Tarefa Média",
      items: [
        "Criar nova página de formulário",
        "Implementar funcionalidade básica",
        "Integração com API externa simples",
      ],
      color: "yellow",
    },
    {
      points: "8 Pontos",
      title: "Tarefa Complexa",
      items: [
        "Sistema de autenticação completo",
        "Dashboard com múltiplos gráficos",
        "Migração de dados complexa",
      ],
      color: "orange",
    },
    {
      points: "13+ Pontos",
      title: "Epic (Deve ser Quebrado)",
      items: [
        "Sistema de pagamentos completo",
        "Reestruturação de arquitetura",
        "Módulo completo de relatórios",
      ],
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Estimativas Ágeis
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              <span className="text-black dark:text-white">Story Points</span>
              <br />
              Guia Completo
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Entenda o que são Story Points, como usar essa técnica de
              estimativa ágil e por que ela é fundamental para equipes de
              desenvolvimento.
            </p>
          </BlurFade>
        </motion.header>

        {/* What are Story Points */}
        <BlurFade delay={0.4} inView>
          <motion.section className="mb-20">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    O que são Story Points?
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Story Points</strong> são uma unidade de medida
                    relativa usada em metodologias ágeis para estimar o esforço
                    necessário para completar uma User Story ou tarefa.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      <strong>Conceito Principal:</strong> Story Points não
                      medem tempo diretamente, mas sim a{" "}
                      <em>complexidade relativa</em> de uma tarefa comparada a
                      outras tarefas do projeto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </BlurFade>

        {/* Why use Story Points */}
        <BlurFade delay={0.5} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Por que usar Story Points?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Descubra as vantagens dessa técnica de estimativa ágil
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center text-white dark:text-black mx-auto mb-6">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* Scales */}
        <BlurFade delay={0.6} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Escalas Comuns de Story Points
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Escolha a escala que melhor se adapta à sua equipe
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {scales.map((scale, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium mb-2">
                      {scale.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {scale.title}
                    </h3>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="font-mono text-lg text-center text-gray-900 dark:text-white mb-2">
                      {scale.values}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {scale.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* Examples */}
        <BlurFade delay={0.7} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Exemplos Práticos de Story Points
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Veja como aplicar Story Points em diferentes tipos de tarefas
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white dark:text-black mx-auto mb-3 bg-gray-800 dark:bg-gray-200">
                      <span className="font-bold text-sm">
                        {example.points.split(" ")[0]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {example.points}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {example.title}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {example.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* Velocity Section */}
        <BlurFade delay={0.8} inView>
          <motion.section className="mb-20">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Velocidade da Equipe
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    A <strong>velocidade</strong> é a soma dos Story Points
                    completados em uma Sprint. Com o tempo, a equipe estabelece
                    uma velocidade média que permite planejamento mais preciso.
                  </p>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Exemplo de Velocidade
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Sprint 1: 23 pontos completados
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Sprint 2: 27 pontos completados
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Sprint 3: 25 pontos completados
                        </span>
                      </li>
                      <li className="flex items-center gap-2 font-semibold">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                        <span className="text-gray-900 dark:text-white">
                          Velocidade média: 25 pontos por sprint
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </BlurFade>

        {/* CTA Section */}
        <BlurFade delay={0.9} inView>
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center text-white dark:text-black">
              <div className="max-w-3xl mx-auto">
                <PlayCircle className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Experimente Story Points no Pontim
                </h3>
                <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 leading-relaxed">
                  Use diferentes escalas de Story Points durante suas sessões de
                  Planning Poker com Fibonacci, T-shirt sizing e escalas
                  personalizadas.
                </p>
                <motion.a
                  href="/login"
                  className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.section>
        </BlurFade>
      </div>
    </div>
  );
}
