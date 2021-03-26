import React, { createContext, useContext, useReducer } from 'react';

const LoginContext = createContext();

const initialState = {
  logged_in: localStorage.getItem('token') ? true : false,
  username: '',
  message: ''
}

const reducer = (state, action) => {
  switch(action.type) {
    case "login":
      return {
        logged_in: state.logged_in = true,
        message: action.message
      }
    case "logout":
      return {
        logged_in: state.logged_in = false,
        message: action.message
      }
    case "test":
      return {
        username: state.username = 'TEST',
        message: action.message
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={{state, dispatch}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext);
