import PersonalForm from 'components/BecomeSeller/PersonalForm';
import ProfessionalForm from 'components/BecomeSeller/ProfessionalForm';
import { Card, CustomWidthHeightCenterContainer, Spaces, Title } from 'components/custom';
import { useUser } from 'contexts/AuthContext';
import useForm from 'hooks/useForm';
import React, { useState } from 'react'
import styledComponents from 'styled-components'
import axios from 'axios';
import { colors, fonts, styles } from 'theme';
import { requiredValidation } from 'utils/validation';
import withGaurd from 'components/hoc/withGaurd';
import { createFormData } from 'utils';
import { createSellerRequest } from 'services/request';

const BecomeSellerContainer = styledComponents.div`

`;
const BecomeSellerCard = styledComponents(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: ${styles.paddings.md};
  min-height: 570px;
  @media (max-width: 700px) {
      grid-template-columns: 1fr;
  }
`;
const Steps = styledComponents(Card)`
  box-shadow: none;
  position: relative;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  .step-count {
    color: #f4f4f4;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .step-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
const FormContainer = styledComponents.div`
  padding: ${styles.paddings.xl} ${styles.paddings.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Step = styledComponents.div`
  padding: 15px;
  display: flex;
  // border: 1px solid ${colors.border};
  border-radius: ${styles.borderRadius.md};
  gap: 20px;
  align-items: center;
  background-color: ${props => props.active ? '#1e1f1f' : ''};
  color: ${props => props.active ? '#f4f4f4' : ''};
  cursor: pointer;
  user-select: none;
  ${props => props.disabled && `
    pointer-events: none;
    cursor: not-allowed !important;
  `}
  .step-number {
    font-size: ${fonts.sizes.xl};
    font-weight: ${fonts.weights.bold};
  }
  .step-content {
    font-size: ${fonts.sizes.xl};
    font-weight: ${fonts.weights.bold};
  }
`;

const stepOptions = [
  { id: 1, label: 'Fill in your Personal Details', value: 1 },
  { id: 2, label: 'Fill  in your Professional Details', value: 2 }
]
function BecomeSeller() {
  const { user } = useUser();
  console.log(user.uid);
  const defaultPersonalValues = {
    firstName: '',
    lastName: '',
    email: user?.email,
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  }
  const defaultProfessionalValues = {
    gstin: '',
    storePhoto: '',
    documentPhoto: ''
  }
  const [step, setStep] = useState(stepOptions[0]);
  const [loading, setLoading] = useState(false);
  const { values: personalValues, onChange: personalOnChange } = useForm(defaultPersonalValues)
  const { values: professionalValues, onChange: professionalOnChange } = useForm(defaultProfessionalValues)
  const isSubmitable = () => {
    try {
      return requiredValidation({...personalValues, ...professionalValues}, ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'storePhoto', 'documentPhoto'])
    } catch(err) {
      return false;
    }
  }
  const handleStepChange = currentStep => {
    if(currentStep === step.value) return
    if(currentStep === 1) setStep(stepOptions[0])
    if(currentStep === 2) setStep(stepOptions[1])
  }

  const handleSubmit = async (type, e) => {
    try {
      e.preventDefault();
      setLoading(true)
      if (type === 'personal') {
        await requiredValidation(personalValues, ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip']);
        setStep(stepOptions[1])
      } else if(type === 'professional') {
        if(isSubmitable()) {
          const formValues = {...personalValues, ...professionalValues, uid: user.uid};
          const formData = createFormData(formValues);
          const data = await createSellerRequest('/seller-requests', formData, { 'Content-Type': 'multipart/form-data' });
          console.log(data);
        } else {
          throw new Error('Please fill all fields');
        }
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  const renderForm = () => {
    if (step.value === 1) {
      return <PersonalForm step={step} setStep={setStep} values={personalValues} onChange={personalOnChange} handleSubmit={handleSubmit} loading={loading} />
    } else {
      return <ProfessionalForm isSubmitable={isSubmitable} step={step} setStep={setStep} values={professionalValues} onChange={professionalOnChange} handleSubmit={handleSubmit} loading={loading} />
    }
  }
  return (
    <BecomeSellerContainer>
      <CustomWidthHeightCenterContainer height="calc(100vh - 60px)">
        <BecomeSellerCard width={900}>
          <Steps>
            <div className="step-count">
              <Title>Steps</Title>
              <Spaces top="10px" />
              <span>{step.value}</span> of <span>2</span>
            </div>
            <div className="step-section">
              {stepOptions.map((option) => {
                return (
                  <Step disabled={loading} key={option.id} active={option.id === step.id} onClick={e => handleStepChange(option.value)}>
                    <div className="step-number">{option.id}</div>
                    <div className="step-content">
                      {option.label}
                    </div>
                  </Step>
                )
              })}
            </div>
          </Steps>
          <FormContainer>
            {renderForm()}
          </FormContainer>
        </BecomeSellerCard>
      </CustomWidthHeightCenterContainer>
    </BecomeSellerContainer>
  )
}

export default withGaurd(BecomeSeller)
