'use client'
import Image  from "next/image"
import NavbarLogin from "@/components/navbarlogin"
export default function Tourist(){

 
    return(
        <>
        <NavbarLogin/>

       <div className="bg-white min-h-screen flex  items-center justify-center pt-12 overflow-hidden text-black">
         
        <div className=" w-full max-w-2xl h-[540px] bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            
            <div className="hidden md:flex relative">
                <Image src="/image.jpg" alt="login image" width={500} height={500} className="object-cover w-full h-full"/>
                <div className="absolute bottom-10 left-10">
                    <h2 className="text-[#FFFFFF] text-3xl font-serif font-thin mb-2">Artistry in every connection.</h2>
                    <p className="text-[#FFFFFF] max-w-[260px] leading-4 text-xs">Experience the heart of El Salvador through the hands of  its finest artisans.</p>
                </div>
            </div>
  
            <div className="text-black flex flex-col justify-center px-5 py-3">
             <h1 className="text-[#2D362E] text-3xl font-serif mb-5">Welcome Back</h1>
             <p className="text-[#56423D] text-base mb-4">Sign in to your account to continue your journey.</p>
           
             <label className="text-[#56423D] p-2">Email Address</label>
                 
                <input type="email"
                 placeholder="name@example.com"
                 className="text-[#2D362E]border border-[#F1EBE0] rounded bg-[#F1EBE0] w-full mb-3 p-2 text-center outline-none"/>
                 
                <div className="flex justify-between items-center ">
                <label className="text-[#56423D] p-2">Password</label>
                <h1 className="text-[#DA653B] p-2">Forgot password?</h1>
                </div>
             
                 <input type="password"
                 placeholder="********"
                 className="text-[#2D362E] border border-[#F1EBE0] rounded bg-[#F1EBE0] w-full mb-3 p-2 text-center outline-none"/>
                 
                 <div className="flex items-center gap-3 mb-4">
                <input type="checkbox"
                className="w-4 h-4 rounded" />
                <p>Remember me for 30 days</p>
                </div>
 
                 <button type="submit" className="text-[white] border border-[#DA653B] rounded font-medium items-center bg-[#DA653B] w-full p-2">LOG IN</button>
                
                  <div className="w-full">
                  <div className="flex items-center gap-4 my-2">
                    <hr className="flex-1 border-[#DA653B]"/>
                    <p className="text-[#56423D]">Or continue with</p>
                    <hr className="flex-1 border-[#DA653B]"/>
                </div>
 
                <button className="w-full border border-[#2D362E] rounded-lg p-2 flex items-center justify-center gap-2 transition">
                    <span className="text-xl">G</span>
                    <span className="text-base font-medium">Continue with google</span></button>
 
                   <p className="text-center mt-5 text-[#56423D] text-base">New to loqalli?{" "}
                  <span className="text-[#C05C3F] font-bold cursor-pointer">Sign up</span>
                </p>
              </div>
            </div>  
          </div>
       </div>
       </>
    )
}