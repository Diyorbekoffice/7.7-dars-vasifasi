// languageReducer.js

const initialState = {
    language: 'en', 
  };
  
  export const SET_LANGUAGE = 'SET_LANGUAGE';
  
  export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language,
  });
  
  const languageReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LANGUAGE:
        return { ...state, language: action.payload };
      default:
        return state;
    }
  };
  
  export default languageReducer;
  