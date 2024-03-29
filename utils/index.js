export const createFormData = (values) => {
    const formData = new FormData();
    Object.keys(values).map(key => {
        formData.append(key, values[key])
    });
    return formData
}

export const convertToMb = (bytes) => parseInt(bytes / 1048576)