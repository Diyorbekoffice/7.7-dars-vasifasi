// counterReducer.js

const initialState = {
    users: [],
  };
  
  export const ADD_USER = 'ADD_USER';
  export const REMOVE_USER = 'REMOVE_USER';
  export const EDIT_USER = 'EDIT_USER';
  
  export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
  });
  
  export const removeUser = (id) => ({
    type: REMOVE_USER,
    payload: id,
  });
  
  export const editUser = (user) => ({
    type: EDIT_USER,
    payload: user,
  });
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return { ...state, users: [...state.users, action.payload] };
      case REMOVE_USER:
        return { ...state, users: state.users.filter(user => user.id !== action.payload) };
      case EDIT_USER:
        return {
          ...state,
          users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
        };
      default:
        return state;
    }
  };
  
  export default counterReducer;
  