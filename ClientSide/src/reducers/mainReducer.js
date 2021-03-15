
const initialState = {
    items: [],
    filterBy: null
}

export function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.items
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.item]
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.item._id) return action.item;
                    return item;
                })
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.itemId)
            }
        default:
            return state;
    }
}