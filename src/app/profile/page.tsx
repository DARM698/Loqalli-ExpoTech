export default function DashboardPage() {
  return (
    <main className="bg-[#f8f6f3] min-h-screen text-slate-800">

      {/* NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="text-3xl font-bold text-[#D17842] font-serif">
            Loqalli
          </h1>

          <div className="hidden md:flex gap-8 text-sm text-slate-700">
            <a href="#">Create Experience</a>
            <a href="#">Agenda / Calendar</a>
            <a href="#">Profile</a>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search experiences..."
          className="border border-gray-300 px-5 py-2 rounded-lg w-[280px] outline-none"
        />
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto mt-8 px-6">
        <div
          className="relative h-[420px] rounded-3xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://tv.joycemeyer.org/espanol/wp-content/uploads/sites/3/2021/12/2115-768x448.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>

          {/* PROFILE */}
          <div className="absolute bottom-8 left-8 flex items-end gap-6">
            <img
              src="https://wpcluster.dctdigital.com/myweekly/wp-content/uploads/sites/9/2018/07/Retired-woman-pottery-978x624.jpg"
              alt="Host"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl"
            />

            <div className="text-white">
              <h2 className="text-5xl font-bold font-serif">
                Doña Maria Velasco
              </h2>

              <p className="mt-2 text-lg">
                📍 Suchitoto, El Salvador
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-3xl shadow-sm p-10 grid md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Rating
            </p>

            <h3 className="text-5xl font-bold mt-4">
              4.9
            </h3>

            <p className="text-[#D17842] mt-2 text-xl">
              ★★★★★
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Based on 124 reviews
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button className="bg-[#D17842] text-white px-10 py-4 rounded-xl font-semibold hover:scale-105 transition">
              Book a Workshop
            </button>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Experiences
            </p>

            <h3 className="text-5xl font-bold mt-4">
              8
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Available workshops
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">

        <div>
          <h2 className="text-5xl font-serif font-bold mb-8">
            Crafting Heritage in Suchitoto
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-slate-600">
            <p>
              I have dedicated over 25 years to preserving the ancestral
              art of traditional Salvadoran craftsmanship.
            </p>

            <p>
              In my workshop, every piece tells a story of culture,
              memory, and identity passed through generations.
            </p>

            <p>
              Travelers from around the world visit to learn authentic
              techniques while connecting deeply with local traditions.
            </p>
          </div>
        </div>

        {/* MAP */}
        <div>
          <h3 className="text-3xl font-serif font-bold mb-6">
            Our Location
          </h3>

       <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15489.62079496145!2d-89.03425461575156!3d13.934462533624728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f636a189593cbb3%3A0xabf0b5a37df67cc4!2sSuchitoto!5e0!3m2!1ses-419!2ssv!4v1778342719922!5m2!1ses-419!2ssv"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-3xl shadow-lg"
></iframe>
        </div>

      </section>

      {/* EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-serif font-bold">
            Micro-experiences
          </h2>

          <button className="text-[#D17842] font-semibold">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">

            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1974&auto=format&fit=crop"
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D17842]">
                Technique
              </p>

              <h3 className="text-3xl font-serif font-bold mt-3">
                1-Hour Indigo Workshop
              </h3>

              <p className="text-slate-600 mt-4">
                Learn the basics of resist-dyeing and create your own
                unique patterned textile.
              </p>

              <div className="flex justify-between items-center mt-8">
                <span className="text-green-600 font-medium">
                  ● Available Today
                </span>

                <span className="font-bold">
                  $45
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">

            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1974&auto=format&fit=crop"
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D17842]">
                Pottery
              </p>

              <h3 className="text-3xl font-serif font-bold mt-3">
                Clay Modeling Masterclass
              </h3>

              <p className="text-slate-600 mt-4">
                Connect with the earth and mold traditional clay pieces
                using ancestral Salvadoran techniques.
              </p>

              <div className="flex justify-between items-center mt-8">
                <span className="text-green-600 font-medium">
                  ● Next Tomorrow
                </span>

                <span className="font-bold">
                  $35
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-20 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">

          <div>
            <h3 className="text-3xl font-bold text-[#D17842] font-serif">
              Loqalli
            </h3>

            <p className="mt-6 text-slate-500 leading-relaxed">
              Crafting connections across the artisanal landscape of El Salvador.
            </p>
          </div>

          <div>
            <h4 className="uppercase text-sm tracking-[0.2em] mb-6">
              Host Resources
            </h4>

            <ul className="space-y-4 text-slate-500">
              <li>Host an Experience</li>
              <li>Safety & Standards</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-sm tracking-[0.2em] mb-6">
              Legal
            </h4>

            <ul className="space-y-4 text-slate-500">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-sm tracking-[0.2em] mb-6">
              Newsletter
            </h4>

            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="border border-gray-300 px-4 py-3 rounded-l-xl w-full outline-none"
              />

              <button className="bg-[#D17842] text-white px-6 rounded-r-xl">
                →
              </button>
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-slate-400 mt-16 border-t pt-8">
          © 2026 Loqalli. All rights reserved.
        </div>
      </footer>

    </main>
  );
}