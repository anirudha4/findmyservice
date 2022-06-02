import { useRouter } from 'next/router';
import React from 'react'
import styledComponents from 'styled-components';
import useSWR from 'swr';
import { CgWorkAlt } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { BsMenuAppFill } from 'react-icons/bs'
import { VscEditorLayout } from 'react-icons/vsc'
import { GrAppsRounded } from 'react-icons/gr'
import { colors, styles, fonts } from 'theme';
import fetcher from 'utils/fetcher';
import Loader from './custom/Loader';
import { Container, Flex, Line, Spaces } from './custom';
import Link from 'next/link';

const StoreDashboardContainer = styledComponents.div`
    padding: 20px 0;
`;
const DashboardGrid = styledComponents.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
    max-height: calc(100vh - 100px);
`;
const Sidebar = styledComponents.div`
    background-color: ${colors.secondary};
    border-radius: ${styles.borderRadius.sm};
    box-shadow: ${styles.boxShadow.sm};
    height: 100%;
    padding: ${styles.paddings.md};
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
const Menu = styledComponents.div`
    .menu-link {
        height: 50px;
        padding: 0 ${styles.paddings.md};
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border-radius: ${styles.borderRadius.md};
        transition: all .05s;
        font-size: ${fonts.sizes.lg};
        &:hover {
            background-color: ${colors.layer};
        }
    }
`;

const dashboardPrefix = '/store-dashboard';
const dashboardOptions = [
    {
        id: 0,
        name: 'Dashboard',
        icon: <GrAppsRounded size={20} />,
        path: `${dashboardPrefix}/services`
    },
    {
        id: 1,
        name: 'Services',
        icon: <CgWorkAlt size={20} />,
        path: `${dashboardPrefix}/services`
    },
    {
        id: 2,
        name: 'Settings',
        icon: <FiSettings size={20} />,
        path: `${dashboardPrefix}/settings`
    },
    {
        id: 3,
        name: 'Navbar',
        icon: <BsMenuAppFill size={20} />,
        path: `${dashboardPrefix}/navbar`
    },
    {
        id: 3,
        name: 'Store Appearance',
        icon: <VscEditorLayout size={20} />,
        path: `${dashboardPrefix}/navbar`
    },
]


function DashboardLayout({ children, pageProps, user }) {
    const { data: store } = useSWR(`/stores?uid=${user.uid}`, fetcher);
    const router = useRouter();
    if (!store) {
        return <Loader />
    }
    return (
        <StoreDashboardContainer>
            <Container>
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
                            <Spaces top="10px" />
                            <Line />
                            <Spaces top="10px" />
                            <Menu>
                                {dashboardOptions.map(option => (
                                    <Link href={option.path}>
                                        <a className={`menu-link ${option.path === router.pathname}`}>
                                            <Flex align="center" justify="space-between">
                                                <div className="menu-text">
                                                    {option.name}
                                                </div>
                                                <div className="menu-icon">
                                                    {option.icon}
                                                </div>
                                            </Flex>
                                        </a>
                                    </Link>
                                ))}
                            </Menu>
                        </div>
                    </Sidebar>
                    <Main>
                        {React.cloneElement(children, {
                            ...pageProps,
                            store
                        })}
                    </Main>
                </DashboardGrid>
            </Container>
        </StoreDashboardContainer>
    )
}

export default DashboardLayout