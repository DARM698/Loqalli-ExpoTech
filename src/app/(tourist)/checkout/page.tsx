export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] px-10 py-10">

      {/* Main Container */}
      <section className="max-w-7xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-serif text-[#2E2A27] mb-10">
          Finalize reservation
        </h1>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">

        {/* Number of People Card */}
        <div className="bg-white border rounded-xl shadow-sm p-6">

        <div className="flex items-center justify-between">

        {/* Left Text */}
        <div>

        <h2 className="text-lg font-serif text-[#2E2A27]">
        Number of people
        </h2>

        <p className="text-sm text-gray-500">
        Maximum 6 participants per activity
        </p>

        </div>

        {/* Counter */}
        <div className="border-2 w-44 px-4 py-3 flex items-center justify-between rounded-xl">

        <button className="text-[#DA653B] text-xl">
         -
        </button>

        <span className=" text-gray-500 font-medium">
         2
        </span>

        <button className="text-[#DA653B] text-xl">
         +
        </button>

        </div>

    </div>

</div>
        {/* Payment Method color: DA653B */ }
        <div className="bg-white border rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-lg font-serif text-[#2E2A27] mb-6">
            Payment method
        </h2>

        <div className="flex gap-4">

        {/* Card Option */}
        <div className="border-2 rounded-xl border-[#DA653B] p-4 w-64 cursor-pointer">

        <h3 className="font-medium text-[#2E2A27]">
        Debit/Credit Card
        </h3>

        </div>

        {/* Chivo Wallet */}
        <div className="border-2 rounded-xl border-[#DA653B] p-4 w-64 cursor-pointer">

        <h3 className="font-medium text-[#2E2A27]">
        Chivo Wallet / Digital
        </h3>

    </div>
    
  </div>

</div>

        {/* Card Information */}
        <div className="bg-white border rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-lg font-serif text-[#2E2A27] mb-6">
        Card information
        </h2>

        {/* Cardholder Name */}
        <div className="mb-4 ">

        <label className="block  text-sm mb-2 text-gray-700">
        Cardholder Name
        </label>

        <input 
        type="text"
        placeholder="John Doe"
        className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>

</div>

        {/* Card Number */}
        <div className="mb-4">

        <label className="block text-sm mb-2 text-gray-700">
        Card Number
        </label>

        <input
        type="text"
        placeholder="1234 5678 9012 3456"
        className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>

</div>

        {/* Bottom Inputs */}
        <div className="grid grid-cols-2 gap-4">

        {/* Expiration */}
    <div>

        <label className="block text-sm mb-2 text-gray-700">
        Expiration Date
        </label>

        <input
        type="text"
        placeholder="MM/YY"
        className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>

    </div>

        {/* CVV */}
        <div>

        <label className="block text-sm mb-2 text-gray-700">
        CVV
        </label>

        <input
        type="text"
        placeholder="123"
        className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>

    </div>

        </div>

        </div>
</div>



        {/* RIGHT SIDE */}
    <div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

        {/* Image */}
        <img
        src="https://2.bp.blogspot.com/-qX2jxVDqeUg/V-VTYWJL-cI/AAAAAAAAADM/Z1XTbfOhID8RdTnhcfJUiI1Zx4hWvaorACLcB/s1600/foto%2B3.jpg"
        alt="Ceramic Workshop"
        className="w-full h-52 object-cover"/>

        {/* Content */}
        <div className="p-6">

        {/* Title */}
        <h2 className="text-2xl font-serif text-[#2E2A27] mb-2">
        Ancestral Indigo Workshop
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
        Learn traditional ceramic techniques with local artisans.
        </p>
        {/* Date & Time */}
        <div className="space-y-3 mb-6">

        <div className="flex justify-between text-sm">

        <span className="text-gray-500">
        Date
        </span>

        <span className="font-medium text-[#2E2A27]">
        14 May, 2024
        </span>

        </div>

        <div className="flex justify-between text-sm">

        <span className="text-gray-500">
        Hour
        </span>

        <span className="font-medium text-[#2E2A27]">
        9:30 AM - 12:30 PM
        </span>

        </div>
        <div className="flex justify-between text-sm">

        <span className="text-gray-500">
        Local
        </span>

        <span className="font-medium text-[#2E2A27]">
        Suchitoto, El Salvador
        </span>
        
        </div>

</div>

        {/* Price Details */}
        <div className="border-t border-b py-4 space-y-3 mb-6">

        <div className="flex justify-between text-sm">

        <span className="text-gray-500">
        Subtotal (2 personas)
        </span>

        <span className="text-gray-400">
        $70
        </span>

        </div>

        <div className="flex justify-between text-sm">

        <span className="text-gray-500">
        Taxes
        </span>

        <span className="text-gray-400">
        $10
        </span>

        </div>

</div>

      {/* Price */}
      <div className="flex justify-between items-center mb-6">

        <span className="text-gray-500">
          Total
        </span>

        <span className="text-2xl font-bold text-[#2E2A27]">
          $80
        </span>

</div>

      {/* Button */}
      <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-medium">

        Complete Reservation

      </button>

      {/* Host */}
      <div className="mt-6 border-t pt-4">

        <p className="text-sm text-gray-500">
          Hosted by
        </p>

        <h3 className="font-semibold text-[#2E2A27] ">
          Niña Mary
        </h3>

      </div>

    </div>

  </div>

</div>
          </div>
      </section>

    </main>
  );
}