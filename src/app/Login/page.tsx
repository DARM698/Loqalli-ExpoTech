'use client'
 
export default function Login(){
 
 
    return(
        <>
        <nav className={`fixed w-full z-50 transition-all  top-4 duration-500 px-6 md:px-10'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#D17842] tracking-tighter italic">Loqalli</h1>
        </div>

    <div className="bg-white h-screen flex items-center justify-center text-black">
        <div className=" p-6 shadow-2xl text-black rouded-full border-solid">
            <h1 className="text-[#DA653B] text-6xl font-serif p-2 mb-10">Welcome to Loqalli</h1>
            <p className="text-[#56423D] text-xl mb-10">How would you like to sign up, as a tourist or host?</p>
            <div className="flex flex-col gap-4" >
                <button className=" text-[#6B7280] font-medium items-center justify-center bg-[#F1EBE0] rounded-lg w-full p-2 "> Tourist</button>
                <button className=" text-[#6B7280] font-medium gitems-center justify-center bg-[#F1EBE0] rounded-lg w-full p-2">Host</button>
            </div>
            <h5 className="mt-10 flex items-center justify-center">Do not you have an account?</h5>
            <h1 className="text-[#DA653B] mt-5 flex items-center cursor-pointer justify-center">Log in</h1>
        </div>
    </div>
    </nav>
    </>
    )
}