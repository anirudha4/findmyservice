import PersonalForm from 'components/BecomeSeller/PersonalForm';
import ProfessionalForm from 'components/BecomeSeller/ProfessionalForm';
import { Card, Chip, CustomWidthHeightCenterContainer, Flex, Line, Spaces, Title } from 'components/custom';
import { useUser } from 'contexts/AuthContext';
import useForm from 'hooks/useForm';
import React, { useState, useEffect } from 'react'
import styledComponents from 'styled-components'
import axios from 'axios';
import { colors, fonts, styles } from 'theme';
import { requiredValidation } from 'utils/validation';
import withGaurd from 'components/hoc/withGaurd';
import { createFormData } from 'utils';
import { createSellerRequest, deleteSellerRequest } from 'services/request';
import useSWR, { mutate } from 'swr';
import fetcher from 'utils/fetcher';
import { Oval } from 'react-loader-spinner';
import Button from 'components/custom/Button';

const BecomeSellerCard = styledComponents(Card)`
  display: grid;
  grid-template-columns: ${props => props.noGrid ? '' : '1fr 1fr'};
  gap: 20px;
  padding: ${styles.paddings.md};
  min-height: 550px;
  @media (max-width: 700px) {
      grid-template-columns: 1fr;
      height: 100%;
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
const SellerRequestContainer = styledComponents.div`
  padding: ${styles.paddings.lg};
  width: 100%;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 20px;
    @media (max-width: 580px) {
      flex-direction: column;
      align-items: flex-start;
      div:nth-child(1) {
        font-size: ${fonts.sizes.xxl};
      }
      button {
        display: none;
      }
    }
  }
  .details {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .label {
    font-size: ${fonts.sizes.md};
    color: ${colors.layerText};
  }
  .text {
    font-size: ${colors.text};
    font-size: ${fonts.sizes.lg};
    font-weight: ${fonts.weights.medium};
  }
  .asset-thumbnail {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    border-radius: ${styles.borderRadius.md};
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const stepOptions = [
  { id: 1, label: 'Fill in your Personal Details', value: 1 },
  { id: 2, label: 'Fill  in your Professional Details', value: 2 }
]
function BecomeSeller() {
  const { user } = useUser();
  const { data: sellerRequest } = useSWR(`/seller-requests?uid=${user.uid}`, fetcher);
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
  const { values: personalValues, onChange: personalOnChange, resetForm: personalReset } = useForm(defaultPersonalValues)
  const { values: professionalValues, onChange: professionalOnChange, resetForm: professionalReset } = useForm(defaultProfessionalValues)
  const isSubmitable = () => {
    try {
      return requiredValidation({ ...personalValues, ...professionalValues }, ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'storePhoto', 'documentPhoto'])
    } catch (err) {
      return false;
    }
  }
  const handleDeleteRequest = async () => {
    try {
      setLoading(true);
      await deleteSellerRequest(`/seller-requests?uid=${sellerRequest.id}`)
      mutate(`/seller-requests?uid=${user.uid}`)
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }
  const handleStepChange = currentStep => {
    if (currentStep === step.value) return
    if (currentStep === 1) setStep(stepOptions[0])
    if (currentStep === 2) setStep(stepOptions[1])
  }

  const handleSubmit = async (type, e) => {
    try {
      e.preventDefault();
      setLoading(true)
      if (type === 'personal') {
        await requiredValidation(personalValues, ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip']);
        setStep(stepOptions[1])
      } else if (type === 'professional') {
        if (isSubmitable()) {
          const formValues = { ...personalValues, ...professionalValues, uid: user.uid };
          const formData = createFormData(formValues);
          await createSellerRequest('/seller-requests', formData, { 'Content-Type': 'multipart/form-data' });
          mutate(`/seller-requests?uid=${user.uid}`)
          personalReset();
          professionalReset();
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
    <CustomWidthHeightCenterContainer height="calc(100vh - 60px)" style={{ overflowY: 'auto' }}>
      <BecomeSellerCard width={900} noGrid={sellerRequest}>
        {sellerRequest ? (
          <SellerRequestContainer>
            <div className="header">
              <Flex gap="20px">
                <Title>Seller Request Status</Title>
                <Chip>{sellerRequest.status ? 'Approved' : 'Pending'}</Chip>
              </Flex>
              <Button onClick={handleDeleteRequest} loading={loading} background={colors.dangerLight} color={colors.danger}>
                Delete Request
              </Button>
            </div>
            <Spaces top="15px" />
            <Line />
            <Spaces top="15px" />
            <p>Personal Details</p>
            <Spaces top="15px" />
            <div className="details">
              <div className="field">
                <div className="label">First Name</div>
                <div className="text">{sellerRequest.firstName}</div>
              </div>
              <div className="field">
                <div className="label">Last Name</div>
                <div className="text">{sellerRequest.lastName}</div>
              </div>
              <div className="field">
                <div className="label">Email</div>
                <div className="text">{sellerRequest.email}</div>
              </div>
              <div className="field">
                <div className="label">Phone Number</div>
                <div className="text">{sellerRequest.phone}</div>
              </div>
              <div className="field">
                <div className="label">Address</div>
                <div className="text">{sellerRequest.address}</div>
              </div>
              <div className="field">
                <div className="label">Zip Code</div>
                <div className="text">{sellerRequest.zip}</div>
              </div>
              <div className="field">
                <div className="label">City</div>
                <div className="text">{sellerRequest.city}</div>
              </div>
              <div className="field">
                <div className="label">State</div>
                <div className="text">{sellerRequest.state}</div>
              </div>
            </div>
            <Spaces top="15px" />
            <Line />
            <Spaces top="15px" />
            <p>Professional Details</p>
            <Spaces top="15px" />
            <div className="details">
              <div className="field">
                <div className="label">GSTIN</div>
                <div className="text">{sellerRequest.gstin ? sellerRequest.gstin : 'NA'}</div>
              </div>
            </div>
            <Spaces top="15px" />
            <Line />
            <Spaces top="15px" />
            <p>Assets</p>
            <Spaces top="15px" />
            <div className="details">
              <div className="field">
                <div className="label">Aadhar/Pan Card</div>
                <div className="asset-thumbnail">
                  <img src={sellerRequest.documentPhoto.downloadURL} alt={sellerRequest.documentPhoto.name} />
                </div>
              </div>
              <div className="field">
                <div className="label">Store Image</div>
                <div className="asset-thumbnail">
                  <img src={sellerRequest.storePhoto.downloadURL} alt={sellerRequest.storePhoto.name} />
                </div>
              </div>
            </div>
          </SellerRequestContainer>
        ) : (
          <>
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
          </>
        )
        }
      </BecomeSellerCard >
    </CustomWidthHeightCenterContainer >
  )
}

export default withGaurd(BecomeSeller)
