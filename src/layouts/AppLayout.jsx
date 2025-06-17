import Header from "@/components/Header";
import Footer from "../components/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center px-2">
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="bg-gray-800 mt-10 p-10 w-full text-center">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
