
// import { createContext, useContext, useEffect, useReducer, useState } from "react";
// import instance from "../config/axiosConfig";
// import { Navigate } from "react-router-dom";

// const authContext = createContext();

// function AuthProvider({ children }) {
//  const initialState={
//   isLoggedIn:null,
//  }

//  const[state,dispatch]=useReducer(authReducer,initialState)

// function authReducer(state,action){
// switch(action.type){
//   case "LOGIN":
//   return{...state,isLoggedIn:true}
//    case "LOGOUT":
//   return{...state,isLoggedIn:false}
// }
// }

//   useEffect(() => {
//   checkAuthStatus()
//   }, []);

//   async function checkAuthStatus() {
//     try {
//       const response = instance.get("/auth/authCheck", {
//         withCredentials: true,
//       });
//       console.log(response);
//       dispatch(true);
//     } catch (error) {
//       console.log(error);
//       dispatch(false);
//     }
//   }
// async function logout(){
//   try{
//     await instance.post("/auth/logout",{},{withCredentials:true})
//     dispatch(false);
//     <Navigate to="/login"/>
//   }
//   catch(error){
//   console.log("clicked issue")
// }}
//   return (
//     <authContext.Provider value={{ state, checkAuthStatus,logout }}>
//       {children}
//     </authContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(authContext);
// }

// export default AuthProvider;






import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "..//pages/firebase.js"; // 🔥 firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

const authContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const initialState = {
    isLoggedIn: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN" });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("Logout Error:", error);
    }
  }

  return (
    <authContext.Provider value={{ state, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
