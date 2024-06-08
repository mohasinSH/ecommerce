export const initialState = {
    basket:[],
}

const reducer = (state,action) =>{
    console.log(action.item)
    switch(action.type){
        case 'ADD_TO_BASKET':
            
            return {
                ...state,
                basket:[...state.basket,action.item]
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem)=> basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            if(index >=0){
                newBasket.splice(index,1);
            }else{
                console.warn(`Cant remove product (id:${action.id}) as its not in basket!`)
            }
            return {
                ...state,
                basket:newBasket
            };
        default:
            console.log('hi')
            return state;
    }
}

export default reducer;