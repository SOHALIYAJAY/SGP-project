"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

interface DashboardGlowCardProps {
  children: ReactNode;
  status?: "success" | "warning" | "danger" | "info";
  className?: string;
  active?: boolean;
}

const glowMap = {
  success: "shadow-[0_0_0_1px_rgba(34,197,94,0.6),0_0_30px_rgba(34,197,94,0.35)]",
  warning: "shadow-[0_0_0_1px_rgba(245,158,11,0.6),0_0_30px_rgba(245,158,11,0.35)]",
  danger: "shadow-[0_0_0_1px_rgba(239,68,68,0.6),0_0_30px_rgba(239,68,68,0.35)]",
  info: "shadow-[0_0_0_1px_rgba(6,182,212,0.6),0_0_30px_rgba(6,182,212,0.35)]",
};

export function DashboardGlowCard({
  children,
  status = "info",
  active = false,
  className,
}: DashboardGlowCardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-xl bg-card/40 backdrop-blur-md transition-all duration-300",
        glowMap[status],
        active && "animate-pulse",
        className
      )}
    >
      {children}
    </div>
  );
}
