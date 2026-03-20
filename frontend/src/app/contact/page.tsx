"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  User,
  AtSign,
  Headphones,
  Clock,
  Globe,
  Send,
  MapPin,
  Coffee,
  Heart,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", destination: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const supportOptions = [
    {
      icon: Mail,
      label: "Email Support",
      value: "travel@aiplanner.com",
      href: "mailto:travel@aiplanner.com",
      color: "from-blue-500 to-cyan-500",
      description: "Response within 24 hours",
    },
    {
      icon: Headphones,
      label: "Travel Hotline",
      value: "+1 (888) 123-4567",
      href: "tel:+18881234567",
      color: "from-green-500 to-emerald-500",
      description: "24/7 Support",
    },
    {
      icon: Globe,
      label: "Travel Resources",
      value: "help.aiplanner.com",
      href: "#",
      color: "from-purple-500 to-pink-500",
      description: "FAQs & Travel Guides",
    },
  ];

  const faqs = [
    {
      q: "How does the AI generate itineraries?",
      a: "Our AI analyzes your preferences, interests, and budget, then creates a personalized day-by-day plan with attractions, restaurants, and activities.",
    },
    {
      q: "Is the service really free?",
      a: "Yes! Our basic itinerary generation is completely free. We may introduce premium features in the future, but the core service will remain free.",
    },
    {
      q: "Can I save and share my itineraries?",
      a: "Absolutely! Each itinerary is automatically saved with a unique link you can share with friends and family.",
    },
    {
      q: "How accurate are the recommendations?",
      a: "We use real-time data from trusted sources like OpenWeatherMap and leverage AI trained on travel data. Always verify critical details before booking.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Plan Your Journey</span>
          </h1>
          <p className="text-secondary-300 text-lg max-w-2xl mx-auto">
            Have questions about your next adventure? Need help planning? Our
            travel experts are here to help you create unforgettable memories.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Travel Inquiry
              </h2>
              <p className="text-secondary-400 text-sm mb-6">
                Tell us about your dream vacation and we'll help you plan it
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Your Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  icon={<User size={16} />}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  icon={<AtSign size={16} />}
                  required
                />
                <Input
                  label="Dream Destination"
                  placeholder="Paris, Tokyo, Bali..."
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  icon={<Globe size={16} />}
                />
                <div>
                  <label className="block text-sm font-medium text-secondary-300 mb-2">
                    Your Travel Questions
                  </label>
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="Tell us about your travel plans, questions, or special requests..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-secondary-700 rounded-lg p-3 text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                    <MessageSquare
                      size={16}
                      className="absolute right-3 top-3 text-secondary-500"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  <Send size={16} className="mr-2" /> Send Travel Inquiry
                </Button>
                {submitted && (
                  <p className="text-green-500 text-center text-sm">
                    Thank you! Our travel experts will get back to you soon.
                  </p>
                )}
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Travel Support
            </h2>
            {supportOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="block"
              >
                <Card className="p-5 hover:border-primary-500/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center`}
                    >
                      <option.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-secondary-400 text-sm">
                        {option.label}
                      </p>
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {option.value}
                      </p>
                      <p className="text-secondary-500 text-xs mt-1">
                        {option.description}
                      </p>
                    </div>
                    <Send
                      size={16}
                      className="text-secondary-500 group-hover:text-primary-400 transition-colors"
                    />
                  </div>
                </Card>
              </motion.a>
            ))}

            <Card className="p-6 mt-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Coffee size={18} className="text-primary-400" /> Frequently
                Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx}>
                    <p className="text-primary-400 font-medium text-sm">
                      {faq.q}
                    </p>
                    <p className="text-secondary-400 text-xs mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-3">
              <Heart size={20} className="text-red-400" />
              <p className="text-secondary-400 text-sm">
                We're here to help make your travel dreams come true. Every
                journey begins with a single step - let's take it together!
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
