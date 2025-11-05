

const gameSlice = (set, get)=>({
    //STATE
    WPM: 0,
    startTime: Date.now(),
    endTime: Date.now(),
    totalWords: [],
    typedWords: [],
    done: false,

    //ACTIONS
    setWPM: (WPM)=>(set({WPM})),
    setStartTime: (startTimer)=>(set({startTimer})),
    setEndTime: (endTime)=>(set({endTime})),
    setDone: (done)=>(set({done})),
    setTotalWords: (totalWords)=>(set({totalWords})),
    setTypedWords: (typedWords)=>(set({typedWords})),
    getDone: ()=>(get().done)
})


export default gameSlice