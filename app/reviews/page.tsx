import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Star, ArrowRight, Quote } from 'lucide-react';

export default function ReviewsPage() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      destination: 'France - Schengen Visa',
      rating: 5,
      text: 'VisaBits made the entire process seamless! From documentation to appointment booking, everything was handled professionally. I received my visa within 2 weeks. Highly recommended!',
      date: 'February 2026'
    },
    {
      name: 'Mohammed Ahmed',
      destination: 'Germany - Schengen Visa',
      rating: 5,
      text: 'Outstanding service! The team was very knowledgeable and kept me informed at every step. They even helped me book affordable flights. Will definitely use their services again.',
      date: 'January 2026'
    },
    {
      name: 'Priya Patel',
      destination: 'Spain - Schengen Visa',
      rating: 5,
      text: 'I was worried about the visa process, but VisaBits handled everything perfectly. Their attention to detail and constant support made all the difference. Thank you!',
      date: 'December 2025'
    },
    {
      name: 'David Thompson',
      destination: 'Italy - Schengen Visa',
      rating: 5,
      text: 'Professional and efficient service. They prepared all my documents, booked my appointment, and I got my visa approved without any hassle. Excellent experience!',
      date: 'November 2025'
    },
    {
      name: 'Amina Hassan',
      destination: 'Netherlands - Schengen Visa',
      rating: 5,
      text: 'The team at VisaBits is amazing! They guided me through the entire process and made sure I had all the necessary documents. Got my visa in less than 3 weeks!',
      date: 'October 2025'
    },
    {
      name: 'James Wilson',
      destination: 'Portugal - Schengen Visa',
      rating: 5,
      text: 'Very professional and responsive. They answered all my questions promptly and handled my application with great care. Highly recommend for anyone needing visa assistance.',
      date: 'September 2025'
    },
    {
      name: 'Fatima Khan',
      destination: 'Greece - Schengen Visa',
      rating: 5,
      text: 'Fantastic service from start to finish. They made the complex visa process so easy to understand and manage. I felt supported throughout my journey.',
      date: 'August 2025'
    },
    {
      name: 'Robert Brown',
      destination: 'Austria - Schengen Visa',
      rating: 5,
      text: 'VisaBits took care of everything - documentation, flights, hotel bookings. The team is professional, friendly, and very efficient. Thank you for making my trip possible!',
      date: 'July 2025'
    },
    {
      name: 'Aisha Ibrahim',
      destination: 'Belgium - Schengen Visa',
      rating: 5,
      text: 'I had a complicated case but VisaBits handled it expertly. They knew exactly what was needed and got my visa approved on the first attempt. Exceptional service!',
      date: 'June 2025'
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">Success Stories</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              What Our Clients{' '}
              <span className="text-primary">Say About Us</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Don't just take our word for it—hear from clients who've successfully
              traveled with our help. Over 500 approved visas and counting!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from real people who achieved their travel dreams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.destination}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mx-auto mb-4">Why Clients Trust Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Commitment to Excellence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Transparent Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear communication and no hidden fees
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold mb-2">Fast Turnaround</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick processing with timely updates
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">💯</div>
                  <h3 className="font-bold mb-2">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated team available 24/7
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-white/90">
              Let us help you achieve your travel dreams with our expert visa services
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
