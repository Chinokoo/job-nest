import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { ArrowRight, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import faqs from "../data/faq.json";

import AuthModal from "@/components/auth_components/AuthModal";
import { useAuthStore } from "@/store/authStore";

const LandingPage = () => {
  const { loginModal, setLoginModal, user } = useAuthStore();

  // TODO: for future use.
  // const handleOverlayClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     setLoginModal();
  //   }
  // };

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      {/* hero */}
      <section className="text-center">
        <h1 className="flex flex-col justify-center py-4 font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter gradient gradient-title">
          {" "}
          Hatch Your Career
          <span className="flex justify-center sm:gap-6">
            {}Soar high to Success
            <img
              src="/eagle.png"
              alt="eagle"
              className="hidden sm:block sm:size-24 lg:size-32 text-blue-500"
            />
          </span>
        </h1>
        <p className="sm:mt-4 text-stone-500 text-sm sm:text-2xl">
          Explore the world of talent or find your dream job !
        </p>
        <blockquote className="mx-2 mt-5 text-stone-500 text-xs sm:text-lg italic">
          <p>
            " Hold Fast to your Dreams, for if dreams die, life is a
            broken-winged bird that cannot fly "
          </p>
          <footer>- Langston Hughes</footer>
        </blockquote>
      </section>
      {/* buttons */}
      <div className="flex justify-center gap-4">
        {user?.role === "employer" ? (
          <Link to={"/create-job"}>
            <Button className="bg-[#1A6CA5] hover:bg-blue-600 md:px-10 md:py-7 text-white text-sm md:text-2xl cursor-pointer">
              Create Jobs
            </Button>
          </Link>
        ) : user?.role === "candidate" ? (
          <Link to={"/all-job"}>
            <Button className="bg-[#57A656] hover:bg-green-600 md:px-10 md:py-7 text-white text-sm md:text-2xl cursor-pointer">
              Find Jobs
            </Button>
          </Link>
        ) : (
          <h1 className="font-bold text-[#1A6CA5] text-3xl">
            Welcome to Job Nest
          </h1>
        )}
      </div>
      {/* carousel */}
      <Carousel className="py-10 w-full">
        <CarouselContent>
          {companies.map(({ name, logo, id }) => (
            <CarouselItem key={id} className="basis-1/4 lg:basis-1/7">
              <img
                src={logo}
                alt={name}
                className="rounded-md h-15 sm:h-24 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img
        src="/banner.jpg"
        alt="banner"
        className="shadow-md rounded-md w-full object-cover"
      />
      {/* cards section */}
      <section className="gap-5 grid grid-cols-1 md:grid-cols-2 px-2">
        <Card>
          <CardHeader className="font-bold text-[#57A656] text-2xl">
            Employers
          </CardHeader>
          <CardContent>
            <span className="flex gap-2">
              <ArrowRight />
              <p>
                Soar to Success, by finding the right talent for your company.
              </p>
            </span>
            <span className="flex gap-2">
              <ArrowRight />

              <p>Post your Jobs.</p>
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-bold text-[#1A6CA5] text-2xl">
            Candidates
          </CardHeader>
          <CardContent>
            <span className="flex gap-2">
              <ArrowRight />
              <p> Hatch your Career, by finding the right opportunity.</p>
            </span>

            <span className="flex gap-2">
              <ArrowRight />
              <p>Submit your resume and soar to new heights.</p>
            </span>
          </CardContent>
        </Card>
      </section>
      {/* accordion */}
      <div className="px-2">
        <h2 className="font-bold text-2xl text-center">FAQ</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {loginModal && (
        <div className="top-0 left-0 z-50 fixed inset-0 flex justify-center items-center bg-black/60 dar:bg-white/50 pt-50 w-full min-h-screen overflow-y-scroll">
          <div className="flex flex-col justify-center bg-gray-800 shadow-md my-52 mt-48 p-2 rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-start">
              <div />
              <img src="/logo.png" className="size-20" alt="company logo" />
              <button
                onClick={() => setLoginModal()}
                className="m-2 text-white"
              >
                <X />
              </button>
            </div>
            <AuthModal />
          </div>
        </div>
      )}
    </main>
  );
};

export default LandingPage;
