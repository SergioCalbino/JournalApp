import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => { // Este segundo argumento es para validar errores
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({

    })

    useEffect(() => {
        createValidators()
    }, [ formState ])

    useEffect(() => { // Este efect lo usamos para cuando cambiamos de nota
        setFormState( initialForm )
      
    }, [ initialForm ])

    
    

    
    
    const isFormValid = useMemo( () => {

       
       for (const formValue of Object.keys( formValidation )) {
        if ( formValidation[formValue] !== null ) return false;
         
       }
       

        return true;

    }, [formValidation] )
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {}

        for (const formField of Object.keys( formValidations )) { //Recorremos el objeto de errores
            const [ fn, errorMessage  ] = formValidations[formField] // el FN y el ErrorMessage hacen referencia al formvalidations de mi registerpage
            
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues )
        

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}