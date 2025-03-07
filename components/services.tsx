import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Car, Users, Map, CreditCard, Clock } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Hotel className="h-10 w-10 text-primary" />,
      title: "Hotel Booking",
      description: "Find and book the perfect accommodation for your stay from our wide selection of hotels."
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Cab Services",
      description: "Book reliable cab services to travel comfortably to your destination."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Tour Guides",
      description: "Hire experienced tour guides who know the best spots and local history."
    },
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: "Location Search",
      description: "Search for services based on your location for convenience and accessibility."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Payments",
      description: "Make secure payments online with multiple payment options available."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24/7 Support",
      description: "Get assistance anytime with our round-the-clock customer support service."
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of services to make your travel experience seamless and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}