"use client";

import { useEffect, useState } from "react";
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
import { hotelsAPI, Hotel } from "@/lib/api";

export default function HotelsPage() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hotel, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelsAPI.getAll(); // calls your API
        setHotels(data); // adapt depending on your API shape
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div>Loading hotel...</div>;

  // Filter hotels based on search query and price range
  const filteredHotels = hotel.filter(hotel => {
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
                  <Card key={hotel._id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={hotel.images[0]}
                        alt={hotel.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {/* <span>{hotel.images[0]}</span> */}
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
                      <Link href={`/hotels/${hotel._id}`} className="w-full">
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