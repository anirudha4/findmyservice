import { Card, Container, Flex, Line, Spaces } from 'components/custom';
import Loader from 'components/custom/Loader';
import withGaurd from 'components/hoc/withGaurd';
import { useUser } from 'contexts/AuthContext';
import Link from 'next/link';
import React from 'react'
import { RiSuitcaseLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { BsMenuAppFill } from 'react-icons/bs'
import { MdOutlineDashboard } from 'react-icons/md'
import { GrAppsRounded } from 'react-icons/gr'
import styledComponents from 'styled-components'
import useSWR from 'swr';
import { colors, fonts, styles } from 'theme';
import fetcher from 'utils/fetcher';
import { useRouter } from 'next/router';
import DashboardLayout from 'components/DashboardLayout';


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
        icon: <RiSuitcaseLine size={20} />,
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
        icon: <MdOutlineDashboard size={20} />,
        path: `${dashboardPrefix}/navbar`
    },
]

function StoreDashboard() {
    const { user } = useUser();
    const { data: store } = useSWR(`/stores?uid=${user.uid}`, fetcher);
    if (!store) {
        return <Loader />
    }
    return (
        <div>Hello Dashboard</div>
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