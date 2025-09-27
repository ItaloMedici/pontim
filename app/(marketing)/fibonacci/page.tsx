"use client";

import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle,
  PlayCircle,
  Target,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function FibonacciPage() {
  const t = useTranslations("marketing.fibonacci");
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

  const reasons = [
    {
      icon: Target,
      title: t("whyWorks.uncertainty.title"),
      description: t("whyWorks.uncertainty.description"),
      details: [
        t("whyWorks.uncertainty.detail1"),
        t("whyWorks.uncertainty.detail2"),
        t("whyWorks.uncertainty.detail3"),
      ],
    },
    {
      icon: CheckCircle,
      title: t("whyWorks.decisions.title"),
      description: t("whyWorks.decisions.description"),
      details: [
        t("whyWorks.decisions.detail1"),
        t("whyWorks.decisions.detail2"),
        t("whyWorks.decisions.detail3"),
      ],
    },
    {
      icon: AlertCircle,
      title: t("whyWorks.precision.title"),
      description: t("whyWorks.precision.description"),
      details: [
        t("whyWorks.precision.detail1"),
        t("whyWorks.precision.detail2"),
        t("whyWorks.precision.detail3"),
      ],
    },
  ];

  const goldenRatioSteps = [
    { ratio: "3/2", result: "1.5" },
    { ratio: "5/3", result: "1.667" },
    { ratio: "8/5", result: "1.6" },
    { ratio: "13/8", result: "1.625" },
    { ratio: "21/13", result: "1.615" },
    { ratio: "∞", result: "1.618..." },
  ];

  const complexityMapping = [
    {
      level: t("practice.lowComplexity.title"),
      points: ["1", "2", "3"],
      color: "green",
      examples: [
        t("practice.lowComplexity.example1"),
        t("practice.lowComplexity.example2"),
        t("practice.lowComplexity.example3"),
      ],
    },
    {
      level: t("practice.mediumComplexity.title"),
      points: ["5", "8"],
      color: "yellow",
      examples: [
        t("practice.mediumComplexity.example1"),
        t("practice.mediumComplexity.example2"),
      ],
    },
    {
      level: t("practice.highComplexity.title"),
      points: ["13", "21+"],
      color: "red",
      examples: [t("practice.highComplexity.example1")],
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
              <Calculator className="w-4 h-4" />
              {t("hero.badge")}
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {t("hero.title")}
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </BlurFade>
        </motion.header>

        {/* What is Fibonacci */}
        <BlurFade delay={0.4} inView>
          <motion.section className="mb-20">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("whatIs.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t("whatIs.description")}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center">
                <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-xl">
                  {t("whatIs.cardTitle")}
                </h3>
                <div className="text-4xl font-mono font-bold text-gray-900 dark:text-white mb-4">
                  {t("whatIs.sequence")}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t("whatIs.explanation")}
                </p>
              </div>
            </div>
          </motion.section>
        </BlurFade>

        {/* Why Fibonacci Works */}
        <BlurFade delay={0.5} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("whyWorks.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("whyWorks.subtitle")}
              </p>
            </div>

            <motion.div
              className="space-y-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black">
                        <reason.icon className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {reason.description}
                      </p>

                      <ul className="space-y-2">
                        {reason.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* Golden Ratio */}
        <BlurFade delay={0.6} inView>
          <motion.section className="mb-20">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("goldenRatio.title")}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {t("goldenRatio.subtitle")}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  {t("goldenRatio.description")}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {t("goldenRatio.ratiosTitle")}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {goldenRatioSteps.map((step, index) => (
                    <div
                      key={index}
                      className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
                    >
                      <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                        {step.ratio}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        = {step.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t("goldenRatio.whyMatters")}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  {t("goldenRatio.whyMattersDescription")}
                </p>
              </div>
            </div>
          </motion.section>
        </BlurFade>

        {/* Complexity Mapping */}
        <BlurFade delay={0.7} inView>
          <motion.section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("practice.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("practice.subtitle")}
              </p>
            </div>

            <motion.div
              className="space-y-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {complexityMapping.map((mapping, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-2xl p-6 border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex gap-2">
                        {mapping.points.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white dark:text-black font-bold text-lg bg-gray-800 dark:bg-gray-200"
                          >
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                        {mapping.level}
                      </h3>
                      <ul className="space-y-2">
                        {mapping.examples.map((example, exampleIndex) => (
                          <li
                            key={exampleIndex}
                            className="text-sm text-gray-700 dark:text-gray-300"
                          >
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* CTA Section */}
        <BlurFade delay={0.8} inView>
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
                  {t("cta.title")}
                </h3>
                <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 leading-relaxed">
                  {t("cta.description")}
                </p>
                <motion.a
                  href="/login"
                  className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
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
