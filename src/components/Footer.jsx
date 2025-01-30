import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* LAYOUTS Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">LAYOUTS</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-400 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-400 transition">
                Financial Services
              </a>
            </li>
            <li>
              <a href="/investment" className="hover:text-gray-400 transition">
                Investment Plans
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/strategy" className="hover:text-gray-400 transition">
                Strategy Performance
              </a>
            </li>
          </ul>
        </div>

        {/* SECTIONS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">ALL SECTIONS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Investment Plans
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Financial Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Wealth Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Crypto & Stocks
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Loan & Credit Services
              </a>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-gray-400 transition">
                Market Insights
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-gray-400 transition">
                Investment Plans
              </a>
            </li>
            <li>
              <a href="/partners" className="hover:text-gray-400 transition">
                Partners & Affiliates
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-gray-400 transition">
                Client Login
              </a>
            </li>
            <li>
              <a href="/updates" className="hover:text-gray-400 transition">
                Financial Updates
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h3 className="text-lg font-semibold mb-3">CONTACT US</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@fintech.com"
                className="hover:text-gray-400 transition"
              >
                support@fintech.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-gray-400 transition"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li>Address: 123 Fintech St, Business City</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm">
        <p>© {new Date().getFullYear()} Fintech. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
