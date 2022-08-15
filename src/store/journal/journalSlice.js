import { createSlice } from '@reduxjs/toolkit';
// El Slice es el donde tengo mi initial state junto con los reducers.
//En los Thunks tengo las funciones asincronas que hacen los dispatch al store

export const journalSlice = createSlice({
name: 'journal',
initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
      savingNewNote: ( state ) => {
        state.isSaving = true

      },

      addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false

      },
      setActiveNote: ( state, action ) => {
        state.active = action.payload;
        state.messageSaved = '';
        

      },
      setNotes: ( state, action ) => {
        state.notes = action.payload 

      },
      setSaving: ( state ) => {
        state.isSaving = true;
        state.messageSaved = '';

      },
      updateNote: ( state, action ) => { // Payload: note
        state.isSaving = false;
        state.notes = state.notes.map( note => {

          if ( note.id === action.payload.id ) {
            // console.log(action.payload)
            return action.payload
          }

          return note
        })

        state.messageSaved = `${ action.payload.title }, actualizada correctamente`

      },

      setPhotosToActiveNotes: ( state, action ) => {
        state.active.imageUrls = [  ...state.active.imageUrls, ...action.payload ]
        state.isSaving = false;
      },

      clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null
      },

      deleteNoteById: ( state, action ) => {
        state.active = null
        state.notes = state.notes.filter( note => note.id !== action.payload )

      }
   }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote, 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById, 
    setPhotosToActiveNotes,
    clearNotesLogout 
} = journalSlice.actions;