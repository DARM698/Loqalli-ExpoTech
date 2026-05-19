import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const BasicInfoForm = ({ onChange }: { onChange: any }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif">Basic Information</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        onChange={onChange}
        className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0"
      />

      <input
        name="age"
        type="number"
        placeholder="How old are you?"
        onChange={onChange}
        className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0 appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <input
        name="email"
        type="email"
        placeholder="name@example.com"
        onChange={onChange}
        className="w-full p-2 bg-[#f3eee7] focus:outline-none focus:ring-0"
      />

      {/* Password con ojito */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          onChange={onChange}
          className="w-full p-2 pr-10 bg-[#f3eee7] focus:outline-none focus:ring-0"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};