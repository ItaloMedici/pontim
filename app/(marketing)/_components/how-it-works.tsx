"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("marketing.homepage.howItWorks");

  const steps = [
    {
      number: "01",
      title: t("steps.createRoom.title"),
      description: t("steps.createRoom.description"),
    },
    {
      number: "02",
      title: t("steps.inviteTeam.title"),
      description: t("steps.inviteTeam.description"),
    },
    {
      number: "03",
      title: t("steps.startVoting.title"),
      description: t("steps.startVoting.description"),
    },
    {
      number: "04",
      title: t("steps.reachConsensus.title"),
      description: t("steps.reachConsensus.description"),
    },
  ];
  return (
    <section className="container py-20 bg-background">
      <motion.div
        className="mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-foreground"
          variants={itemVariants}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {t("subtitle")}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative flex-1 min-w-[250px] max-w-[300px]"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-foreground mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground/50"
                  aria-label={t("nextStep")}
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
