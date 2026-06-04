"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBooking } from "@/app/actions";
import { format } from "date-fns";
import Image from "next/image";
import NavbarUser from "@/components/shared/navbar";

export default function CheckoutClient({ experience, userId }: { experience: any; userId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateStr = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const guests = parseInt(searchParams.get("guests") || "1");

  const [loading, setLoading] = useState(false);

  const [bankData, setBankData] = useState({
    accountHolder: "",
    bankName: "",
    accountType: "",
    accountNumber: "",
    routingNumber: ""
  });

  const paymentMethod = experience.paymentMethod || "CARD";

  const subtotal = experience.pricePerPerson * guests;
  const commission = subtotal * 0.05;
  const total = subtotal + commission;
  const cashToHost = subtotal - commission;

  const handleReservation = async () => {
    setLoading(true);
    try {
      const booking = await createBooking({
        experienceId: experience.id,
        date: dateStr,
        time: experience.startTime,
        guests: guests,
        bankInfo: bankData,
      });

      router.push(`/pagoexitoso?bookingId=${booking.id}`);

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarUser role="TOURIST" userId={userId} />

      <main className="min-h-screen bg-[#FFFFFF] px-10 py-10 text-[#2E2A27]">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-serif mb-10">Finalize reservation</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* COLUMNA IZQUIERDA */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-serif">Number of people</h2>
                <p className="text-gray-700">{guests} people selected for this activity.</p>
              </div>

              {paymentMethod === "CARD" && (
                <div className="bg-white border rounded-xl shadow-sm p-6 mt-6">
                  <h2 className="text-lg font-serif text-[#2E2A27] mb-6">Card information</h2>
                  <div className="mb-4">
                    <label className="block text-sm mb-2 text-gray-700">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2 text-gray-700">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Expiration Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">CVV</label>
                      <input type="text" placeholder="123" className="w-full border px-4 py-3 rounded-xl placeholder:text-gray-500 text-black"/>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-serif mb-6">Bank Information</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Account Holder Name" className="w-full border px-4 py-3 rounded-xl text-black" onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})} />
                  <input type="text" placeholder="Bank Name" className="w-full border px-4 py-3 rounded-xl text-black" onChange={(e) => setBankData({...bankData, bankName: e.target.value})} />
                  <input type="text" placeholder="Account Type (e.g. Savings)" className="w-full border px-4 py-3 rounded-xl text-black" onChange={(e) => setBankData({...bankData, accountType: e.target.value})} />
                  <input type="text" placeholder="Account Number" className="w-full border px-4 py-3 rounded-xl text-black" onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})} />
                  <input type="text" placeholder="Routing Number" className="w-full border px-4 py-3 rounded-xl text-black" onChange={(e) => setBankData({...bankData, routingNumber: e.target.value})} />
                </div>
              </div>

              {paymentMethod === "CASH" && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h2 className="text-lg font-serif text-orange-900 mb-2">Cash Payment</h2>
                  <p className="text-orange-800 text-sm">
                    You will pay the <strong>${cashToHost.toFixed(2)}</strong> balance directly to the host in cash at the meeting point.
                  </p>
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA: Resumen */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden sticky top-24">
                <div className="relative w-full h-52">
                  <Image src={experience.images?.[0] || "/avatar.png"} alt={experience.title} fill className="object-cover" />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-serif mb-2">{experience.title}</h2>
                  <div className="space-y-3 mb-6 text-sm text-gray-800">
                    <div className="flex justify-between font-medium"><span>Date</span><span>{dateStr}</span></div>
                    <div className="flex justify-between font-medium"><span>Hour</span><span>{experience.startTime}</span></div>
                    <div className="flex justify-between font-medium"><span>Location</span><span>{experience.address}</span></div>
                  </div>

                  <div className="space-y-4 border-t pt-4 text-gray-800">
                    <div className="flex justify-between"><span>Subtotal ({guests} guests)</span><span>${subtotal.toFixed(2)}</span></div>

                    {paymentMethod === "CASH" ? (
                      <>
                        <div className="flex justify-between text-orange-600 font-medium"><span>Pay to host (Cash)</span><span>${cashToHost.toFixed(2)}</span></div>
                        <div className="flex justify-between text-gray-600"><span>Platform fee (due now)</span><span>${commission.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-xl pt-2 text-black"><span>Total due now</span><span>${commission.toFixed(2)}</span></div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between"><span>Platform fee (5%)</span><span>${commission.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-xl pt-2 text-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleReservation}
                    disabled={loading}
                    className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition"
                  >
                    {loading ? "Processing..." : paymentMethod === "CASH" ? "Pay Fee & Confirm" : "Complete Reservation"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}