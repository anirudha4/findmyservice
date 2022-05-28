import { Field, Flex, Spaces, Title } from 'components/custom'
import Button from 'components/custom/Button';
import React from 'react'
import styledComponents from 'styled-components'

const Form = styledComponents.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`;
function PersonalForm({
    values,
    onChange,
    handleSubmit,
    loading
}) {
    return (
        <div>
            <Title>Personal Details</Title>
            <Spaces top='20px' />
            <Form
                autoComplete='off'
                onSubmit={e => handleSubmit('personal', e)}
            >
                <Flex gap="10px">
                    <Field>
                        <label htmlFor="firstName">
                            First Name
                        </label>
                        <input type="text" name='firstName' id="firstName" placeholder="Eg. John" value={values.firstName} onChange={onChange} autoComplete='off' />
                    </Field>
                    <Field>
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                        <input type="text" name='lastName' id="lastName" placeholder="Eg. Doe" value={values.lastName} onChange={onChange} />
                    </Field>
                </Flex>
                <Field disabled>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input disabled type="email" name="email" id="email" placeholder="Eg. johndoe@gmail.com" onChange={onChange} value={values.email} />
                </Field>
                <Field>
                    <label htmlFor="address">
                        Address
                    </label>
                    <input type="text" name="address" id="address" placeholder="Eg. 302, Sanskar Apartment, Veerbhadra Nagar" onChange={onChange} value={values.address} />
                </Field>
                <Flex gap="10px">
                    <Field>
                        <label htmlFor="phone">
                            Phone
                        </label>
                        <input type="tel" name="phone" id="phone" placeholder="Eg. 96*****66" onChange={onChange} value={values.phone} />
                    </Field>
                    <Field>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" id="city" placeholder="Eg. Nasik" onChange={onChange} value={values.city} />
                    </Field>
                </Flex>
                <Flex gap="10px">
                    <Field>
                        <label htmlFor="zip">
                            Zip Code
                        </label>
                        <input type="text" name="zip" id="zip" placeholder="Eg. 411045" onChange={onChange} value={values.zip} />
                    </Field>
                    <Field>
                        <label htmlFor="state">
                            State
                        </label>
                        <input type="text" name="state" id="state" placeholder="Eg. Maharashtra" onChange={onChange} value={values.state} />
                    </Field>
                </Flex>
                <Button style={{ width: '100%' }} loading={loading} disabled={loading}>
                    Next Step
                </Button>
            </Form>
        </div>
    )
}

export default PersonalForm