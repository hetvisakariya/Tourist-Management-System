"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { format } from "date-fns";
import {
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  Utensils, 
  Car, 
  Calendar as CalendarIcon,
  Users,
  Check,
  Info
} from "lucide-react";
import { hotelsAPI, Hotel } from "@/lib/api";

export default function HotelDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [hotels, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const router = useRouter();
  const { toast } = useToast();

  // Mock hotel data - in a real app, this would be fetched from an API
  useEffect(() => {
    if (!params.id) return;

    const fetchHotel = async () => {
      try {
        const data = await hotelsAPI.getById(params.id as string);
        setHotel(data.hotel || data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [params.id]);

  if (loading) return <div>Loading hotel...</div>;
  if (!hotels) return <div>Hotel not found</div>;

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
        return <Check className="h-4 w-4" />;
    }
  };

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Please select dates",
        description: "Check-in and check-out dates are required.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would navigate to a booking confirmation page or process the booking
    toast({
      title: "Booking Successful!",
      description: `Your stay at ${hotels.name} has been booked.`,
    });
    
    // Navigate to a confirmation page
    router.push("/booking-confirmation");
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return hotels.price * nights * parseInt(rooms);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{hotels.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{hotels.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="mr-1">{hotels.rating}</span>
                <span className="text-muted-foreground">({hotels.reviews} reviews)</span>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2 relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={hotels.images[0]}
                  alt={hotels.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              {hotels.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${hotels.name} - Image ${index + 2}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            
            {/* Hotel Details Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <h2 className="text-xl font-semibold mb-2">About this hotel</h2>
                <p className="text-muted-foreground mb-4">{hotels.description}</p>
                
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground mb-4">
                  Located in the heart of Bali, our hotel offers easy access to popular attractions, 
                  beaches, and shopping districts. The international airport is just 20 minutes away.
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Policies</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Check-in: 2:00 PM - 12:00 AM</p>
                  <p>Check-out: 12:00 PM</p>
                  <p>Cancellation policy: Free cancellation up to 24 hours before check-in</p>
                </div>
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-4">
                <h2 className="text-xl font-semibold mb-4">Available Room Types</h2>
                
                <div className="space-y-4">
                  {hotels.rooms.map((room) => (
                    <Card key={room._id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 md:w-2/3">
                          <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Up to {room.capacity} guests</span>
                          </div>
                          <p className="text-muted-foreground mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                                <Check className="h-3 w-3 mr-1" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                          <div className="text-xl font-bold mb-2">${room.price} <span className="text-sm font-normal text-muted-foreground">/ night</span></div>
                          <Button className="w-full">Select Room</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-4">
                <h2 className="text-xl font-semibold mb-4">Hotel Amenities</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotels.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {getAmenityIcon(amenity)}
                      <span className="ml-2">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date) => 
                            date < new Date() || 
                            (checkInDate ? date <= checkInDate : false)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Rooms</label>
                      <Select value={rooms} onValueChange={setRooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                          <SelectItem value="4">4 Rooms</SelectItem>
                          <SelectItem value="5">5 Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Guests</label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5 Guests</SelectItem>
                          <SelectItem value="6">6 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Price per night</span>
                      <span>${hotels.price}</span>
                    </div>
                    {checkInDate && checkOutDate && (
                      <div className="flex justify-between mb-2">
                        <span>
                          {Math.ceil(
                            (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
                          )} nights
                        </span>
                        <span>
                          ${hotels.price} x {Math.ceil(
                            (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
                          )} x {rooms}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span>Taxes & fees</span>
                      <span>${Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-border">
                      <span>Total</span>
                      <span>${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Info className="h-4 w-4 mr-2" />
                    <span>Free cancellation up to 24 hours before check-in</span>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={handleBookNow}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}