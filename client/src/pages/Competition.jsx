import InputCard from "@/customComponents/InputCard"
import PlayerCard from "@/customComponents/PlayerCard"
import useStore from "@/stores/Store"
import { useNavigate } from "react-router-dom"




function Competition(){
    return (
        <div className="flex max-w-[960px] flex-col gap-5 m-auto">
            <h1>Number of players on the server: 204</h1>
            <PlayerCard />
            <InputCard />
        </div>
    )

}

export default Competition