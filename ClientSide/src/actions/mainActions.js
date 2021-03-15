import { carService } from '../services/carService';
// import { mainService } from '../services/carService';

// Dispatchers
const _removeItem = (itemId) => ({ type: 'REMOVE_ITEM', itemId });
const _setItems = (items) => ({ type: 'SET_ITEMS', items });
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });

// THUNK
export function loadItems(filterBy) {
    return async (dispatch) => {
        const items = await mainService.query(filterBy);
        dispatch(_setItems(items));
    }
}
export function removeItems(itemId) {
    return async (dispatch) => {
        mainService.remove(itemId)
        dispatch(_removeItem(itemId))
    }
}
export function setFilter(filterBy) {
    return (dispatch) => dispatch(_setFilter(filterBy))
}

export function saveItem(item) {
    return async (dispatch) => {
        const type = item._id ? 'UPDATE_ITEM' : 'ADD_ITEM';
        const savedItem = await mainService.save(item)
        dispatch({ type, item: savedItem })
        
    }
}
