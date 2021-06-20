
export const isLoggedin = (userData) => {
    return {
        type:"LOGGED_IN",
        payload:userData.user
    }
}

export const isLoggedout = () =>{
    return {
        type:"LOGGED_OUT"
    }
}