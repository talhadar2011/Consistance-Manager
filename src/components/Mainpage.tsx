import { useState } from "react"

export default function Mainpage() {
    const [inputValue, setInputValue] = useState("");
    const [habbitList, setHabbitList] = useState<string[]>([])
    const [addHabbit, setaddHabbit] = useState(false)
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
        // Update your state here
        setHabbitList([...habbitList, inputValue]);
        setInputValue(""); // Optional: clear input after enter
        setaddHabbit(false)
        }
    };
    return (
    <div className='w-full h-screen bg-gray-100 p-10'>
        <div>
            <h1 className='text-4xl font-bold text-center mt-20'>Welcome to Consistance Manager</h1>
        
            <div className='flex bg-white shadow-2xl rounded-lg w-full mt-10 p-10 h-full'>
                <div className="w-[30%] ">
                    <h2 className='text-2xl font-semibold text-black'>Habbits</h2>
                    <button onClick={()=>setaddHabbit(true)} className="bg-emerald-400 rounded p-2">Add Habbit</button>
                    {addHabbit && (
                        <div>
                            <input 
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown} 
                            type="text" className="border-2 border-gray-300 rounded p-2 mt-5 w-full" placeholder="Enter Habbit Name" />
                        </div>
                    )}
                    {habbitList.map((habbit, index) => (
                        <div key={index} className="mt-2 p-2 bg-gray-200 rounded font-bold">
                            {habbit}
                        </div>
                    ))}
                </div>
                <div className="w-[70%] ">
                    <h2 className='text-2xl font-semibold text-'>Habbits</h2>
                </div>
            </div>
        </div>
    
    </div>
  )
}
