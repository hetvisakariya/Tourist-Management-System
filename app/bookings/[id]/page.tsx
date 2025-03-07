"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { bookingsAPI, Booking } from "@/lib/api";
import { format } from "date-fns";
import { 
  Calendar, 
  MapPin, 
  Car, 
  Users, 
  CreditCard, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    const fetchBooking = async () => {
      try {
        const data = await bookingsAPI.getById(params.id);
        setBooking(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch booking details.",
          variant: "destructive",
        });
        router.push("/bookings");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBooking();
    }
  }, [isAuthenticated, authLoading, params.id, router, toast]);

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    
    try {
      const response = await bookingsAPI.cancelBooking(params.id);
      
      setBooking({ ...booking!, status: 'cancelled' });
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel booking.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <MapPin className="h-5 w-5 text-primary" />;
      case 'cab':
        return <Car className="h-5 w-5 text-primary" />;
      case 'guide':
        return <Users className="h-5 w-5 text-primary" />;
      default:
        return null;
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Booking not found</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push("/bookings")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Booking Details</CardTitle>
                  <CardDescription>
                    Booking ID: {booking.bookingId}
                  </CardDescription>
                </div>
                {getStatusBadge(booking.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                {getBookingTypeIcon(booking.bookingType)}
                <div className="ml-3">
                  <p className="font-medium capitalize">{booking.bookingType} Booking</p>
                  <p className="text-sm text-muted-foreground">
                    Booked on {format(new Date(booking.createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking.checkIn && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Stay Duration</p>
                      <p className="text-muted-foreground">Check-in: {format(new Date(booking.checkIn), 'MMMM dd, yyyy')}</p>
                      {booking.checkOut && (
                        <p className="text-muted-foreground">Check-out: {format(new Date(booking.checkOut), 'MMMM dd, yyyy')}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {booking.date && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{format(new Date(booking.date), 'MMMM dd, yyyy')}</p>
                      {booking.time && (
                        <p className="text-muted-foreground">Time: {booking.time}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {(booking.guests || booking.rooms) && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Guests & Rooms</p>
                      {booking.guests && <p className="text-muted-foreground">{booking.guests} Guests</p>}
                      {booking.rooms && <p className="text-muted-foreground">{booking.rooms} Room(s)</p>}
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Payment Information</p>
                    <p className="text-muted-foreground">Total Amount: ${booking.totalAmount}</p>
                    <p className="text-muted-foreground">Payment Method: {booking.paymentMethod}</p>
                    <p className="text-muted-foreground">Payment Status: {booking.paymentStatus}</p>
                  </div>
                </div>
              </div>
              
              {booking.status === 'confirmed' && (
                <div className="bg-muted p-4 rounded-lg flex items-start">
                  <Clock className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Cancellation Policy</p>
                    <p className="text-muted-foreground">
                      Free cancellation up to 24 hours before check-in. After that, cancellation may incur charges.
                    </p>
                  </div>
                </div>
              )}
              
              {booking.status === 'cancelled' && (
                <div className="bg-red-100 p-4 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">Booking Cancelled</p>
                    <p className="text-red-600">
                      This booking has been cancelled and is no longer valid.
                    </p>
                  </div>
                </div>
              )}
              
              {booking.status === 'completed' && (
                <div className="bg-green-100 p-4 rounded-lg flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-700">Booking Completed</p>
                    <p className="text-green-600">
                      This booking has been completed. We hope you enjoyed your experience!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {booking.status === 'confirmed' ? (
                <>
                  <Button variant="outline" onClick={() => router.push("/bookings")}>
                    Back to Bookings
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Cancel Booking</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                          Cancel Booking
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel this booking? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">
                          No, Keep Booking
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleCancelBooking}
                          disabled={isCancelling}
                        >
                          {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button variant="outline" onClick={() => router.push("/bookings")}>
                  Back to Bookings
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}