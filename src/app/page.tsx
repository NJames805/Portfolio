import type { Metadata } from "next"
import { PortfolioLanding } from "@/components/portfolio-landing"

export const metadata: Metadata = {
  title: "Nathanael James",
  description:
    "Portfolio — software engineer focused on full-stack, mobile, and AI-powered applications.",
}

export default function Home() {
  return <PortfolioLanding />
}
