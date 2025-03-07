"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { bookingsAPI, Booking } from "@/lib/api";
import { format } from "date-fns";
import { Calendar, MapPin, Car, Users, CreditCard, AlertTriangle } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await bookingsAPI.getAll();
        setBookings(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch bookings.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, authLoading, router, toast]);

  const handleCancelBooking = async () => {
    if (!cancelBookingId) return;
    
    setIsCancelling(true);
    
    try {
      const response = await bookingsAPI.cancelBooking(cancelBookingId);
      
      // Update bookings list
      setBookings(bookings.map(booking => 
        booking._id === cancelBookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
      
      setCancelBookingId(null);
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
        return <MapPin className="h-4 w-4" />;
      case 'cab':
        return <Car className="h-4 w-4" />;
      case 'guide':
        return <Users className="h-4 w-4" />;
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {bookings.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">{booking.bookingId}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getBookingTypeIcon(booking.bookingType)}
                          <span className="ml-2 capitalize">{booking.bookingType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.checkIn ? (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</span>
                          </div>
                        ) : booking.date ? (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          <span>${booking.totalAmount}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/bookings/${booking._id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          
                          {booking.status === 'confirmed' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => setCancelBookingId(booking._id)}
                                >
                                  Cancel
                                </Button>
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
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setCancelBookingId(null)}
                                  >
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
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
            <div className="flex justify-center space-x-4">
              <Link href="/hotels">
                <Button>Book a Hotel</Button>
              </Link>
              <Link href="/cabs">
                <Button variant="outline">Book a Cab</Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline">Book a Guide</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}