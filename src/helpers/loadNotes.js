import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async ( uid = '' ) => {
    if (!uid ) throw new Error('El UID del usuario no existe')

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` ) // De esta forma apunto a la coleccion de notas
    const docs = await getDocs(collectionRef) // Los docs hacen referencia a todos los documentos que tiene Firebase

    const notes = []
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
        
    })
    // console.log(notes)
    return notes

    
    
}