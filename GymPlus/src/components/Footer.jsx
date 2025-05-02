import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "./Image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="src/assets/images/logo.png"
                alt="GymPlus Logo"
                className="h-10"
              />
              <span className="text-2xl font-bold text-white">GymPlus</span>
            </div>
            <p className="text-gray-300 mb-6">
              Join our community and transform your life with our expert
              trainers and state-of-the-art equipment.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink
                href="https://www.facebook.com/"
                icon={<FaFacebookF />}
                label="Facebook"
              />
              <SocialLink
                href="https://x.com/"
                icon={<FaTwitter />}
                label="Twitter"
              />
              <SocialLink
                href="https://www.instagram.com/"
                icon={<FaInstagram />}
                label="Instagram"
              />
              <SocialLink href="#" icon={<FaYoutube />} label="YouTube" />
              <SocialLink href="#" icon={<FaLinkedinIn />} label="LinkedIn" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/#programs" label="Programs" />
              <FooterLink to="/#membership" label="Membership" />
              <FooterLink to="/#trainers" label="Trainers" />
              <FooterLink to="/#contact" label="Contact" />
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Membership</h3>
            <ul className="space-y-3">
              <FooterLink to="/#membership" label="Basic Plan" />
              <FooterLink to="/#membership" label="Premium Plan" />
              <FooterLink to="/#membership" label="Elite Plan" />
              <FooterLink to="/#membership" label="Corporate Packages" />
              <FooterLink to="/#membership" label="Student Discounts" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for tips, special offers, and fitness
              updates.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} GymPlus. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 hover:bg-primary rounded-full w-8 h-8 flex items-center justify-center transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-gray-300 hover:text-primary transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
