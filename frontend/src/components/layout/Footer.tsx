"use client";

import Link from "next/link";
import { Plane, Mail, Phone, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "travel@aiplanner.com",
      href: "mailto:travel@aiplanner.com",
    },
    { icon: Phone, text: "+1 (888) 123-4567", href: "tel:+18881234567" },
  ];

  return (
    <footer className="bg-secondary-900/50 border-t border-secondary-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Plane size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                AI Travel Planner
              </span>
            </div>
            <p className="text-secondary-400 text-sm mb-4 max-w-md">
              Your intelligent travel companion. Let AI create personalized
              itineraries tailored to your preferences, budget, and travel
              style.
            </p>
            <div className="space-y-2">
              {contactInfo.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-2 text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                >
                  <item.icon size={14} />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-500 text-sm">
            © {currentYear} AI Travel Planner. All rights reserved.
          </p>
          <p className="text-secondary-500 text-sm flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500" /> for travelers
            worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
