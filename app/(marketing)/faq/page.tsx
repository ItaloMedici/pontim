"use client";

import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  PlayCircle,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQPage() {
  const t = useTranslations("marketing.faq");

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

  const faqs = [
    {
      icon: HelpCircle,
      question: t("questions.whatIsScrumPoker.question"),
      answer: t("questions.whatIsScrumPoker.answer"),
    },
    {
      icon: Users,
      question: t("questions.howDoesItWork.question"),
      answer: t("questions.howDoesItWork.answer"),
    },
    {
      icon: CheckCircle,
      question: t("questions.isFree.question"),
      answer: t("questions.isFree.answer"),
    },
    {
      icon: Zap,
      question: t("questions.howToCreateRoom.question"),
      answer: t("questions.howToCreateRoom.answer"),
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
              <MessageSquare className="w-4 h-4" />
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

        {/* FAQ Cards */}
        <BlurFade delay={0.4} inView>
          <motion.section className="mb-20">
            <motion.div
              className="grid gap-6"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -2, scale: 1.005 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center text-white dark:text-black">
                        <faq.icon className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {faq.question}
                      </h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </BlurFade>

        {/* CTA Section */}
        <BlurFade delay={0.5} inView>
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
                  {t("cta.subtitle")}
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
