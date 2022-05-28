export const requiredValidation = (object, requiredKeys) => {
    let isValid = true, error = '';
    requiredKeys.forEach(key => {
        if(!object[key]) {
            throw new Error(`${key} is required`);
        }
    })
    return isValid;
}