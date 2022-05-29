import React, { useState, useEffect, useRef } from 'react';
import { Container, Field, Flex, Line, Rectangle, Skeleton, Spaces, Title } from 'components/custom';
import { colors, fonts, styles } from 'theme';
import fetcher from 'utils/fetcher';
import styledComponents from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import SidePanel from 'components/custom/SidePanel';
import { Oval } from 'react-loader-spinner';
import Button from 'components/custom/Button';
import withGaurd from 'components/hoc/withGaurd';
import withAdmin from 'components/hoc/withAdmin';
import { IoMdClose } from 'react-icons/io';

const SellerRequestsContainer = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${styles.paddings.lg};
`;
const RequestItem = styledComponents.div`
  padding: ${styles.paddings.lg};
  border-radius: ${styles.borderRadius.md};
  border: 1px solid ${colors.border};
  width: 100%;
  background-color: ${colors.secondary};
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .text {
    font-size: ${fonts.sizes.lg};
    font-weight: ${fonts.weights.bold};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 180px;
  }
  .text-secondary {
    font-size: ${fonts.sizes.md};
    font-weight: ${fonts.weights.medium};
    color: ${colors.layerText};
  }
  .view-link {
    font-size: ${fonts.sizes.md};
    font-weight: ${fonts.weights.medium};
    cursor: pointer;
    color: ${colors.layerText};
    &:hover {
      color: ${colors.primary};
    }
  }
`;

const RequestLoader = styledComponents.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%:
  width: 100%;
`;
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
      border: 1.5px solid ${colors.border};
      border-radius: ${styles.borderRadius.md};
      cursor: pointer;
      transition: all .2s;
      svg {
          transition: all .2s;
      }
      &:hover {
          border-color: ${colors.primary};
          svg {
              fill: ${colors.primary};
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

const SellerRequest = ({ request }) => {
  return (
    <RequestItem>
      <div className="header">
        <div className="title">
          <div className="text">{request.firstName} {request.lastName}</div>
          <Spaces top="3px" />
          <div className="text-secondary">{request.email}</div>
        </div>
        <Link href={`/admin?requestId=${request.id}`}>
          <a className="view-link">View</a>
        </Link>
      </div>
      <div className="footer">
        {/* Figure out something */}
      </div>
    </RequestItem>
  )
}

const ApproveForm = ({ request, onClose }) => {
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
        <Button style={{ width: '100%' }}>Approve</Button>
      </form>
    </FormContainer>
  )
}
const DeclineForm = ({ request, onClose }) => {
  return (
    <FormContainer>
      <div className="form-header">
        <div className="form-title">Decline Seller Request</div>
        <div className="form-close-icon" onClick={onClose}>
          <IoMdClose size={20} color={colors.layerText} />
        </div>
      </div>
      <Spaces top="10px" />
      <form>
        <Field disabled>
          <label htmlFor='subject'>Subject</label>
          <input disabled type="text" name='subject' id='subject' value={`Sorry Message ${request.firstName} ${request.lastName}`} />
        </Field>
        <Field>
          <label htmlFor='message'>Message</label>
          <textarea name='message' id='message' />
        </Field>
        <Button style={{ width: '100%' }}>Decline</Button>
      </form>
    </FormContainer>
  )
}

function Admin({ }) {
  // component state
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  // external states
  const router = useRouter();
  const { requestId } = router.query;
  const { data: sellerRequests } = useSWR(`/seller-requests?pending=true`, fetcher);
  const { data: request, error } = useSWR(`/seller-requests/${requestId}`, fetcher);

  // refs
  const sidePanelRef = useRef();
  useEffect(() => {
    if((showApproveForm || showDeclineForm) && sidePanelRef.current) {
      sidePanelRef.current.scrollTop = sidePanelRef.current.scrollHeight;
    }
  }, [showApproveForm, showDeclineForm])
  return (
    <Container>
      {requestId && (
        <SidePanel ref={sidePanelRef} id="seller-request" visible={!!requestId} onClose={() => router.push('/admin')} title={request ? `${request?.firstName} ${request?.lastName}` : <div style={{ height: 10, width: 50, background: colors.border }}></div>}>
          {request ? (
            <>
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
              {showApproveForm ? (<ApproveForm request={request} onClose={e => setShowApproveForm(false)} />) : showDeclineForm ? (<DeclineForm request={request} onClose={e => setShowDeclineForm(false)} />) : (<Flex gap="20px">
                <Button style={{ width: '100%' }} onClick={() => setShowApproveForm(true)}>Accept</Button>
                <Button color={colors.danger} background={colors.dangerLight} style={{ width: '100%' }} onClick={() => setShowDeclineForm(true)}> Decline</Button>
              </Flex>)}
            </>
          ) : <RequestLoader>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="black"
              secondaryColor="#fcfcfc"
            />
          </RequestLoader>}
        </SidePanel>
      )
      }
      <Spaces top={styles.margins.lg} />
      <Title>Seller Requests</Title>
      <Spaces top={styles.margins.lg} />
      <SellerRequestsContainer>
        {!!sellerRequests ? sellerRequests.map((request, key) => {
          return (
            <SellerRequest key={key} request={request} />
          )
        }) : (
          <Skeleton>
            <Rectangle width={250} height={10} background={colors.border} />
            <Spaces top="10px" />
            <Rectangle width={200} height={10} background={colors.border} />
          </Skeleton>
        )}
      </SellerRequestsContainer>
    </Container >
  )
}
const ProtectedRoute = withGaurd(Admin)
export default withAdmin(ProtectedRoute)