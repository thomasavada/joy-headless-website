import Image from "next/image";
import Link from "next/link";
import {Facebook, Github, Instagram, Linkedin, Twitter} from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#0A0C10] py-16">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12">
        {/* Logo and Social Section */}
        <div className="space-y-6">
          <Link href="/" className="block">
            <Image
 src="/joy-logo-light.svg"
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
            <Link href="https://twitter.com/joyplatform_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/company/joyplatform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="https://www.facebook.com/joyplatform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/joyplatform_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://github.com/joy-platform" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Company Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">
                Case Studies
              </Link>
            </li>
          </ul>
        </div>

        {/* Case Studies Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Case Studies</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/case-studies/korean-skincare" className="text-gray-400 hover:text-white transition-colors">
                Korean Skincare
              </Link>
            </li>
            <li>
              <Link href="/case-studies/beauty-box" className="text-gray-400 hover:text-white transition-colors">
                Beauty Box
              </Link>
            </li>
            <li>
              <Link href="/case-studies/fashion-store" className="text-gray-400 hover:text-white transition-colors">
                Fashion Store
              </Link>
            </li>
          </ul>
        </div>

        {/* Product Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="https://help.joy.so" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://devdocs.joy.so" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                API Docs
              </Link>
            </li>
            <li>
              <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
