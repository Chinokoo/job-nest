import { Facebook, Instagram, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="mx-auto px-4 container">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            <h2 className="mb-2 font-bold text-2xl">JobNest</h2>
            <p className="text-gray-400">Connecting talent with opportunity</p>
          </div>

          <div className="flex flex-col items-center mb-6 md:mb-0">
            <div>
              <h3 className="mb-4 font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/all-jobs" className="hover:text-blue-300">
                    Our Jobs
                  </a>
                </li>
                <li>contact: peterchinokoo@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-center mt-8 pt-8 border-gray-700 border-t">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} JobNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
