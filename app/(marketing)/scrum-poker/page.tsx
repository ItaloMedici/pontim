"use client";

import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  FileText,
  Lightbulb,
  MessageSquare,
  PlayCircle,
  Target,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComoFuncionaPage() {
  const t = useTranslations("marketing.scrumPoker");
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
      icon: FileText,
      title: t("process.steps.preparation.title"),
      description: t("process.steps.preparation.description"),
      details: [
        t("process.steps.preparation.detail1"),
        t("process.steps.preparation.detail2"),
        t("process.steps.preparation.detail3"),
        t("process.steps.preparation.detail4"),
      ],
    },
    {
      icon: Users,
      title: t("process.steps.presentation.title"),
      description: t("process.steps.presentation.description"),
      details: [
        t("process.steps.presentation.detail1"),
        t("process.steps.presentation.detail2"),
        t("process.steps.presentation.detail3"),
        t("process.steps.presentation.detail4"),
      ],
    },
    {
      icon: Vote,
      title: t("process.steps.voting.title"),
      description: t("process.steps.voting.description"),
      details: [
        t("process.steps.voting.detail1"),
        t("process.steps.voting.detail2"),
        t("process.steps.voting.detail3"),
        t("process.steps.voting.detail4"),
      ],
    },
    {
      icon: Eye,
      title: t("process.steps.reveal.title"),
      description: t("process.steps.reveal.description"),
      details: [
        t("process.steps.reveal.detail1"),
        t("process.steps.reveal.detail2"),
        t("process.steps.reveal.detail3"),
        t("process.steps.reveal.detail4"),
      ],
    },
    {
      icon: MessageSquare,
      title: t("process.steps.consensus.title"),
      description: t("process.steps.consensus.description"),
      details: [
        t("process.steps.consensus.detail1"),
        t("process.steps.consensus.detail2"),
        t("process.steps.consensus.detail3"),
        t("process.steps.consensus.detail4"),
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t("benefits.items.accuracy.title"),
      description: t("benefits.items.accuracy.description"),
    },
    {
      icon: Users,
      title: t("benefits.items.engagement.title"),
      description: t("benefits.items.engagement.description"),
    },
    {
      icon: Lightbulb,
      title: t("benefits.items.knowledge.title"),
      description: t("benefits.items.knowledge.description"),
    },
    {
      icon: Target,
      title: t("benefits.items.risks.title"),
      description: t("benefits.items.risks.description"),
    },
  ];

  return (
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
              {t("hero.badge")}
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {t("hero.title")}
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </BlurFade>
        </motion.header>

        {/* What is Scrum Poker */}
        <BlurFade delay={0.4} inView>
          <motion.section className="mb-20">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("whatIs.title")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("whatIs.description")}
              </p>
            </div>
          </motion.section>
        </BlurFade>

        {/* Process Steps */}
        <BlurFade delay={0.5} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("process.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("process.subtitle")}
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
                            {t("process.stepLabel").replace(
                              "{step}",
                              (index + 1).toString(),
                            )}
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
                {t("benefits.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("benefits.subtitle")}
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
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
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
                  {t("cta.title")}
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {t("cta.subtitle")}
                </p>
                <motion.a
                  href="/login"
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("cta.button")}
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
