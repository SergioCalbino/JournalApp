
import { async } from "@firebase/util"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNotes, deleteNoteById } from "./journalSlice"


export const startNewNote = () => {
    return async( dispatch, getState ) => { // El auth es un objeto que tiene todos los datos de autenticacion de usuario, por eso puedo obtener el UID

    dispatch( savingNewNote() )
       const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            
            
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id
        
        
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )




        //dispatch
        //dispatch( newNote )
        //dispatch( activarNota )


    }
}

export const startLoadingNotes = ( uid ) => {
    return async( dispatch, getSate ) => {

        const { uid } = getSate().auth

       const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const startSaveNote = () => {
    return async( dispatch, getSate ) => {

        dispatch( setSaving() );
        
        const { uid } = getSate().auth;
        const { active:note } = getSate().journal;

        const noteToFireStore = { ...note }; 
        delete noteToFireStore.id // Borro el id de la nota porque Firebase me va a crear un nuevo id y la nota ya lo tiene
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`) // Esta es la referencia al documento. Recordemos que esta funcion "doc" se unsa para grabar en la DB de Firestore
        await setDoc( docRef, noteToFireStore, { merge: true } ) // el setDoc actualiza la ruta de la DB con el docRef.

        dispatch( updateNote( note ) )
       
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) )
        }

      const photosUrls = await Promise.all( fileUploadPromises )
      
        dispatch( setPhotosToActiveNotes( photosUrls ) )
    }

}

export const startDeletingNote = () => {
    return async( dispatch, getSate ) => {

        const { uid } = getSate().auth
        const { active: note } = getSate().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) )

        
    }
}