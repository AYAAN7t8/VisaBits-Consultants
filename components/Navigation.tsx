'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Visa Destinations', href: '/destinations' },
    { label: 'Our Process', href: '/process' },
    { label: 'Success Stories', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Large Image with Consultants Text */}
          <Link href="/" className="flex items-center gap-3 group">
  {/* Logo Image - Enlarged with pixel dimensions */}
  <div className="relative">
    <Image
      src="/images/logo.png"
      alt="VisaBits Consultants"
      width={120}
      height={100}
      className="object-contain group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  {/* Consultants Text - Color #2F3A40 */}
 
</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="default" variant="outline" className="ml-2">
              <Link href="/influencer-portal">
                <TrendingUp className="mr-2 h-4 w-4" />
                Influencer Portal
              </Link>
            </Button>
            <Button asChild size="default" className="ml-2">
              <Link href="/book">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="default" variant="outline" className="mt-2">
                <Link href="/influencer-portal" onClick={() => setIsOpen(false)}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Influencer Portal
                </Link>
              </Button>
              <Button asChild size="default">
                <Link href="/book" onClick={() => setIsOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}