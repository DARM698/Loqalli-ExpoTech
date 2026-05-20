export default function pagoexitoso() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] py-10 px-6">

      <section className="max-w-4xl mx-auto">

        {/* Top Success */}
        <div className="flex flex-col items-center mb-10">

        {/* Circle */}
        <div className="w-20 h-20 rounded-full bg-[#DA653B] flex items-center justify-center mb-4">

        <span className="text-white text-3xl">
              ✓
        </span>

    </div>

        <h1 className="text-3xl font-serif text-[#2E2A27] mb-2">
            Booking Confirmed
        </h1>

        <p className="text-gray-500 text-center">
            Your place at the loom is reserved. See you soon!
        </p>

    </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-8">

        <div className="grid md:grid-cols-2">

        {/* Left Image */}
        <img
            src="https://2.bp.blogspot.com/-qX2jxVDqeUg/V-VTYWJL-cI/AAAAAAAAADM/Z1XTbfOhID8RdTnhcfJUiI1Zx4hWvaorACLcB/s1600/foto%2B3.jpg"
            alt="Workshop"
            className="w-full h-full object-cover"/>

        {/* Right Content */}
        <div className="p-6">

        {/* Small Label */}
        <p className="text-orange-500 text-sm font-medium mb-2">
            Taller & Curso
        </p>

        {/* Title */}
        <h2 className="text-2xl font-serif text-[#2E2A27] mb-6 tracking-tight">
            Ancestral Indigo Workshop
        </h2>

        {/* Info */}
        <div className="space-y-4 text-sm text-gray-600 mb-6">

        <div>
          May 14, 2024 · 09:30 AM - 12:30 PM
        </div>

        <div>
          Suchitoto Art Collective, El Salvador
        </div>

        <div>
          2 Guest
        </div>

      </div>

        {/* Total */}
        <div className="border-t pt-4">

        <p className="text-gray-500 text-sm mb-1">
          TOTAL PAID
        </p>

        <h3 className="text-2xl font-bold text-[#2E2A27]">
          $80
        </h3>

      </div>

        {/* Host */}
        <div className="mt-6 flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-gray-300">
        </div>

        <div>

          <p className="text-sm text-gray-500">
            Hosted by
          </p>

          <h4 className="font-serif text-[#2E2A27]">
            Niña Mary
          </h4>

        </div>

        </div>

        </div>

        </div>

    </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Tips Card */}
        <div className="bg-green-100 border-green-200 rounded-2xl border shadow-sm p-6">

        <h3 className="text-lg font-semibold text-[#2E2A27] mb-3">
            Preparation Tips
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
            Wear dark clothing that you don't mind getting stained.
            We provide aprons, but indigo is adventurous.
        </p>

  </div>

        {/* Email Card */}
        <div className="bg-green-100 border-green-200 rounded-2xl border shadow-sm p-6">

        <h3 className="text-lg font-semibold text-[#2E2A27] mb-3">
            Check Your Email
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
            We've sent the meeting point map and activity details
        to your inbox. Please review the arrival instructions.
        </p>

  </div>

</div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">

        {/* Download Button */}
        <button className="bg-[#DA653B] hover:bg-orange-800 transition text-white px-8 py-3 rounded-xl font-medium">

            Download Receipt

        </button>

        {/* Back Button */}
        <button className="border border-gray-400 hover:bg-gray-100 transition px-8 py-3 rounded-xl font-medium text-[#2E2A27]">

            Back to Home

        </button>

</div>

      </section>

    </main>
  );
}
