import { Card, Flex, Spaces } from 'components/custom';
import Loader from 'components/custom/Loader';
import withGaurd from 'components/hoc/withGaurd';
import { useUser } from 'contexts/AuthContext';
import React from 'react'
import styledComponents from 'styled-components'
import useSWR from 'swr';
import { colors, fonts, styles } from 'theme';
import fetcher from 'utils/fetcher';

const StoreDashboardContainer = styledComponents.div``;
const DashboardGrid = styledComponents.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;
    height: calc(100vh - 60px);
`;
const Sidebar = styledComponents.div`
    background-color: ${colors.secondary};
    height: 100%;
    padding: ${styles.paddings.lg};
    border-right: 1px solid ${colors.border};
    .store-details {
        .no-store {
            padding: ${styles.paddings.md};
            background-color: ${colors.layer};
            border-radius: ${styles.borderRadius.md};
            .no-store-text {
                .label {
                    font-size: ${fonts.sizes.md};
                    color: ${colors.layerText};
                }
                .text {
                    font-size: ${fonts.sizes.lg};
                    font-weight: ${fonts.weights.medium};
                }
            }
        }
    }
`;
const Main = styledComponents.div``;
function StoreDashboard() {
    const { user } = useUser();
    const { data: store } = useSWR(`/stores?uid=${user.uid}`, fetcher);
    if (!store) {
        return <Loader />
    }
    return (
        <StoreDashboardContainer>
            <DashboardGrid>
                <Sidebar>
                    <div className="store-details">
                        {store.name ? (
                            <div className="store-name">
                                {store.name}
                            </div>
                        ) : (
                            <div className="no-store">
                                <div className="no-store-text">
                                    <Flex gap="5px" style={{ flexDirection: 'column' }} align="flex-start">
                                        <div className="label">
                                            {user.displayName}
                                        </div>
                                        <div className="text">
                                            No Store Created
                                        </div>
                                    </Flex>
                                </div>
                            </div>
                        )}
                    </div>
                </Sidebar>
                <Main>

                </Main>
            </DashboardGrid>
        </StoreDashboardContainer>
    )
}

export default withGaurd(StoreDashboard)