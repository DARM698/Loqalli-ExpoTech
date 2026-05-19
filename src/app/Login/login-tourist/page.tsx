'use client'
import { useState } from "react"
import Image from "next/image"
import NavbarLogin from "@/components/navbarlogin"
import { useRouter } from "next/navigation" // <-- Importado
import { Eye, EyeOff } from "lucide-react"

export default function Tourist() {
    const router = useRouter(); // <-- Inicializado
    
    // --- LÓGICA DE CONTROL ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert("Por favor llena todos los campos.");

        setLoading(true);
        try {
            const res = await fetch('/api/registro/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Verificar que sea TURIST
                if (data.user.role !== 'TOURIST') {
                    alert("Esta cuenta está registrada como Host. Por favor ve al login de Hosts.");
                    setLoading(false);
                    return;
                }
                
                alert(`¡Bienvenido de vuelta, ${data.user.fullName}!`);
                
                // REDIRECCIÓN ACTUALIZADA A EXPLORE
                router.push('/explore'); 
            } else {
                alert(data.error || "Error al iniciar sesión.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <NavbarLogin/>

        <div className="bg-white min-h-screen flex items-center justify-center pt-12 overflow-hidden text-black">
          <div className="w-full max-w-2xl h-[540px] bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            
            <div className="hidden md:flex relative">
                <Image src="/image.jpg" alt="login image" width={500} height={500} className="object-cover w-full h-full"/>
                <div className="absolute bottom-10 left-10">
                    <h2 className="text-[#FFFFFF] text-3xl font-serif font-thin mb-2">Artistry in every connection.</h2>
                    <p className="text-[#FFFFFF] max-w-[260px] leading-4 text-xs">Experience the heart of El Salvador through the hands of its finest artisans.</p>
                </div>
            </div>
  
            <form onSubmit={handleSubmit} className="text-black flex flex-col justify-center px-5 py-3">
              <h1 className="text-[#2D362E] text-3xl font-serif mb-5">Welcome Back</h1>
              <p className="text-[#56423D] text-base mb-4">Sign in to your account to continue your journey.</p>
            
              <label className="text-[#56423D] p-2">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="text-[#2D362E] border border-[#F1EBE0] rounded bg-[#F1EBE0] w-full mb-3 p-2 text-center outline-none"
                required
              />
                  
              <div className="flex justify-between items-center">
                <label className="text-[#56423D] p-2">Password</label>
                <h1 className="text-[#DA653B] p-2 cursor-pointer text-sm hover:underline transition-all">Forgot password?</h1>
              </div>
              
              <div className="relative w-full mb-3 flex items-center">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="text-[#2D362E] border border-[#F1EBE0] rounded bg-[#F1EBE0] w-full p-2 text-center outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#56423D] hover:text-[#DA653B] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
                  
              <div className="flex items-center gap-3 mb-4 text-sm text-[#56423D]">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#DA653B]" />
                <p>Remember me for 30 days</p>
              </div>
  
              <button 
                type="submit" 
                disabled={loading}
                className="text-white border border-[#DA653B] rounded font-medium bg-[#DA653B] w-full p-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "LOADING..." : "LOG IN"}
              </button>
                
              <div className="w-full mt-4">
                <div className="flex items-center gap-4 my-2">
                  <hr className="flex-1 border-[#DA653B]/30"/>
                  <p className="text-[#56423D] text-xs uppercase tracking-wider">Or continue with</p>
                  <hr className="flex-1 border-[#DA653B]/30"/>
                </div>
  
                <button type="button" className="w-full border border-[#2D362E] rounded-lg p-2 flex items-center justify-center gap-2 transition hover:bg-gray-50 active:scale-95">
                  <span className="text-xl font-bold">G</span>
                  <span className="text-base font-medium">Continue with Google</span>
                </button>
  
                <p className="text-center mt-5 text-[#56423D] text-base">
                  New to loqalli?{" "}
                  <span className="text-[#C05C3F] font-bold cursor-pointer hover:underline transition-all">Sign up</span>
                </p>
              </div>
            </form>  
          </div>
        </div>
        </>
    )
}