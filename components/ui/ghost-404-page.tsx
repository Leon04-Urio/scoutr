"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

// Adapted from 21st.dev's "ghost-404-page": restyled for Scoutr's dark
// palette and fonts, links pointed at this site, and the infinite
// float/wiggle disabled for prefers-reduced-motion.

const GHOST_SRC =
  "https://cdn.21st.dev/assets/mirror/88/8848c4fd858052c49c5a5d7267489c02b021c6cf3e31bfec02787e16f1ab7d0e.png";

const ease = [0.43, 0.13, 0.23, 0.96] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const numberVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 40, y: 15, rotate: direction * 5 }),
  visible: { opacity: 0.8, x: 0, y: 0, rotate: 0, transition: { duration: 0.8, ease } },
};

const ghostVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 15, rotate: -5 },
  visible: { scale: 1, opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease } },
  hover: {
    scale: 1.1,
    y: -10,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      rotate: { duration: 2, ease: "linear", repeat: Infinity, repeatType: "reverse" },
    },
  },
  floating: {
    y: [-5, 5],
    transition: { y: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } },
  },
};

export function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-20">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8 flex items-center justify-center gap-4 md:mb-12 md:gap-6">
          <motion.span
            className="select-none font-display text-[80px] leading-none text-paper md:text-[120px]"
            variants={numberVariants}
            custom={-1}
          >
            4
          </motion.span>
          <motion.div
            variants={ghostVariants}
            whileHover={reduceMotion ? undefined : "hover"}
            animate={reduceMotion ? "visible" : ["visible", "floating"]}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- see project-card.tsx */}
            <img
              src={GHOST_SRC}
              alt=""
              width={120}
              height={120}
              draggable={false}
              className="h-[80px] w-[80px] select-none object-contain md:h-[120px] md:w-[120px]"
            />
          </motion.div>
          <motion.span
            className="select-none font-display text-[80px] leading-none text-paper md:text-[120px]"
            variants={numberVariants}
            custom={1}
          >
            4
          </motion.span>
        </div>

        <motion.h1
          className="mb-4 font-display text-3xl text-paper md:mb-6 md:text-5xl"
          variants={itemVariants}
        >
          Boo! Page missing!
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-md text-lg text-muted md:mb-12 md:text-xl"
          variants={itemVariants}
        >
          Whoops! This page must be a ghost &mdash; it&rsquo;s not here.
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={reduceMotion ? undefined : { scale: 1.05, transition: { duration: 0.3, ease } }}
        >
          <Link
            href="/"
            className="inline-block rounded-full bg-paper px-8 py-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-paper/90"
          >
            Find shelter
          </Link>
        </motion.div>

        <motion.div className="mt-10" variants={itemVariants}>
          <Link
            href="/portfolio"
            className="text-[14px] text-muted underline underline-offset-4 transition-colors hover:text-paper"
          >
            Or browse our portfolio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
