"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, Star, Wifi, Coffee, Utensils, Car, Search, Filter } from "lucide-react";

export default function HotelsPage() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock hotel data
  const hotels = [
    {
      id: 1,
      name: "Grand Luxury Hotel",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      price: 120,
      rating: 4.8,
      amenities: ["Free WiFi", "Breakfast", "Restaurant", "Parking"]
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      location: "Phuket, Thailand",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
      price: 180,
      rating: 4.9,
      amenities: ["Free WiFi", "Breakfast", "Restaurant", "Spa"]
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      price: 150,
      rating: 4.6,
      amenities: ["Free WiFi", "Restaurant", "Parking"]
    },
    {
      id: 4,
      name: "Mountain View Lodge",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      price: 200,
      rating: 4.7,
      amenities: ["Free WiFi", "Breakfast", "Restaurant", "Parking"]
    },
    {
      id: 5,
      name: "Riverside Inn",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      price: 90,
      rating: 4.5,
      amenities: ["Free WiFi", "Breakfast"]
    },
    {
      id: 6,
      name: "City Center Suites",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      price: 220,
      rating: 4.7,
      amenities: ["Free WiFi", "Breakfast", "Restaurant", "Parking"]
    },
    {
      id: 7,
      name: "Rome Luxus",
      location: "Rome,Italy",
      image: "https://cdn.blastness.info/media/1291/gallery/thumbs/full/1024--1-deluxe.webp",
      price: 370,
      rating: 4.2,
      amenities: ["Free WiFi", "Spa", "Restaurant", "Parking"]
    },
    {
      id: 8,
      name: "LaLa Land",
      location: "Istanbul,Turkey",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/385220406.jpg?k=f96ec56e44e6ac01d6828e075214cbc74a6dda4554a99b4e53d2708239468c6e&o=",
      price: 125,
      rating:4.4,
      amenities: ["Free WiFi", "Breakfast", "Parking"]
    },
    {
      id: 9,
      name: "Beautiful Saigon Hotel",
      location: "Ho Chi Minh",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fvn%2Fbeauty-saigon.en-gb.html&psig=AOvVaw1eEicg7BBlCCuJAo-sj7v5&ust=1743060343347000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiCn_abp4wDFQAAAAAdAAAAABAE",
      price: 125,
      rating:4.6,
      amenities: ["Free WiFi", "Breakfast", "Parking"]
    },
    {
      id: 10,
      name: "Golden tulip",
      location: "Rome,Italy",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fit%2Fclubisolasacra.en-gb.html&psig=AOvVaw0Y2w8AhWeKg6VWraFroipY&ust=1743060676474000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjK7qSdp4wDFQAAAAAdAAAAABAJ",
      price: 125,
      rating:5.7,
      amenities: ["Free WiFi", "Parking","spa","Brakefast","Restaurant"]
    },
    {
      id: 11,
      name: "Relais luxary",
      location: "Rome,Italy",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.agoda.com%2Fpantheon-caesar-relais%2Fhotel%2Frome-it.html&psig=AOvVaw0X8SFFgdS9M7CGUpMkUDEe&ust=1743060779208000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCx5s2dp4wDFQAAAAAdAAAAABAE",
      price: 125,
      rating:4.5,
      amenities: ["Free WiFi", "Breakfast", "Parking"]
    },
    {
      id: 12,
      name: "Barbera Hotel",
      location: "Istanbul,Turkey",
      image: "https://www.google.com/imgres?q=%0D%0A%20%20%20%20%20%20name%3A%20%22Barbera%20Hotel%22%2C%0D%0A%20%20%20%20%20%20location%3A%20%22Istanbul%2CTurkey%22%2C&imgurl=https%3A%2F%2Fwww.go-istanbul-hotels.com%2Fdata%2FPhotos%2FOriginalPhoto%2F11302%2F1130209%2F1130209416.JPEG&imgrefurl=https%3A%2F%2Fwww.go-istanbul-hotels.com%2Fen%2Fproperty%2Fbarbera.html&docid=6swQ502HC_O9XM&tbnid=MgevNZjv5zfj6M&vet=12ahUKEwjOyL2Wn6eMAxXEXGwGHTeqJT0QM3oECEQQAA..i&w=1280&h=853&hcb=2&itg=1&ved=2ahUKEwjOyL2Wn6eMAxXEXGwGHTeqJT0QM3oECEQQAA",
      price: 125,
      rating:4.7,
      amenities: ["Free WiFi", "Breakfast", "Parking"]
    },
    
    {
     id: 13,
     name: "Banyan Tree Phuket",
     location: "Phuket, Thailand",
     imag: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/12345678.jpg?k=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890&o=&hp=1",
     price: 29405,
     rating: 4.8,
     amenities: ["Free WiFi", "Spa", "Swimming Pool"]
    },
    {
        "id": 14,
        "name": "Hotel Bellevue Palace",
        "location": "Bern, Switzerland",
        "image": "https://www.hotelbern.ch/images/hotel/hotel-bern.jpg",
        "price": 350,
        "rating": 4.7,
        "amenities": ["Free WiFi", "Restaurant", "Fitness Center"]
    },
    {
        "id": 15,
        "name": "The Ritz-Carlton New York, Central Park",
        "location": "New York, USA",
        "image": "https://www.thetimes.co.uk/images/hotel/ritz-carlton-new-york.jpg",
        "price": 1050,
        "rating": 4.9,
        "amenities": ["Free WiFi", "Spa", "Central Park View"]
    },
    {
        "id": 16,
        "name": "Twinpalms Bangtao Phuket Tented Resort",
        "location": "Phuket, Thailand",
        "image": "https://www.dailytelegraph.com.au/images/hotel/twinpalms-bangtao.jpg",
        "price": 350,
        "rating": 4.6,
        "amenities": ["Free WiFi", "Private Pool", "Beach Access"]
    },
    {
        "id": 17,
        "name": "Hotel Schweizerhof Bern & Spa",
        "location": "Bern, Switzerland",
        "image": "https://www.myswitzerland.com/images/hotel/schweizerhof-bern.jpg",
        "price": 400,
        "rating": 4.8,
        "amenities": ["Free WiFi", "Spa", "Central Location"]
    }
  ]
    
  

  // Filter hotels based on search query and price range
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi className="h-4 w-4" />;
      case "Breakfast":
        return <Coffee className="h-4 w-4" />;
      case "Restaurant":
        return <Utensils className="h-4 w-4" />;
      case "Parking":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Hotel</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search hotels or locations" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="bali">Bali, Indonesia</SelectItem>
                        <SelectItem value="phuket">Phuket, Thailand</SelectItem>
                        <SelectItem value="paris">Paris, France</SelectItem>
                        <SelectItem value="santorini">Santorini, Greece</SelectItem>
                        <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                        <SelectItem value="newyork">New York, USA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wifi" />
                        <label htmlFor="wifi" className="text-sm">Free WiFi</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="breakfast" />
                        <label htmlFor="breakfast" className="text-sm">Breakfast</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="restaurant" />
                        <label htmlFor="restaurant" className="text-sm">Restaurant</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="parking" />
                        <label htmlFor="parking" className="text-sm">Parking</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="spa" />
                        <label htmlFor="spa" className="text-sm">Spa</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Star Rating</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Hotel Listings */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{hotel.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {hotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-lg font-bold">${hotel.price} <span className="text-sm font-normal text-muted-foreground">/ night</span></div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/hotels/${hotel.id}`} className="w-full">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No hotels found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 500]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}