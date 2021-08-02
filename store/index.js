import { createStore } from 'redux';

const initialState = { locations: [], latitude: '' , longitude: ''};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addLocation':
      const newLocations = state.locations;
      if(newLocations.find(location => location.city === action.location.city)){
        return state
      }
      if (newLocations.length === 3) {
        newLocations.splice(0, 1);
      }
      newLocations.push(action.location)
      return{
        ...state,
        locations: [...newLocations]
      }
  
    default:
      return state
  }
};

const store = createStore(locationReducer);

export default store;