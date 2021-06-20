const initialState= {
    logged_in : false,
    userData: {}
}
const LoginReducer = (state=initialState, action) =>{
    switch(action.type){
        case "LOGGED_IN":
            return {
                ...state,
                logged_in:true,
                userData:action.payload
            }
        case "LOGGED_OUT":
            return {
                ...state,
                logged_in:false,
                userData:{}
            }
        default:
            return state
    }

}
export default LoginReducer