import Image from "next/image";
import Link from "next/link";
import {Facebook, Github, Instagram, Linkedin, Twitter} from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#0A0C10] py-16">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo and Social Section */}
        <div className="space-y-6">
          <Link href="https://joy.so/" className="block">
            <Image
              src="https://joy.so/wp-content/uploads/2024/12/Joy-white.png"
              alt="Joy.so"
              width={200}
              height={100}
              className="w-auto h-12"
            />
          </Link>
          <p className="text-gray-400">
            Rewards & Loyalty Program for Shopify Business
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Company Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://joy.so/about-us/" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="https://joy.so/terms-of-use/" className="text-gray-400 hover:text-white transition-colors">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="https://joy.so/privacy-policy/" className="text-gray-400 hover:text-white transition-colors">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Product Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://help.joy.so/" className="text-gray-400 hover:text-white transition-colors">
                Help Docs
              </Link>
            </li>
            <li>
              <Link href="https://joy.so/pricing/" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="https://joy.so/contact/" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Contact Us</h3>
          <Link href="mailto:support@joy.so" className="text-gray-400 hover:text-white transition-colors">
            support@joy.so
          </Link>
        </div>
      </div>
    </footer>
  );
};
