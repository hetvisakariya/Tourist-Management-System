"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, Calendar, MapPin, CreditCard, Mail } from "lucide-react";

export default function BookingConfirmationPage() {
  // In a real application, this data would come from the booking process
  const bookingDetails = {
    bookingId: "BK" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
    hotel: "Grand Luxury Hotel",
    location: "Bali, Indonesia",
    checkIn: "2025-06-15",
    checkOut: "2025-06-20",
    guests: 2,
    rooms: 1,
    totalAmount: 720,
    paymentMethod: "Credit Card"
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                Your booking has been successfully confirmed. Thank you for choosing TravelEase!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-center font-medium">Booking Reference: <span className="font-bold">{bookingDetails.bookingId}</span></p>
                <p className="text-center text-sm text-muted-foreground">A confirmation email has been sent to your registered email address.</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Booking Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Hotel</p>
                      <p className="text-muted-foreground">{bookingDetails.hotel}</p>
                      <p className="text-muted-foreground">{bookingDetails.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Stay Duration</p>
                      <p className="text-muted-foreground">Check-in: {new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
                      <p className="text-muted-foreground">Check-out: {new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Guests & Rooms</p>
                      <p className="text-muted-foreground">{bookingDetails.guests} Guests</p>
                      <p className="text-muted-foreground">{bookingDetails.rooms} Room</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Payment Information</p>
                      <p className="text-muted-foreground">Total Amount: ${bookingDetails.totalAmount}</p>
                      <p className="text-muted-foreground">Payment Method: {bookingDetails.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-muted-foreground">If you have any questions about your booking, please contact our customer support at support@travelease.com or call us at +1-800-TRAVEL.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/bookings" className="w-full">
                  <Button variant="outline" className="w-full">View My Bookings</Button>
                </Link>
                <Link href="/" className="w-full">
                  <Button className="w-full">Return to Home</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

import { Users } from "lucide-react";