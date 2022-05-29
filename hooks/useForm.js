import React from 'react'

function useForm(defaultValues) {
    const [values, setValues] = React.useState(defaultValues)
    const onChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const resetForm = () => setValues(defaultValues);
    return { onChange, values, resetForm }
}

export default useForm