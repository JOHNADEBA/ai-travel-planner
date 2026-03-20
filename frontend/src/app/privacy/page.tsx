"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  ArrowLeft,
  FileText,
  User,
  Share2,
  Trash2,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as travel preferences, destination interests, and contact details. We also collect technical data about your device and how you interact with our service. This includes IP address, browser type, and usage patterns.",
      details:
        "• Travel preferences and interests\n• Destination searches and itinerary data\n• Email address (if provided)\n• Device information and usage statistics",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content:
        "Your information helps us create personalized travel itineraries, improve our AI recommendations, and provide customer support. We never sell your personal data to third parties.",
      details:
        "• Generate AI-powered itineraries\n• Improve our algorithms and recommendations\n• Send travel-related updates (with your consent)\n• Analyze usage to enhance user experience",
    },
    {
      icon: Lock,
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. We regularly review our security practices to ensure your information remains safe.",
      details:
        "• SSL/TLS encryption for all data transmission\n• Secure database storage with access controls\n• Regular security audits and updates\n• Limited employee access to personal data",
    },
    {
      icon: Share2,
      title: "Data Sharing",
      content:
        "We do not sell your personal information. We may share data with trusted third parties only when necessary to provide our service (e.g., weather data from OpenWeatherMap, AI processing from OpenAI).",
      details:
        "• OpenAI for AI itinerary generation\n• OpenWeatherMap for weather forecasts\n• Analytics providers to improve service\n• No data sold to advertisers",
    },
    {
      icon: Mail,
      title: "Communication Preferences",
      content:
        "You can opt out of promotional emails at any time. We'll only send you essential travel-related communications unless you opt in for marketing.",
      details:
        "• Essential service emails (cannot opt out)\n• Promotional emails (opt-out available)\n• Newsletter subscription (optional)\n• Travel tips and recommendations (optional)",
    },
    {
      icon: User,
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. Contact us to exercise these rights. You may also request a copy of your data or ask us to stop processing it.",
      details:
        "• Right to access your data\n• Right to correct inaccurate data\n• Right to request deletion\n• Right to data portability\n• Right to withdraw consent",
    },
    {
      icon: Trash2,
      title: "Data Retention",
      content:
        "We retain your personal data only as long as necessary to provide our services or as required by law. You may request deletion of your data at any time.",
      details:
        "• Itineraries saved for 30 days\n• Anonymized data retained for improvement\n• Account data deleted upon request\n• Log data retained for security",
    },
    {
      icon: Globe,
      title: "International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place to protect your data.",
      details:
        "• Data processing in EU, US, and other regions\n• GDPR compliance for European users\n• Standard contractual clauses in place\n• Privacy Shield principles applied",
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
            <Shield size={48} className="text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-secondary-300 text-lg">
            Your privacy matters. Learn how we protect your travel data.
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
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-secondary-400 leading-relaxed mb-3">
                      {section.content}
                    </p>
                    <div className="bg-secondary-800/30 rounded-lg p-4 mt-2">
                      <p className="text-primary-400 text-sm font-medium mb-2">
                        Key Details:
                      </p>
                      <pre className="text-secondary-400 text-xs whitespace-pre-wrap font-sans">
                        {section.details}
                      </pre>
                    </div>
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
            <Card className="p-6 bg-primary-500/5 border-primary-500/20">
              <h2 className="text-lg font-semibold text-white mb-3">
                Contact Us
              </h2>
              <p className="text-secondary-400 mb-4">
                If you have questions about this Privacy Policy or how we handle
                your data, please contact us:
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:privacy@aiplanner.com"
                  className="text-primary-400 hover:underline flex items-center gap-2"
                >
                  <Mail size={14} /> privacy@aiplanner.com
                </a>
                <p className="text-secondary-500 text-sm">
                  AI Travel Planner Privacy Team
                  <br />
                  123 Travel Street, Digital City, 12345
                </p>
              </div>
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
