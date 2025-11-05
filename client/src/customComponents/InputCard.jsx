import useStore from "@/stores/Store"
import { useEffect, useRef, useState } from "react"



function InputCard(){
    const [words, setWords] = useState([])
    const [typedWord, setTypedWord] = useState("")
    const [prevEndWord, setPrevEndWord] = useState(-1) // -1 means no prev endLine
    const [index, setIndex] = useState(0) // current word index to type correct
    //const [startTime, setStartTime] = useState(Date.now())
    // const [endTime, setEndTime] = useState(Date.now())
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const textRef = useRef(null)
    const originalText = "our list know start air america here get"

    const {setWPM, WPM, setDone, getDone, setTotalWords, setTypedWords, setStartTime, startTime, setEndTime, endTime} = useStore()



    //check if index ends a line
    const isEndLine = (spanIndex) => {
        let val = false
        //return false if index is out of bounds
        if(spanIndex >= words.length){
            return val
        }

        const spans = textRef.current.querySelectorAll('span')

        spans.forEach((span, i) => {
            const next = spans[i + 1];
            if(i == spanIndex){
                if (next && next.offsetTop > span.offsetTop) {
                    val = true
                  }
            }
          });
        return val
    }




    //Run on mount
    useEffect(() => {
        const words = originalText.split(" ")
        const formattedText = words.map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${idx == 0 ? "bg-gray-500" : ""}`}">${word}</span>`)).join(" ")

        textRef.current.innerHTML = formattedText
        
        setWords(words)
        setTotalWords(words)
        setStartTime(Date.now())

        const interval = setInterval(() => {
            if(getDone()) return
            setEndTime(Date.now())
          }, 500);
        


        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);


        // cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        }
    }, []);



    //run when ever endTime changes
    useEffect(()=>{
        const elapsedTime = (endTime - startTime)/1000/60
        const totalWordsTyped = index < 0 ? 0 : index
        const wpm = Math.round(totalWordsTyped / elapsedTime)

        setWPM(wpm)
    }, [endTime])



    //run when ever window size changes
    useEffect(() => {
        if(!words?.length || index >= words.length ) return

        const trimLineIndex = index
        const value = typedWord.trim()
        const correctTyping = words[index]?.startsWith(value)
        const formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < index ? "text-green-500" : ""} ${idx + trimLineIndex == index ? (correctTyping ?"bg-gray-500" : "bg-red-500") : ""}`}">${word}</span>`)).join(" ")

        textRef.current.innerHTML = formattedText

        setPrevEndWord(index < 0 ? -1 : index - 1)

    }, [windowWidth])



    //run when user types
    const handle = (e) => {
        if(index == words?.length){
            setTypedWord("")
            return
        }

        const value = e.target.value
        setTypedWord(value)
        if(value){
            const lastChar = value.slice(-1)
            if(lastChar == " "){
                const trimedValue = value.trim()
                if(trimedValue == words[index]){
                    const newIndex = index + 1

                    let trimLineIndex = prevEndWord + 1

                    let formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < newIndex ? "text-green-500" : ""} ${idx + trimLineIndex == newIndex ? "bg-gray-500" : ""}`}">${word}</span>`)).join(" ")

                    textRef.current.innerHTML = formattedText

                    if(isEndLine(index - trimLineIndex)){
                        trimLineIndex = index + 1

                        formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < newIndex ? "text-green-500" : ""} ${idx + trimLineIndex == newIndex ? "bg-gray-500" : ""}`}">${word}</span>`)).join(" ")

                        textRef.current.innerHTML = formattedText
                        setPrevEndWord(index)
                    }
                    setIndex(newIndex)
                    setTypedWords(words.slice(0, index + 1))

                    if(newIndex == words.length){
                        setDone(true)
                        setEndTime(Date.now())
                    }
                }
                else{
                    const newIndex = index

                    let trimLineIndex = prevEndWord + 1

                    let formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < newIndex ? "text-green-500" : ""} ${idx + trimLineIndex == newIndex ? "bg-gray-500" : ""}`}">${word}</span>`)).join(" ")

                    textRef.current.innerHTML = formattedText
                }
                setTypedWord("")
            }
            else{
                const correctTyping = words[index]?.startsWith(value)
                let trimLineIndex = prevEndWord + 1

                const formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < index ? "text-green-500" : ""} ${idx + trimLineIndex == index ? (correctTyping ?"bg-gray-500" : "bg-red-500") : ""}`}">${word}</span>`)).join(" ")

                textRef.current.innerHTML = formattedText
            }
        }
        else{
            let trimLineIndex = prevEndWord + 1

            const formattedText = words.slice(trimLineIndex).map((word, idx) => (`<span id=${idx} class="${`inline-block px-[4px] ${(idx + trimLineIndex) < index ? "text-green-500" : ""} ${idx + trimLineIndex == index ? "bg-gray-500" : ""}`}">${word}</span>`)).join(" ")

            textRef.current.innerHTML = formattedText

        }
    }

    //console.log("prev end word: ", prevEndWord)
    // console.log("WPM: ", WPM)
    // console.log("OVERALL WPM: ", Math.round(words.length / ((endTime - startTime)/1000/60)))

    return (
        <div className="flex max-w-[960px] w-[100%] flex-col gap-5 m-auto mt-5 border border-blue-300 rounded p-1">
            <div 
            className="w-[100%] text-3xl overflow-hidden leading-snug max-h-[2lh] bg-white"
            ref={textRef}
            >
           
            </div>

            <div className="flex justify-center items-center gap-5 w-[100%] h-[100px] bg-blue-400 py-[20px]">
                <input 
                className="w-[70%] h-[100%] outline-none p-2 text-3xl"
                value={typedWord}
                onChange={handle}
                // onKeyUp={handleKeyUp}
                />
                <button 
                className="bg-[#3276b1] border-[#285e8e] text-white h-[100%] px-[16px] text-[18px] font-semibold rounded-[6px] font-sans">New Game</button>
            </div>
        </div>
    )

}

export default InputCard