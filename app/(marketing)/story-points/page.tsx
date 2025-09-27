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
import { useTranslations } from "next-intl";

export default function StoryPointsPage() {
  const t = useTranslations("marketing.storyPoints");
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
      title: t("whyUse.accuracy.title"),
      description: t("whyUse.accuracy.description"),
    },
    {
      icon: Users,
      title: t("whyUse.independence.title"),
      description: t("whyUse.independence.description"),
    },
    {
      icon: BarChart3,
      title: t("whyUse.factors.title"),
      description: t("whyUse.factors.description"),
    },
  ];

  const scales = [
    {
      title: t("scales.fibonacci.title"),
      subtitle: t("scales.fibonacci.subtitle"),
      values: t("scales.fibonacci.values"),
      description: t("scales.fibonacci.description"),
      color: "blue",
    },
    {
      title: t("scales.tshirt.title"),
      subtitle: t("scales.tshirt.subtitle"),
      values: t("scales.tshirt.values"),
      description: t("scales.tshirt.description"),
      color: "green",
    },
    {
      title: t("scales.powers.title"),
      subtitle: t("scales.powers.subtitle"),
      values: t("scales.powers.values"),
      description: t("scales.powers.description"),
      color: "purple",
    },
  ];

  const examples = [
    {
      points: t("examples.simple.points"),
      title: t("examples.simple.title"),
      items: [
        t("examples.simple.item1"),
        t("examples.simple.item2"),
        t("examples.simple.item3"),
      ],
      color: "green",
    },
    {
      points: t("examples.medium.points"),
      title: t("examples.medium.title"),
      items: [
        t("examples.medium.item1"),
        t("examples.medium.item2"),
        t("examples.medium.item3"),
      ],
      color: "yellow",
    },
    {
      points: t("examples.complex.points"),
      title: t("examples.complex.title"),
      items: [
        t("examples.complex.item1"),
        t("examples.complex.item2"),
        t("examples.complex.item3"),
      ],
      color: "orange",
    },
    {
      points: t("examples.epic.points"),
      title: t("examples.epic.title"),
      items: [
        t("examples.epic.item1"),
        t("examples.epic.item2"),
        t("examples.epic.item3"),
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
                    {t("whatAre.title")}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t("whatAre.description")}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      <strong>Conceito Principal:</strong>{" "}
                      {t("whatAre.concept")}
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
                {t("whyUse.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("whyUse.subtitle")}
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
                {t("scales.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("scales.subtitle")}
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
                {t("examples.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("examples.subtitle")}
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
                    {t("velocity.title")}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {t("velocity.description")}
                  </p>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t("velocity.exampleTitle")}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {t("velocity.sprint1")}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {t("velocity.sprint2")}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {t("velocity.sprint3")}
                        </span>
                      </li>
                      <li className="flex items-center gap-2 font-semibold">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                        <span className="text-gray-900 dark:text-white">
                          {t("velocity.average")}
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
