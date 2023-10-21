const initialState = null;
export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user_mobile_num': return action.payload;
        default: return state
    }
}
