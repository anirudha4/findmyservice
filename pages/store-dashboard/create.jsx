import { Card, CustomWidthHeightCenterContainer, Field, MediaField, Spaces, Title } from 'components/custom';
import Button from 'components/custom/Button';
import FileInputs from 'components/custom/FilesInput';
import withGaurd from 'components/hoc/withGaurd'
import useForm from 'hooks/useForm';
import React from 'react'
import styledComponents from 'styled-components'

const CreateContainer = styledComponents(Card)`
  max-height: 100%;
  overflow: auto;
  @media (max-width: 500px) {
    button {
      width: 100%;
    }
  }
`;
const FieldContainer = styledComponents.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  div:nth-child(5) {
    grid-column: 1 / 3;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    div:nth-child(5) {
      grid-column: initial;
    }
  }
`;



function Create() {
  const defaultValues = {
    storeName: '',
    storeAddress: '',
    city: '',
    tags: '',
    description: '',
    storeImages: []
  }
  const { values, onChange } = useForm(defaultValues);
  const handleCreateStore = (e) => {
    e.preventDefault();
    console.log(values);
  }
  return (
    <CustomWidthHeightCenterContainer height={`calc(100vh - 60px)`} style={{ padding: 10 }}>
      <CreateContainer width={900}>
        <Title>Create Store</Title>
        <Spaces top="20px" />
        <form onSubmit={handleCreateStore}>
          <FieldContainer>
            <Field>
              <label htmlFor="storeName">Store Name</label>
              <input type="text" name='storeName' id='storeName' placeholder="Eg. Cake Baker's" onChange={onChange} value={values.storeName} />
            </Field>
            <Field>
              <label htmlFor="storeAddress">Store Location</label>
              <input type="text" name='storeAddress' id='storeAddress' placeholder='Eg. 101, Some Complex, Locality' onChange={onChange} value={values.storeAddress} />
            </Field>
            <Field>
              <label htmlFor="city">City</label>
              <input type="text" name='city' id='city' placeholder='Eg. Mumbai' onChange={onChange} value={values.city} />
            </Field>
            <Field>
              <label htmlFor="tags">Tags (Mention some tags which describe your store)</label>
              <input type="text" name='tags' id='tags' placeholder='Sketches, Doodles, Canvas Paintings' onChange={onChange} value={values.tags} />
            </Field>
            <Field>
              <label htmlFor="description">Description (Minimum 150 Characters)</label>
              <textarea rows={10} name='description' id='description' placeholder='Keep it simple' onChange={onChange} value={values.description}></textarea>
            </Field>
          </FieldContainer>
          <br />
          <FileInputs maxSize={2} label={'Please upload store images for better reach (Maximum 5)'} name="storeImages" onChange={onChange} value={values.storeImage} />
          <br />
          <Button>Create Store</Button>
        </form>
      </CreateContainer>
    </CustomWidthHeightCenterContainer>
  )
}

export default withGaurd(Create)