"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Car, 
  Clock, 
  Users, 
  MapPin, 
  ArrowRight,
  Wifi,
  Music,
  Snowflake,
  Briefcase
} from "lucide-react";

export default function CabsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [cabType, setCabType] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("");
  const { toast } = useToast();

  const handleBookCab = () => {
    if (!pickupLocation || !dropoffLocation || !date || !time || !cabType || !passengers) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Successful!",
      description: "Your cab has been booked successfully.",
    });
  };

  // Mock cab data
  const cabTypes = [
    {
      id: 1,
      name: "Economy",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      price: 15,
      capacity: 4,
      features: ["Air Conditioning", "Music System", "GPS Navigation"]
    },
    {
      id: 2,
      name: "Standard",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFGiBT1CICJiVwc4hgJ8jTlFLlkDRnB6L8WA&s",
      price: 25,
      capacity: 4,
      features: ["Air Conditioning", "Music System", "GPS Navigation", "Free WiFi"]
    },
    {
      id: 3,
      name: "Luxury",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2936&q=80",
      price: 50,
      capacity: 4,
      features: ["Air Conditioning", "Premium Sound System", "GPS Navigation", "Free WiFi", "Leather Seats", "Complimentary Water"]
    },
    {
      id: 4,
      name: "SUV",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      price: 40,
      capacity: 6,
      features: ["Air Conditioning", "Music System", "GPS Navigation", "Free WiFi", "Spacious Luggage"]
    }
  ];

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Air Conditioning":
        return <Snowflake className="h-4 w-4" />;
      case "Music System":
      case "Premium Sound System":
        return <Music className="h-4 w-4" />;
      case "Free WiFi":
        return <Wifi className="h-4 w-4" />;
      case "Spacious Luggage":
        return <Briefcase className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Book a Cab</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cab Booking</h2>
                
                <Tabs defaultValue="oneway" className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="oneway">One Way</TabsTrigger>
                    <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pickup Location</label>
                    <Input 
                      placeholder="Enter pickup location" 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dropoff Location</label>
                    <Input 
                      placeholder="Enter destination" 
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time</label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6am">6:00 AM</SelectItem>
                        <SelectItem value="7am">7:00 AM</SelectItem>
                        <SelectItem value="8am">8:00 AM</SelectItem>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM</SelectItem>
                        <SelectItem value="12pm">12:00 PM</SelectItem>
                        <SelectItem value="1pm">1:00 PM</SelectItem>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="3pm">3:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM</SelectItem>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                        <SelectItem value="6pm">6:00 PM</SelectItem>
                        <SelectItem value="7pm">7:00 PM</SelectItem>
                        <SelectItem value="8pm">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cab Type</label>
                    <Select value={cabType} onValueChange={setCabType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cab type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Passengers</label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5 Passengers</SelectItem>
                        <SelectItem value="6">6 Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full" onClick={handleBookCab}>
                    Book Cab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cab Types */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Available Cab Types</h2>
            
            <div className="space-y-6">
              {cabTypes.map((cab) => (
                <Card key={cab.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={cab.image}
                        alt={cab.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">{cab.name}</h3>
                        <div className="text-xl font-bold">${cab.price} <span className="text-sm font-normal text-muted-foreground">/ km</span></div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Up to {cab.capacity} passengers</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cab.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                            {getFeatureIcon(feature)}
                            <span className="ml-1">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="mr-2">Airport</span>
                        <ArrowRight className="h-4 w-4 mx-1" />
                        <span>City Center: ~${cab.price * 15}</span>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setCabType(cab.name.toLowerCase());
                          toast({
                            title: `${cab.name} selected`,
                            description: "Please complete the booking form to continue.",
                          });
                        }}
                      >
                        Select {cab.name}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}