import { createStore } from 'redux';

const initialState = { locations: [{name: 'Pelotas', state: 'RS', latitude: '-31.3223832,', longitude : '-52.0102279'}], latitude: '' , longitude: ''};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addLocation':
      return{
        ...state,
        location: [...state.locations, action.location]
      }
  
    default:
      return state
  }
};

const store = createStore(locationReducer);

export default store;