import useStore from "@/stores/Store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



function Auth(){
    const [username, setUsername] = useState("")
    const {setUserName} = useStore()
    const navigate = useNavigate()

    const handleEnter = async (e) => {
        e.preventDefault()
        //Send username
        //route to the typing page
        setUserName(username)
        navigate("/game")
    }


    return(
        <div className="max-w-[640px] flex flex-col items-center m-auto p-[40px] h-[600px]">
            <form 
            onSubmit={handleEnter}
            className="flex flex-col items-center w-[100%] h-[100%]">
                <label htmlFor="username" className="mb-[15px] text-[18px]">Enter your username</label>
                <input 
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-[#333] py-[6px] px-[12px] text-[2em] leading-[1.33] outline-none border border-black w-[calc(100%-26px)] h-[50px] mb-[18px]"
                />
                <button 
                type="submit"
                className="bg-[#3276b1] border-[#285e8e] text-white py-[10px] px-[16px] text-[18px] font-semibold rounded-[6px] font-sans">Enter</button>
            </form>
        </div>
    )
}


export default Auth