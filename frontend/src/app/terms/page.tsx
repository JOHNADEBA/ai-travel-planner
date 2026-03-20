"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Scale,
  ArrowLeft,
  BookOpen,
  Shield,
  Clock,
  Users,
  CreditCard,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function TermsPage() {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content:
        "By using AI Travel Planner, you agree to these Terms of Service. If you do not agree, please do not use our service.",
      date: "Last updated: March 2026",
    },
    {
      icon: AlertCircle,
      title: "Service Usage",
      content:
        "Our AI generates travel recommendations based on your preferences. While we strive for accuracy, you should verify critical travel information independently with official sources before booking.",
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content:
        "You are responsible for providing accurate information and ensuring your travel plans comply with local laws, regulations, and entry requirements. You must be at least 18 years old to use this service.",
    },
    {
      icon: BookOpen,
      title: "Intellectual Property",
      content:
        "AI Travel Planner content, including generated itineraries, is protected by copyright. You may use it for personal travel planning only. Commercial use requires written permission.",
    },
    {
      icon: Shield,
      title: "Privacy & Data",
      content:
        "Your personal data is handled according to our Privacy Policy. We use AI to generate recommendations based on your inputs, and we may anonymize data to improve our services.",
    },
    {
      icon: Clock,
      title: "Modifications to Service",
      content:
        "We reserve the right to modify, suspend, or discontinue any part of our service at any time. We will notify users of significant changes via email or website notice.",
    },
    {
      icon: Users,
      title: "Third-Party Links",
      content:
        "Our service may contain links to third-party websites (hotels, airlines, etc.). We are not responsible for their content, privacy policies, or practices.",
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      content:
        "Our basic service is currently free. If we introduce paid features in the future, pricing and refund policies will be clearly communicated before any charges apply.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <FileText size={48} className="text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-secondary-300 text-lg">
            Guidelines for using AI Travel Planner
          </p>
          <p className="text-secondary-500 text-sm mt-2">
            Last updated: March 2026
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <section.icon size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-secondary-400 leading-relaxed">
                      {section.content}
                    </p>
                    {section.date && (
                      <p className="text-secondary-500 text-xs mt-2">
                        {section.date}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-yellow-500/5 border-yellow-500/20">
              <h2 className="text-lg font-semibold text-white mb-3">
                Disclaimer
              </h2>
              <p className="text-secondary-400 text-sm">
                AI Travel Planner provides recommendations for informational
                purposes only. We are not a travel agency and do not book travel
                arrangements. We are not responsible for any decisions you make
                based on our suggestions. Always verify travel details with
                official sources before booking. All travel is at your own risk.
                We do not guarantee availability, pricing, or accuracy of
                third-party information.
              </p>
            </Card>
          </motion.div>

          <div className="text-center pt-8">
            <Link href="/">
              <Button variant="outline" size="lg">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
