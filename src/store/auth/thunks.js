
import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
       dispatch( checkingCredentials() )
    }

}

export const startGoogleSingIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
        
        const result = await singInWithGoogle()
        console.log({result})
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch ) => {

        dispatch( checkingCredentials() );

       const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
       
       if ( !ok ) return dispatch( logout({ errorMessage }))

       dispatch( login({ uid, displayName, email, photoURL }))
    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    
    return async (dispatch) => {
        
        dispatch( checkingCredentials() )
        
        const  result  = await loginWithEmailPassword({ email, password })
        console.log(result)

        if( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ) )
    }

}

export const startLogout = () => {
    return async( dispatch ) => {
       
        await logoutFireBase();
        dispatch( clearNotesLogout() )
        dispatch( logout() )


    }
}