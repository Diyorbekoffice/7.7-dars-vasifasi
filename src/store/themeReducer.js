// themeReducer.js

const initialState = {
    theme: 'light',
  };
  
  export const SET_THEME = 'SET_THEME';
  
  export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme,
  });
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_THEME:
        return { ...state, theme: action.payload };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  