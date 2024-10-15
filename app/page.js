import Image from "next/image";
import Header from "./components/header";
import heroimg from "../app/images/hero-img.png"
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-4 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Better Solution For Your Social Media Traffic
            </h1>
            <p className="mb-8 leading-relaxed">
              A technology-first publisher specializing in entertainment, looking to partner with affiliates to drive traffic to our websites
            </p>
            <div className="flex justify-center">
              <Link href={"/dashboard"}>
              <button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                Get Started
              </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image className="object-cover object-center rounded" alt="hero" src={heroimg} />
          </div>
        </div>
      </section>
    </>
  );
}
