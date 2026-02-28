"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="m-0 p-0 font-[Roboto,sans-serif] bg-[#1a1a2e] text-[#e0e0e0] flex flex-col min-h-screen">
      <header className="bg-[#2b2b3d] text-white p-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Nate's Downloads</Link>
        </div>
        <nav>
          <ul className="flex m-0 p-0 list-none">
            <li className="ml-5">
              <Link href="/downloads" className="text-white text-lg hover:underline">Downloads</Link>
            </li>
            <li className="ml-5">
              <a href="https://support.natemarcellus.com" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:underline">Support</a>
            </li>
            <li className="ml-5">
              <Link href="/donate" className="text-white text-lg hover:underline">Donate</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="text-center py-12 px-5 bg-[#2b2b3d] mt-5 mb-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
        <h1 className="text-[36px] mb-5 text-[#f0f0f0]">Welcome to Nate's Downloads</h1>
        <p className="text-[18px] mb-5 text-[#d0d0d0]">
          Your one-stop destination for all your download needs. Explore our tools and utilities designed to enhance your experience.
        </p>
        <button className="bg-[#6ab6ff] text-white py-2.5 px-5 text-lg rounded cursor-pointer transition-all duration-300 hover:bg-[#509ed8] hover:scale-105">
          <Link href="/downloads">Get Started</Link>
        </button>
      </section>

      <section className="flex justify-around mb-5 gap-5 flex-wrap">
        <div className="bg-[#2b2b3d] p-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)] w-full md:w-[30%] text-center">
          <h2 className="text-2xl mb-2.5 text-[#f0f0f0]">Missionchief Bot</h2>
          <p className="text-base text-[#d0d0d0]">
            Automate your Missionchief tasks with ease. Our bot ensures you stay ahead in the game.
          </p>
        </div>

        <div className="bg-[#2b2b3d] p-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)] w-full md:w-[30%] text-center">
          <h2 className="text-2xl mb-2.5 text-[#f0f0f0]">Personal Launcher</h2>
          <p className="text-base text-[#d0d0d0]">
            Launch your favorite applications quickly and efficiently with our Personal Launcher.
          </p>
        </div>

        <div className="bg-[#2b2b3d] p-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)] w-full md:w-[30%] text-center">
          <h2 className="text-2xl mb-2.5 text-[#f0f0f0]">Military Chief (WIP)</h2>
          <p className="text-base text-[#d0d0d0]">
            Experience a new spin-off of Missionchief tailored for military operations. Stay tuned for updates!
          </p>
        </div>
      </section>

      <footer className="bg-[#2b2b3d] text-white text-center p-2.5">
        © 2024 Nate's Downloads. All rights reserved.
      </footer>
    </div>
  );
}
