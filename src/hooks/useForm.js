import { useState, useCallback } from 'react';

export function useForm(inputValues = {}) {
    const [values, setValues] = useState(inputValues);
    const [errorMessages, setErrorMessages] = useState({});
    const [validationState, setValidationState] = useState({});
    const errorMessageForName = 'Допускаются только латиница, кириллица, пробел или дефис.'
    const errorMessageForPassword = "от 8 до 40 символов, в том числе по меньшей мере, одну цифру,  одну прописную, одну строчную буквы"
    const errorMessageForEmail = `Пожалуйста, введите адрес электронной почты в формате "username@mailname.domen"`;

    function returnErrorText(name) {
        if (name === 'name') {
            return errorMessageForName;
        } else if (name === 'password') {
            return errorMessageForPassword;
        } else if (name === 'email') {
            return errorMessageForEmail;
        }
    }

    const handleChange = (event) => {
        console.log(event.target.validity);
        console.log(event.target.validationMessage);
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
