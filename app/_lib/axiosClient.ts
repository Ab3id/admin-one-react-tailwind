import axios from "axios";
import { store } from "../_stores/store";
import Router  from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../_stores/hooks";
import { logout } from "../_stores/authSlice";
// import { logout } from "../_stores/authSlice";
// import { useAppDispatch } from "../_stores/hooks";


const axiosClient = axios.create({
    baseURL:'http://localhost:8080/api/v1'
});


axiosClient.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const accessToken = state.auth.token.accessToken;
        // const refreshToken = state.auth.token.refreshToken;


        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;   
        }

        return config;
    },
    (error) => {
     
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
     console.log('Axios response error interceptor:', error);
     //check if path is not login or register
      if (error.response && error.response.status === 401 && localStorage.getItem('auth') !== null) {
        console.log('Unauthorized! Logging out...');
            localStorage.removeItem('auth');

            useEffect(() => {
                const dispatch = useAppDispatch();
                dispatch(logout());
                Router.push('/login'); 
              }, []);
       
      }
      return Promise.reject(error); 
    }
  );

export default axiosClient