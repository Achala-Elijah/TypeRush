

const userInfoSlice = (set, get)=>({
    //STATE
    userName: "",
    
    //ACTIONS
    setUserName: (userName) => (set({userName}))
    
})


export default userInfoSlice