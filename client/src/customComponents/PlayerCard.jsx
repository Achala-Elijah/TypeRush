import useStore from "@/stores/Store";
import { useState } from "react";
import { FiCircle } from "react-icons/fi";


function PlayerCard(){
    const {WPM, totalWords, typedWords, userName} = useStore()
    const numTotalWords = totalWords?.length
    const numTypedWords = typedWords?.length

    const position = numTotalWords !== numTypedWords ? `${Math.round((numTypedWords / numTotalWords) * 100)}%` : "100% - 16px"

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <span>{userName}</span>
                <span>{`${WPM} WPM`}</span>
            </div>

            
            <div className="flex justify-between items-center relative">
                <FiCircle className="w-[16px] h-[16px] text-[#2699fb]"/>
                <FiCircle className={`w-[16px] h-[16px] text-transparent fill-green-400 absolute`}
                style={{ left: `calc(${position})` }}
                />
                <div className="border border-b border-black border-dashed h-[2px] w-[100%]"></div>
                <FiCircle className="w-[16px] h-[16px] text-[#2699fb]"/>
            </div>
        </div>
    )

}

export default PlayerCard