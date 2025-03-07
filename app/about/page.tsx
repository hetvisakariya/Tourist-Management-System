import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Award, Clock, Heart, Shield } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
    },
    {
      name: "David Kim",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Perspective",
      description: "We embrace diversity and bring a global mindset to everything we do."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in every service we provide."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust & Safety",
      description: "We ensure the highest standards of trust and safety for our customers."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Reliability",
      description: "We deliver on our promises and are always there when you need us."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "We build meaningful connections between travelers and local communities."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About TravelEase</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to make travel planning simple, enjoyable, and accessible for everyone.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              TravelEase was founded in 2020 with a simple idea: travel planning should be easy and stress-free. 
              What started as a small startup has grown into a comprehensive platform serving thousands of travelers worldwide.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founder, Sarah Johnson, experienced firsthand the challenges of coordinating travel arrangements 
              during a backpacking trip across Southeast Asia. Determined to solve this problem, she assembled a 
              team of travel enthusiasts and tech experts to create TravelEase.
            </p>
            <p className="text-muted-foreground">
              Today, we offer seamless booking services for hotels, cabs, and tour guides, all in one platform. 
              Our goal is to help you focus on creating memories, not managing logistics.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80"
              alt="TravelEase team"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-muted rounded-lg p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">10,000+</p>
              <p className="text-lg text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1,000+</p>
              <p className="text-lg text-muted-foreground">Hotels Worldwide</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-lg text-muted-foreground">Countries Covered</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}