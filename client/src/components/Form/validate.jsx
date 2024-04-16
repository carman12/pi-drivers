const validate = (form, error, setError) => {

    let isValid = true
    let regexImagen = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i;


    if (!form.forename.trim()) {
        if (error.forename !== 'required') {
            setError(prevError => ({ ...prevError, forename: 'required' }));
        }
        isValid = false;
    } else {
        if (error.forename !== '') {
            setError(prevError => ({ ...prevError, forename: '' }));
        }
    }
    
    if (!form.surname.trim()) {
        if (error.surname !== 'required') {
            setError(prevError => ({ ...prevError, surname: 'required' }));
        }
        isValid = false;
    } else {
        if (error.surname !== '') {
            setError(prevError => ({ ...prevError, surname: '' }));
        }
    }
    
    if (!form.description.trim()) {
        if (error.description !== 'required') {
            setError(prevError => ({ ...prevError, description: 'required' }));
        }
        isValid = false;
    } else {
        if (error.description !== '') {
            setError(prevError => ({ ...prevError, description: '' }));
        }
    }

    if (!form.nationality.trim()) {
        if (error.nationality !== 'required') {
            setError(prevError => ({ ...prevError, nationality: 'required' }));
        }
        isValid = false;
    } else {
        if (error.nationality !== '') {
            setError(prevError => ({ ...prevError, nationality: '' }));
        }
    }
    if (!form.dob || form.dob === "YYYY-MM-DD") {
        setError((prevError) => ({ ...prevError, dob: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, dob: '' }));

    //poner una validacion si no se pone ningun teams
    if (form.teamID.length === '' || form.teamID.length === ' ') {
        setError((prevError) => ({ ...prevError, teamID: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, teamID: '' }));

    return isValid
}

export default validate;