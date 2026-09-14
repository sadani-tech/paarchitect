"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, staggerParent, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl";
};

export function Stagger({ children, className, stagger = 0.09, delay = 0, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
};

export function StaggerItem({ children, className, y = 20, as = "div" }: ItemProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}
