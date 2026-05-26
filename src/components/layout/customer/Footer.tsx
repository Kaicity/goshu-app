"use client";

import { Ghost, Globe, GoalIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-primary font-semibold text-2xl mb-4">
            Kingree Luxe
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Curating the world's most exceptional beauty experiences for the
            modern luxury seeker.
          </p>
        </div>

        {/* Marketplace */}
        <div>
          <h4 className="text-muted-foreground font-medium mb-4">
            MARKETPLACE
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Explore Salons
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Premium Services
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Magazine
              </Link>
            </li>
          </ul>
        </div>

        {/* Partners */}
        <div>
          <h4 className="text-muted-foreground font-medium mb-4">
            FOR PARTNERS
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Partner With Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Salon Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Stylist Pro
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Resource Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-muted-foreground font-medium mb-4">SUPPORT</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Contact Support
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Kingree Luxe. All rights reserved.</p>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Globe className="cursor-pointer hover:text-foreground transition" />
            <Ghost className="cursor-pointer hover:text-foreground transition" />
            <GoalIcon className="cursor-pointer hover:text-foreground transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
