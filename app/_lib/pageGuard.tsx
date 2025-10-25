'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { store } from "../_stores/store";
import  CircularLoader  from "../_components/CircularLoader";
import { useSelector } from 'react-redux';
import { logout, setCredentials } from "../_stores/authSlice";
import { RootState } from "../_stores/store";
import { useAppDispatch } from "../_stores/hooks";


const publicPaths = ['/login', '/register', '/'];

interface PageGuardProps {
    children: React.ReactNode;
  }


  const PageGuard: React.FC<PageGuardProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true); 
    // const state = store.getState();
    // const accessToken: string | null = state.auth.token.accessToken;
    const accessToken = useSelector((state: RootState) => state.auth.token.accessToken);
    const router = useRouter();
    const pathname = usePathname();
   

    useEffect(()=>{
      if (typeof window === 'undefined') return;

      const localAuth = localStorage?.getItem('auth');
      const isPublic = publicPaths.includes(pathname);

      console.log('PageGuard useEffect - pathname:', pathname);

      
      if(localAuth){
        const parsed = JSON.parse(localAuth);

        console.log('PageGuard - parsed auth from localStorage:', parsed);
       
          if(!accessToken){
            dispatch(setCredentials({
              token: {
                accessToken: parsed?.access_token,
                refreshToken: parsed?.refresh_token
              },
              user: parsed?.user,
            }));
          }

        if(isPublic){
          router.replace('/dashboard');
          return
        }
      }else{
        dispatch(logout())
        if(!isPublic){
          router.replace('/login');
          return
        }
      }

      setLoading(false)
      

    }, [accessToken, dispatch, pathname, router])
   



    if(loading){
      return <CircularLoader/>
    }
    
    
      return children;

  }  

  export default PageGuard;
