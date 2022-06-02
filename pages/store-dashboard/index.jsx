import React from 'react'
import withGaurd from 'components/hoc/withGaurd';
import DashboardLayout, { dashboardPrefix } from 'components/DashboardLayout';
import styledComponents from 'styled-components';
import { Card, Line, Spaces, Title } from 'components/custom';
import { styles } from 'theme';
import Button from 'components/custom/Button';
import Link from 'next/link';

const Dashboard = styledComponents.div`
    padding: ${styles.paddings.sm};
`;
function StoreDashboard({ store, user }) {
    return (
        <Dashboard>
            {store.name ? store.name : (
                <Link href={`${dashboardPrefix}/create`}>
                    <a>
                        <Button>
                            Create Store
                        </Button>
                    </a>
                </Link>
            )}
        </Dashboard>
    )
}

StoreDashboard.Layout = DashboardLayout;
export default withGaurd(StoreDashboard)

export async function getStaticProps() {
    return {
        props: {
            isDashboardRoute: true
        }
    }
}