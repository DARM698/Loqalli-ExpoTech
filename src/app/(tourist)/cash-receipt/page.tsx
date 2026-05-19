"use client";
import jsPDF from "jspdf";
export default function CashReceiptPage() {

    const downloadReceipt = () => {

  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);

  doc.text(
    "PAYMENT RECEIPT",
    20,
    20
  );

  // Datos
  doc.setFontSize(12);

  doc.text(
    "Transaction ID: #LQ-P9281-AX",
    20,
    40
  );

  doc.text(
    "Experience Date: May 24, 2024",
    20,
    50
  );

  doc.text(
    "Payment Method: Cash",
    20,
    60
  );

  doc.text(
    "Total Paid: $28.50",
    20,
    80
  );

  // Descargar
  doc.save(
    "receipt.pdf"
  );

};

  return (
    <main className="min-h-screen bg-[#F8F5F2] flex items-center justify-center px-6 py-10">

      <section className="w-full max-w-md">

        {/* Success */}
        <div className="flex flex-col items-center mb-8">

        {/* Circle */}
        <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center mb-4">

        <span className="text-white text-2xl">
              ✓
        </span>

        </div>

        <h1 className="text-2xl font-bold text-[#2E2A27]">
            ¡Payment Successful!
        </h1>

        <p className="text-gray-500 text-sm text-center mt-1">
            Your transaction has been processed successfully
        </p>

        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">

        <p className="text-orange-500 text-xs text-center font-semibold tracking-wide mb-2">
            RECEIPT OF PAYMENT
        </p>

        <h2 className="text-center text-xl font-semibold text-[#2E2A27] mb-6">
            Payment Details
        </h2>

        <hr className="mb-6"/>

        {/* Data */}
        <div className="space-y-4 text-sm">

        <div className="flex justify-between">

        <span className="text-gray-500">
                Transaction ID
        </span>

        <span className="text-gray-800 font-medium">
                #LQ-P9281-AX
        </span>

        </div>

        <div className="flex justify-between">

        <span className="text-gray-500">
                Experience Date
        </span>

        <span className="text-gray-800 font-medium">
                May 24, 2024
        </span>

        </div>

        <div className="flex justify-between text-gray-300">

        <span className="text-gray-500">
                Payment Method
        </span>

              <span className="text-gray-800 font-medium">
                Visa ****2422
              </span>

        </div>

    </div>

          <p className="text-xs text-gray-400 mt-6 leading-relaxed">

            This receipt will not be valid 24 hours after
            the micro-experience.

          </p>

        <div className="border-t mt-6 pt-6 space-y-3">

        <div className="flex justify-between text-sm text-gray-500">

              <span>
                Price
              </span>

              <span>
                $30.00
              </span>

            </div>

        <div className="flex justify-between text-sm text-gray-500">

              <span>
                Commission
              </span>

              <span>
                $1.50
              </span>

        </div>

    </div>

        <div className="flex justify-between items-center mt-6">

            <h3 className="text-2xl font-bold text-[#2E2A27]">
              Total to Pay
            </h3>

            <span className="text-2xl font-bold text-orange-600">
              $28.50
            </span>

          </div>

        <p className="text-center text-xs text-gray-400 mt-2">
            (*commission price reflected in final balance*)
        </p>

        <div className="text-center text-xs text-gray-500 mt-8">

            Secure and Encrypted payment.

          </div>
    
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-8">

        {/* Download */}
        <button
        onClick={downloadReceipt}
        className="bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-xl font-medium">

            Download Receipt

        </button>

        {/* Back */}
        <button className="border border-gray-300 hover:bg-gray-100 transition py-3 rounded-xl font-medium text-[#2E2A27]">

            Back to Home

        </button>

</div>

      </section>

    </main>
  );
}