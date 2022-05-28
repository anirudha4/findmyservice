import React from 'react'

function useForm(defaultValues) {
    const [values, setValues] = React.useState(defaultValues)
    const onChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    return { onChange, values }
}

export default useForm