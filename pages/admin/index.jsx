import React from 'react';
import { Container, Spaces, Title } from 'components/custom';
import { colors, fonts, styles } from 'theme';
import fetcher from 'utils/fetcher';
import styledComponents from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import SidePanel from 'components/custom/SidePanel';
import Loader from 'components/custom/Loader';
import { Oval } from 'react-loader-spinner';

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

function Admin({ sellerRequests }) {
  const router = useRouter();
  const { requestId } = router.query;
  const { data: request, error } = useSWR(`/seller-requests/${requestId}`, fetcher);
  console.log(request);
  return (
    <Container>
      {requestId && (
        <SidePanel id="seller-request" visible={!!requestId} onClose={() => router.push('/admin')} title={request ? `${request?.firstName} ${request?.lastName}` : <div style={{ height: 10, width: 50, background: colors.border }}></div>}>
          {request ? (
            <div>Body of the request</div>
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
      )}
      <Spaces top={styles.margins.lg} />
      <Title>Seller Requests</Title>
      <Spaces top={styles.margins.lg} />
      <SellerRequestsContainer>
        {sellerRequests.map((request, key) => {
          return (
            <SellerRequest key={key} request={request} />
          )
        })}
      </SellerRequestsContainer>
    </Container>
  )
}

export default Admin

export async function getServerSideProps(ctx) {
  const sellerRequests = await fetcher('http://localhost:3000/api/seller-requests?pending=true');
  return {
    props: {
      sellerRequests
    }
  }
}