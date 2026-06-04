"use client";
import jsPDF from "jspdf";
import Image from "next/image";
import NavbarUser from "./shared/navbar";

export default function PagoExitosoClient({ booking }: { booking: any }) {
  const experience = booking.Experience;
  
  // Extraemos el ID del turista desde el objeto booking que viene de la BD
  const userId = booking.touristId;
  const userRole = 'TOURIST'; // Asumimos que el que ve el recibo es el turista

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.text(`Booking Confirmed: ${experience.title}`, 20, 20);
    doc.text(`Date: ${booking.date}`, 20, 30);
    doc.text(`Guests: ${booking.guests}`, 20, 40);
    const total = experience.pricePerPerson * booking.guests;
    doc.text(`Total Paid: $${total.toFixed(2)}`, 20, 50);
    doc.save("recibo.pdf");
  };

  return (
    <>
      <NavbarUser role={userRole} userId={userId} />

      <main className="min-h-screen bg-[#FFFFFF] py-10 px-6">
        <section className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[#DA653B] flex items-center justify-center mb-4 text-white text-3xl">✓</div>
            <h1 className="text-3xl font-serif text-[#2E2A27] mb-2">Booking Confirmed</h1>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-8 grid md:grid-cols-2">
            <div className="relative w-full h-64 md:h-auto">
               <Image 
                  src={experience.images?.[0] || "/avatar.png"} 
                  alt={experience.title} 
                  fill 
                  className="object-cover" 
               />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-serif mb-6 text-black">{experience.title}</h2>
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <p>{booking.date} · {experience.startTime}</p>
                <p>{experience.address}</p>
                <p>{booking.guests} Guests</p>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-500 text-sm">TOTAL PAID</p>
                <h3 className="text-2xl font-bold text-black">
                  ${(experience.pricePerPerson * booking.guests).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={downloadReceipt} className="bg-[#DA653B] text-white px-8 py-3 rounded-xl hover:bg-orange-800 transition">
              Download Receipt
            </button>
          </div>
        </section>
      </main>
    </>
  );
}