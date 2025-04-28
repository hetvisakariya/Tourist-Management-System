"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Languages, 
  Clock, 
  DollarSign,
  Search,
  Filter
} from "lucide-react";
import { Guide, guidesAPI } from "@/lib/api";

export default function GuidesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await guidesAPI.getAll(); // calls your API
        setGuides(data); // adapt depending on your API shape
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div>Loading Guides...</div>;

  // Filter guides based on search query, location, and language
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !location || guide.location.includes(location);
    const matchesLanguage = !language || guide.languages.includes(language);
    return matchesSearch && matchesLocation && matchesLanguage;
  });

  const handleBookGuide = (guideId: string | number) => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "You need to select a date for your tour.",
        variant: "destructive",
      });
      return;
    }

    const guide = guides.find(g => g._id === guideId);
    
    toast({
      title: "Guide Booking Successful!",
      description: `You have booked ${guide?.name} for ${format(date, "PPP")}.`,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find a Tour Guide</h1>
        
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
                        placeholder="Search guides or specialties" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="Bali">Bali, Indonesia</SelectItem>
                        <SelectItem value="Barcelona">Barcelona, Spain</SelectItem>
                        <SelectItem value="Tokyo">Tokyo, Japan</SelectItem>
                        <SelectItem value="Paris">Paris, France</SelectItem>
                        <SelectItem value="Cairo">Cairo, Egypt</SelectItem>
                        <SelectItem value="New York">New York, USA</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <label className="text-sm font-medium mb-2 block">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any language</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Mandarin">Mandarin</SelectItem>
                        <SelectItem value="Indonesian">Indonesian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setLocation("");
                      setLanguage("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Guide Listings */}
          <div className="w-full md:w-3/4">
            <div className="space-y-6">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Card key={guide._id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-64 md:h-auto md:w-1/3">
                        <Image
                          src={guide.image}
                          alt={guide.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold">{guide.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="mr-1">{guide.rating}</span>
                            <span className="text-muted-foreground">({guide.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{guide.location}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-3">
                          <Languages className="h-4 w-4 mr-1" />
                          <span>{guide.languages.join(", ")}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-3">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{guide.experience} years of experience</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold">
                            <DollarSign className="h-5 w-5 inline-block" />
                            {guide.price} <span className="text-sm font-normal text-muted-foreground">/ hour</span>
                          </div>
                          <Button onClick={() => handleBookGuide(guide._id)}>
                            Book Guide
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No guides found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setLocation("");
                      setLanguage("");
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