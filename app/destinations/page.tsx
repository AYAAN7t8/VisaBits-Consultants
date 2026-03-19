import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsPage() {
  const schengenCountries = [
    'Austria', 'Belgium', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy',
    'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway',
    'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Liechtenstein'
  ];

  const nonSchengenCountries = [
    'United Kingdom', 'Ireland', 'Croatia', 'Romania', 'Bulgaria', 'Cyprus'
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">Destinations</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Where We Can{' '}
              <span className="text-primary">Take You</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Specialized visa services for Schengen and European countries.
              We handle all visa types for your dream European destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Schengen Countries Section */}
      <section className="section-padding bg-background" id="schengen">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Schengen Area</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Schengen Countries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert visa guidance for all European Schengen states. We make the process simple,
              handling complex documentation for a smooth and hassle-free entry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {schengenCountries.map((country) => (
              <Card key={country} className="group hover:shadow-lg transition-all duration-300 hover:border-primary cursor-pointer hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{country}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              What is the Schengen Area?
            </h3>
            <p className="text-muted-foreground">
              The Schengen Area is a zone of 26 European countries that have abolished passport
              and other types of border control at their mutual borders. A Schengen visa allows
              you to travel freely within all member countries for up to 90 days within a 180-day period.
            </p>
          </div>
        </div>
      </section>

      {/* Non-Schengen European Countries Section */}
      <section className="section-padding bg-muted/30" id="non-schengen">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-4">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Non-Schengen European</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Non-Schengen European Countries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive travel and visa assistance for European destinations outside the
              Schengen Area, ensuring a smooth and stress-free journey.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-8">
            {nonSchengenCountries.map((country) => (
              <Card key={country} className="group hover:shadow-lg transition-all duration-300 hover:border-secondary cursor-pointer hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-sm group-hover:text-secondary transition-colors">{country}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-background rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              About Non-Schengen Countries
            </h3>
            <p className="text-muted-foreground">
              These European countries have their own visa requirements and immigration policies.
              We provide expert guidance for obtaining visas to these destinations, whether you're
              traveling for tourism, business, or visiting family.
            </p>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mx-auto mb-4">Our Expertise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Complete Visa Services
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="font-bold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete document preparation and verification for all visa types
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="font-bold mb-2">Appointment Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Embassy and consulate appointment scheduling and management
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">✈️</div>
                  <h3 className="font-bold mb-2">Travel Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Flight bookings and hotel reservations for your journey
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Explore Europe?
            </h2>
            <p className="text-xl text-white/90">
              Let us help you get your visa for your dream European destination
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
