"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plane,
  Globe,
  Sparkles,
  Shield,
  Users,
  Clock,
  Award,
  Heart,
  Compass,
  MapPin,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Personalization",
      description:
        "Our advanced AI creates unique itineraries tailored to your preferences, budget, and travel style.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Compass,
      title: "Expert Recommendations",
      description:
        "Curated attractions, restaurants, and hidden gems from local travel experts.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Live weather forecasts and seasonal recommendations for your travel dates.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description:
        "Custom itineraries based on your interests - from food tours to adventure sports.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { value: "50+", label: "Destinations", icon: Globe },
    { value: "10K+", label: "Happy Travelers", icon: Users },
    { value: "100%", label: "Customizable", icon: Sparkles },
    { value: "4.9", label: "Traveler Rating", icon: Star },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      quote:
        "AI Travel Planner created the perfect Paris itinerary for my family. Every recommendation was spot-on!",
      rating: 5,
      image: "S",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      quote:
        "The Tokyo itinerary saved me hours of research. Discovered amazing local spots I would have missed!",
      rating: 5,
      image: "M",
    },
    {
      name: "Emma Rodriguez",
      location: "Spain",
      quote:
        "From Rome to Florence, every recommendation was perfect. Best travel planning tool ever!",
      rating: 5,
      image: "E",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950">
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey Begins <span className="gradient-text">Here</span>
            </h1>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              Discover, plan, and experience the world with AI-powered travel
              planning
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-secondary-300 text-lg leading-relaxed mb-6">
                We believe travel should be effortless and unforgettable. Our
                mission is to use artificial intelligence to create personalized
                travel experiences that match your unique preferences, budget,
                and travel style.
              </p>
              <p className="text-secondary-400">
                Whether you're dreaming of a romantic European getaway, an
                adventurous mountain trek, or a relaxing beach vacation, AI
                Travel Planner helps you create the perfect journey.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Card variant="gradient" className="p-8 text-center">
                <Plane size={48} className="text-primary-400 mx-auto mb-4" />
                <p className="text-secondary-200 text-lg italic">
                  "Travel is the only thing you buy that makes you richer."
                </p>
                <p className="text-secondary-400 mt-3">- Anonymous Traveler</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Travel With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 text-center h-full hover:border-primary-500/50 transition-all">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={20} className="text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-secondary-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Travelers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {testimonial.image}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-secondary-500 text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-secondary-300 text-sm italic">
                    "{testimonial.quote}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card variant="gradient" className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-secondary-300 mb-6">
              Join thousands of happy travelers who discovered their perfect
              journey with AI Travel Planner
            </p>
            <Link href="/">
              <Button variant="primary" size="lg">
                ✈️ Start Planning Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}
