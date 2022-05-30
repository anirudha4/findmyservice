import useForm from 'hooks/useForm';
import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io';
import styledComponents from 'styled-components';
import { colors, fonts, styles } from 'theme';
import { Field, Flex, Line, Spaces } from './custom'
import Button from './custom/Button';
import Select from './custom/Select';

const Details = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
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
const FormContainer = styledComponents.div`
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${styles.paddings.md} 0;
    .form-title {
      font-size: ${fonts.sizes.xl};
      font-weight: ${fonts.weights.bold};
    }
    .form-close-icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.background};
      border-radius: ${styles.borderRadius.md};
      cursor: pointer;
      transition: all .2s;
      svg {
          transition: all .2s;
      }
      &:hover {
        background-color: ${colors.layer};
        svg {
            fill: ${colors.layerText};
        }
      }
    }
  }
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const options = [
    { id: 1, value: true, label: 'Approve' },
    { id: 2, value: false, label: 'Decline' },
]
const defaultValues = {
    subject: '',
    message: '',
    approved: options[0]
}
const ApproveForm = ({ request, onClose }) => {
    const { values, onChange } = useForm(defaultValues);
    const handleSubmit = () => {
    }
    return (
        <FormContainer>
            <div className="form-header">
                <div className="form-title">Approve Seller Request</div>
                <div className="form-close-icon" onClick={onClose}>
                    <IoMdClose size={20} color={colors.layerText} />
                </div>
            </div>
            <Spaces top="10px" />
            <form>
                <Field disabled>
                    <label htmlFor='subject'>Subject</label>
                    <input disabled type="text" name='subject' id='subject' value={`Greeting Message ${request.firstName} ${request.lastName}`} />
                </Field>
                <Field>
                    <label htmlFor='message'>Message</label>
                    <textarea name='message' id='message' />
                </Field>
                <Select options={options} onChange={onChange} name="approved" placeholder="Request Status" label="Select Status" value={values.approved} /> 
                <Button style={{ width: '100%' }}>Approve</Button>
            </form>
        </FormContainer>
    )
}

function SellerRequestSidePanel({ request, sidePanelRef }) {
    const [showApproveForm, setShowApproveForm] = useState(false);
    useEffect(() => {
        if (showApproveForm && sidePanelRef.current) {
            sidePanelRef.current.scrollTop = sidePanelRef.current.scrollHeight;
        }
    }, [showApproveForm])
    useEffect(() => {
        setShowApproveForm(false)
    }, [request])
    return (
        <div>
            <p>Personal Details</p>
            <Spaces top="15px" />
            <Details>
                <div className="field">
                    <div className="label">First Name</div>
                    <div className="text">{request.firstName}</div>
                </div>
                <div className="field">
                    <div className="label">Last Name</div>
                    <div className="text">{request.lastName}</div>
                </div>
                <div className="field">
                    <div className="label">Email</div>
                    <div className="text">{request.email}</div>
                </div>
                <div className="field">
                    <div className="label">Phone Number</div>
                    <div className="text">{request.phone}</div>
                </div>
                <div className="field">
                    <div className="label">Address</div>
                    <div className="text">{request.address}</div>
                </div>
                <div className="field">
                    <div className="label">Zip Code</div>
                    <div className="text">{request.zip}</div>
                </div>
                <div className="field">
                    <div className="label">City</div>
                    <div className="text">{request.city}</div>
                </div>
                <div className="field">
                    <div className="label">State</div>
                    <div className="text">{request.state}</div>
                </div>
            </Details>
            <Spaces top="15px" />
            <Line />
            <Spaces top="15px" />
            <p>Professional Details</p>
            <Spaces top="15px" />
            <Details>
                <div className="field">
                    <div className="label">GSTIN</div>
                    <div className="text">{request.gstin ? request.gstin : 'NA'}</div>
                </div>
            </Details>
            <Spaces top="15px" />
            <Line />
            <Spaces top="15px" />
            <p>Assets</p>
            <Spaces top="15px" />
            <Details>
                <div className="field">
                    <div className="label">Aadhar/Pan Card</div>
                    <div className="asset-thumbnail">
                        <img src={request.documentPhoto.downloadURL} alt={request.documentPhoto.name} />
                    </div>
                </div>
                <div className="field">
                    <div className="label">Store Image</div>
                    <div className="asset-thumbnail">
                        <img src={request.storePhoto.downloadURL} alt={request.storePhoto.name} />
                    </div>
                </div>
            </Details>
            <Spaces top="20px" />
            <Line />
            <Spaces top="20px" />
            {showApproveForm ? (<ApproveForm request={request} onClose={e => setShowApproveForm(false)} />) : (<Flex gap="20px">
                <Button style={{ width: '100%' }} onClick={() => setShowApproveForm(true)}>Accept</Button>
                <Button color={colors.danger} background={colors.dangerLight} style={{ width: '100%' }} onClick={() => setShowApproveForm(true)}> Decline</Button>
            </Flex>)}
        </div >
    )
}

export default SellerRequestSidePanel