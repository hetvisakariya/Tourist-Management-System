import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">TravelEase</h3>
            <p className="text-muted-foreground mb-4">
              Making travel planning simple and enjoyable with our comprehensive booking services.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="YouTube">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Youtube className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/cabs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cabs
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tour Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" type="email" className="max-w-[220px]" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}