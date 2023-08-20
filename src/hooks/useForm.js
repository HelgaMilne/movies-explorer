import { useState, useCallback } from 'react';

export function useForm(inputValues = {}) {
    const [values, setValues] = useState(inputValues);
    const [errorMessages, setErrorMessages] = useState({});
    const [validationState, setValidationState] = useState({});
    const errorMessageForName = 'Допускаются только латиница, кириллица, пробел или дефис.'
    const errorMessageForPassword = "8 или более символов, в том числе по меньшей мере, одну цифру,  одну прописную, одну строчную буквы"

    function returnErrorText(item) {
        if (item === 'name') {
            return errorMessageForName;
        } else if (item === 'password') {
            return errorMessageForPassword;
        }
    }

    const handleChange = (event) => {
        if (event.target.validity.patternMismatch) {
            setErrorMessages({ ...errorMessages, [event.target.name]: returnErrorText(event.target.name) });
        } else if (!event.target.validity.valid) {
            setErrorMessages({ ...errorMessages, [event.target.name]: event.target.validationMessage });
        } else {
            setErrorMessages({ ...errorMessages, [event.target.name]: '' });
        }

        setValues({ ...values, [event.target.name]: event.target.value });
        setValidationState({ ...validationState, [event.target.name]: event.target.validity.valid });
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrorMessages(newErrors);
            setValidationState(newIsValid);
        },
        [setValues, setErrorMessages, setValidationState]
    );

    return {
        values,
        setValues,
        errorMessages,
        setErrorMessages,
        validationState,
        setValidationState,
        handleChange,
        resetForm
    };
}
