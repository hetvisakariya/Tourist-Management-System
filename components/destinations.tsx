import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Hotel } from "lucide-react";
import Link from "next/link";

export function Destinations() {
  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      rating: 4.8,
      hotels: 245,
      featured: true
    },
    {
      id: 2,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      rating: 4.7,
      hotels: 312,
      featured: true
    },
    {
      id: 3,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      rating: 4.9,
      hotels: 178,
      featured: false
    },
    {
      id: 4,
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80",
      rating: 4.6,
      hotels: 423,
      featured: false
    },
    {
      id: 5,
      name: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.5,
      hotels: 521,
      featured: false
    },
    {
      id: 6,
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      rating: 4.7,
      hotels: 387,
      featured: true
    },
    {
      id: 7,
      name: "Poland, Europe",
      image: "https://images.unsplash.com/photo-1496661274775-a86a124b9df3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.2,
      hotels: 200,
      featured: false
    },
    {
      id: 8,
      name: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      rating: 4.6,
      hotels: 289,
      featured: true
    },
    {
      id: 9,
      name: "Shanghai, China",
      image: "https://unsplash.com/photos/high-angle-view-of-high-rise-buildings-D8iZPlX-2fs",
      rating: 4.8,
      hotels: 219,
      featured: false
    },
    {
      id: 10,
      name: "Ho chi minh city, Viatnam ",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      rating: 4.9,
      hotels: 180,
      featured: true
    },
    {
      id: 11,
      name: "Goa, India ",
      image: "https://unsplash.com/photos/blue-body-of-water-under-sunny-sky-bWJiSZjIgTMc",
      rating: 4.7,
      hotels: 251,
      featured: true
    },
    {
      id: 12,
      name: "Bern, Switzerland ",
      image: "https://unsplash.com/photos/blue-body-of-water-under-sunny-sky-bWJiSZjIgTMc",
      rating: 4.9,
      hotels: 152,
      featured: true
    },
    {
      id: 13,
      name: "Colambo , Shrilanka",
      image: "https://unsplash.com/photos/blue-body-of-water-under-sunny-sky-bWJiSZjIgTMc",
      rating: 4.5,
      hotels: 200,
      featured: false
    },
    {
      id: 14,
      name: "Iceland, Europe ",
      image: "https://unsplash.com/photos/northern-light-aurora-borealis-at-vestrahorn-mountains-in-stokksnes-iceland-5SxXWvzYtkg",
      rating: 4.5,
      hotels: 200,
      featured: true
    },
    {
      id: 15,
      name: "Andman Nikobar iceland , India",
      image: "https://unsplash.com/photos/railay-beach-at-sunrise-in-krabi-thailand-s_kwq1J0nX4",
      rating: 4.5,
      hotels: 200,
      featured: true
    },
 ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked destinations with the best accommodations and experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <div className="relative h-64 w-full">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {destination.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{destination.name}</span>
                  <Hotel className="h-4 w-4 mr-1" />
                  <span>{destination.hotels} hotels</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/destinations/${destination.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Explore
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}