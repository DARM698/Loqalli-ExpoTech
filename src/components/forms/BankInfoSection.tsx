export const BankInfoForm = ({ onChange }: { onChange: any }) => (
  <div className="space-y-4 mt-8">
    <h2 className="text-2xl font-serif">Bank information</h2>
    <input name="accountHolder" placeholder="Account Holder" onChange={onChange} className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0" />
    <select name="bankName" onChange={onChange} className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0">
      <option value="">Select your bank</option>
      <option value="agricola">Banco Agrícola</option>
      <option value="cuscatlan">Banco Cuscatlan</option>
      {/* ... más bancos de El Salvador */}
    </select>
    <input name="accountNumber" type="number" placeholder="Numbers only" onChange={onChange} className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0" />
    <input name="routingNumber" placeholder="8 or 11 characters" onChange={onChange} className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0" />
  </div>
);