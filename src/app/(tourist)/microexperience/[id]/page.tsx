'use client';

import Link from "next/link";
import { describe } from "node:test";

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">

      {/* NAVBAR */}
      <nav className="w-full px-8 py-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-serif italic text-[#D17842]">Loqalli</h1>

        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/">Home</Link>
          <Link href="/experiences" className="text-[#D17842]">Experiences</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-[#D17842] text-white rounded-full">
            Login
          </button>
          <button className="px-4 py-2 text-sm border rounded-full">
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-16 px-6 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
          Growing economies, connecting idetities
        </h2>

        <input
          type="text"
          placeholder="Search experiences..."
          className="w-full max-w-xl mx-auto px-6 py-3 rounded-full border outline-none"
        />
      </section>

      {/* FILTROS */}
      <section className="flex justify-between items-center px-10 py-6">
        <button className="border px-4 py-2 rounded-lg">Filter</button>

        <p className="text-sm">
          Sort by: <span className="font-bold">Featured</span>
        </p>
      </section>

      {/* GRID */}
      <section className="px-10 pb-20">
        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Traditional Indigo Workshop with Doña Maria",
              price: "$45",
              location: " Suchitoto, Cuscatlán",
              img: "https://images.stockcake.com/public/d/3/7/d378e63d-eb24-4b4e-8697-ba64c98b6e14_large/indigo-dyeing-tradition-stockcake.jpg",
            },
            {
              title: "Black Clay Secrets of Guatajiagua",
              price: "$35",
              location: "Guatajiagua, Morazán",
              img: "https://tse1.explicit.bing.net/th/id/OIP.5iSdD_OVVTIQi7JwjJG6VgHaFX?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              title: "The Golden Bean: Cupping Session",
              price: "$60",
              location: "Apaneca, Ahuachapán",
              img: "https://tse1.explicit.bing.net/th/id/OIP.PkpPaROERzW-q4b7GjcCXgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              title: "Naif Art Painting Masterclass",
              price: "$25",
              location: "La Palma, Chalatenango",
              img: "https://tse1.explicit.bing.net/th/id/OIP.5U-BGt_dm7EeHbKnacYnXQHaE4?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              title: "The Woodcarver's Touch",
              price: "$50",
              location: "Ilobasco, Cabañas",
              img: "https://tse4.mm.bing.net/th/id/OIP.f2LAj34p8W0asVt_GTQVZQHaHE?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              title: "Coatepeque Morning Kayak & Local Fare",
              price: "$75",
              location: "Coatepeque, Santa Ana",
              img: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/f2/aa/0c.jpg",
            },
          ].map((item, idx) => (

            <div key={idx} className="group">

              <div className="relative h-[250px] rounded-xl overflow-hidden mb-4">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <span className="absolute top-3 left-3 bg-white px-3 py-1 text-sm rounded-full">
                  {item.price}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {item.location}
              </p>

              <button className="text-[#D17842] text-sm font-bold">
                Explore Details →
              </button>

            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 px-10 py-12">
        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h3 className="text-xl font-serif text-[#D17842]">Loqalli</h3>
            <p className="text-sm text-gray-500 mt-2">
              Crafting connections across El Salvador.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">HOST RESOURCES</h4>
            <p>Host an Experience</p>
            <p>Safety & Standards</p>
            <p>Help Center</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">LEGAL</h4>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">NEWSLETTER</h4>
            <input
              type="email"
              placeholder="Email address"
              className="border px-3 py-2 w-full"
            />
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          © 2026 Loqalli. All rights reserved.
        </p>
      </footer>

    </main>
  );
}