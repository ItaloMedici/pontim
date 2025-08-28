"use client";

import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  PlayCircle,
  Target,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

export default function ComoFuncionaPage() {
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

  const steps = [
    {
      icon: Users,
      title: "Preparação da Sessão",
      description: "Reúna a equipe e prepare as histórias de usuário",
      details: [
        "Lista de histórias de usuário priorizadas",
        "Critérios de aceitação bem definidos",
        "Toda a equipe de desenvolvimento presente",
        "Product Owner disponível para esclarecimentos",
      ],
    },
    {
      icon: MessageSquare,
      title: "Apresentação da História",
      description: "Product Owner explica a tarefa para toda a equipe",
      details: [
        "Objetivos e valor de negócio",
        "Critérios de aceitação",
        "Requisitos técnicos",
        "Dependências e restrições",
      ],
    },
    {
      icon: Vote,
      title: "Votação Simultânea",
      description: "Todos escolhem uma carta ao mesmo tempo",
      details: [
        "Sequência de Fibonacci: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89",
        "Votação privada e simultânea",
        "Sem influência entre membros",
        "Estimativa baseada em complexidade relativa",
      ],
    },
    {
      icon: Target,
      title: "Revelação das Cartas",
      description: "Cartas são reveladas simultaneamente",
      details: [
        "Revelação sincronizada de todos os votos",
        "Identificação de divergências",
        "Evita viés de ancoragem",
        "Transparência total no processo",
      ],
    },
    {
      icon: CheckCircle,
      title: "Discussão e Consenso",
      description: "Equipe discute e chega ao consenso",
      details: [
        "Quem votou mais alto explica preocupações",
        "Quem votou mais baixo compartilha perspectiva",
        "Discussão técnica e esclarecimentos",
        "Nova rodada de votação se necessário",
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Estimativas mais precisas",
      description: "Combina conhecimento de toda a equipe",
    },
    {
      icon: Users,
      title: "Maior engajamento",
      description: "Todos participam ativamente do processo",
    },
    {
      icon: Lightbulb,
      title: "Transferência de conhecimento",
      description: "Discussões compartilham expertise",
    },
    {
      icon: Target,
      title: "Identificação de riscos",
      description: "Diferentes perspectivas revelam problemas",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Hero Section */}
          <motion.header
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                Guia Completo
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Como Funciona o <span className="text-black">Scrum Poker</span>?
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Aprenda passo a passo como usar o Scrum Poker (Planning Poker)
                para fazer estimativas ágeis precisas e eficazes com sua equipe.
              </p>
            </BlurFade>
          </motion.header>

          {/* What is Scrum Poker */}
          <BlurFade delay={0.4} inView>
            <motion.section className="mb-20">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  O que é Scrum Poker?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  O <strong>Scrum Poker</strong> (também conhecido como Planning
                  Poker) é uma técnica de estimativa ágil onde os membros da
                  equipe votam simultaneamente usando cartas numeradas para
                  estimar a complexidade das tarefas.
                </p>
              </div>
            </motion.section>
          </BlurFade>

          {/* Process Steps */}
          <BlurFade delay={0.5} inView>
            <motion.section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Como Funciona o Processo
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Siga estes 5 passos simples para conduzir uma sessão eficaz de
                  Planning Poker
                </p>
              </div>

              <motion.div
                className="space-y-8"
                variants={staggerChildren}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="relative"
                  >
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white">
                          <step.icon className="w-8 h-8" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <motion.div
                          className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300"
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                              Passo {index + 1}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-lg text-gray-600 mb-6">
                            {step.description}
                          </p>

                          <ul className="space-y-3">
                            {step.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="flex justify-center mt-6 mb-2">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </BlurFade>

          {/* Benefits */}
          <BlurFade delay={0.6} inView>
            <motion.section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Benefícios do Scrum Poker
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Descubra por que equipes ágeis escolhem o Scrum Poker para
                  suas estimativas
                </p>
              </div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                    className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </BlurFade>

          {/* CTA Section */}
          <BlurFade delay={0.7} inView>
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-black rounded-3xl p-8 md:p-12 text-center text-white">
                <div className="max-w-3xl mx-auto">
                  <PlayCircle className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Comece a usar Planning Poker hoje mesmo!
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    O Pontim oferece uma plataforma completa e gratuita para
                    suas sessões de Scrum Poker com sua equipe.
                  </p>
                  <motion.a
                    href="/login"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Criar Sala Gratuita
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.section>
          </BlurFade>
        </div>
      </div>

      <Footer />
    </>
  );
}
