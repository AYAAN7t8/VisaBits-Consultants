import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/visabits-logo.png"
              alt="VisaBits Consultants"
              width={160}
              height={45}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              At VisaBits Consultants, we simplify your global travel experience.
              From expert visa consultation to seamless travel arrangements, we ensure
              every step of your journey is smooth, reliable, and stress-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Visa Destinations
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Visa Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Visa Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/destinations#schengen" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Schengen Countries
                </Link>
              </li>
              <li>
                <Link href="/destinations#non-schengen" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  Non-Schengen European Countries
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                  4-Step Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">WhatsApp Us</p>
                  <a href="https://wa.me/447427881393" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                    +44 7427 881393
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <a href="mailto:info@visabitsconsultants.co.uk" className="text-sm text-secondary-foreground/80 hover:text-white transition-colors">
                    info@visabitsconsultants.co.uk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <p className="text-sm text-secondary-foreground/80">
                    London, United Kingdom
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © 2026 VisaBits Consultants. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-secondary-foreground/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-secondary-foreground/60 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
