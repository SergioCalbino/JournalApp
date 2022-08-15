
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FirebaseAuth } from '../src/firebase/config';
import { login, logout } from '../src/store/auth';
import { startLoadingNotes } from '../src/store/journal/thunks';

export const useCheckAuth = () => {
    
    const { status } = useSelector( state => state.auth );

    const dispatch = useDispatch()
   
   
     useEffect(() => {
   
       
     
       onAuthStateChanged( FirebaseAuth, async( user ) => {
         if ( !user ) return dispatch( logout() )
   
         const { uid, email, displayName, photoURL } = user
         dispatch( login({ uid, email, displayName, photoURL }) )
         dispatch( startLoadingNotes() )
   
   
       })
      
     }, []);

     return {
        status
     }
}
