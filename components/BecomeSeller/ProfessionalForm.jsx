import { Field, Flex, MediaField, Spaces, Title } from 'components/custom'
import Button from 'components/custom/Button';
import React from 'react'
import styledComponents from 'styled-components'
import { colors } from 'theme';
import FileInput from 'components/custom/FileInput';

const Form = styledComponents.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`;
function ProfessionalForm({
    values,
    onChange,
    handleSubmit,
    loading,
    isSubmitable
}) {
    return (
        <div>
            <Title>Professional Details</Title>
            <Spaces top='20px' />
            <Form
                autoComplete='off'
                onSubmit={e => handleSubmit('professional', e)}
            >
                <Field>
                    <label htmlFor="gstin">
                        GSTIN Number
                    </label>
                    <input type="gstin" name="gstin" id="gstin" placeholder="Eg. 32948131683" onChange={onChange} value={values.gstin} />
                </Field>
                <FileInput label={'Upload Aadhar/Pan Card'} onChange={onChange} value={values.documentPhoto} name="documentPhoto" />
                <FileInput label={'Upload Store Image (Just one for verification)'} onChange={onChange} value={values.storePhoto} name="storePhoto" />
                <Button style={{ width: '100%' }} loading={loading}>
                    Become A Seller
                </Button>
            </Form>
        </div>
    )
}

export default ProfessionalForm