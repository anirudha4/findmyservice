import { useUser } from 'contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { BiUser } from 'react-icons/bi';
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';
import { Container, Spaces } from './custom';
import Button from './custom/Button';
import Dropdown from './custom/Dropdown';

const NavContainer = styledComponents.header`
    border-bottom: 1px solid ${colors.border};
    background-color: ${colors.secondary};
`;
const Nav = styledComponents.nav`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
        height: 100%;
        display: flex;
        gap: ${styles.paddings.lg};
        align-items: center;
        .links{
            @media (max-width: 700px) {
                display: none;
            }
            display: flex;
            height: 100%;
            align-items: center;
            gap: ${styles.paddings.xl};
            .link {
                display: flex;
                align-items: center;
                height: 100%;
                font-size: ${fonts.sizes.lg};
                color: ${colors.layerText};
                font-weight: ${fonts.weights.bold};
                transition: all .2s;
                border-bottom: 1px solid transparent;
                &.active {
                    border-bottom: 1px solid black;
                    color: ${colors.primary};
                }
            }
        }
        .profile {
            .profile-box {
                height: 40px;
                width: 40px;
                min-height: 40px;
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${colors.primary};
                border-radius: ${styles.borderRadius.md};
                cursor: pointer;
                .initial {
                    color: ${colors.primaryText};
                    user-select: none;
                }
            }
        }
    }
`;
const ProfileContainer = styledComponents.div`
    position: absolute;
    top: 110%;
    right: 0%;
    width: 200px;
    z-index: 10000;
    background-color: ${colors.secondary};
    border: 1px solid ${colors.border};
    box-shadow: ${styles.boxShadow.md};
    border-radius: ${styles.borderRadius.md};
    .menu {
        display: flex;
        flex-direction: column;
        padding: 5px;
        .link {
            border-radius: ${styles.borderRadius.sm};
            padding: 10px;
            width: 100%;
            height: 100%;
            font-size: ${fonts.sizes.lg};
            border-left: 2px solid transparent;
            transition: border .2s background-color .2s color .2s;
            font-weight: ${fonts.weights.medium};
            color: ${colors.layerText};
            &.active {
                color: ${colors.primary};
            }
            &:hover {
                background-color: ${colors.layer};
            }            
            &.danger-link {
                color: ${colors.danger};
                cursor: pointer;
                &:hover{
                    background-color: ${colors.dangerLight};
                }
            }
        }
    }
`;
export const Avatar = styledComponents.div`
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid ${colors.border};
    img {
        object-fit: cover;
        border-radius: 100%;
    }
`;


function Navbar() {
    const { user, logout, currentUser } = useUser();
    const router = useRouter();
    const path = router.pathname;
    const profileMenu = (props) => (
        <ProfileContainer>
            <div className="menu">
                <Link href="/profile">
                    <a className={`link ${path === '/profile' ? 'active' : ''}`}>Profile</a>
                </Link>
                {navOptions.map((option, idx) => (
                    option && (
                        <Link href={option.route} key={idx}>
                            <a className={`link ${path === option.route ? 'active' : ''}`}>{option.name}</a>
                        </Link>
                    )
                ))}
                <div className="link danger-link" onClick={logout}>
                    Logout
                </div>
            </div>
        </ProfileContainer>
    )
    const navOptions = [
        {
            route: '/',
            name: 'Browse Services',
        },
        {
            route: '/sellers',
            name: 'Stores',
        },
        {
            route: '/categories',
            name: 'Categories',
        },
        !currentUser?.isSeller ? {
            route: '/become-a-seller',
            name: 'Become a Seller',
        } : {
            route: '/store-dashboard',
            name: 'Store Dashboard',
        },
        currentUser?.isAdmin && ({
            route: '/admin',
            name: 'Admin Console'
        })
    ]
    if (!user) {
        router.push('/auth');
    } else {
        return (
            <NavContainer>
                <Container>
                    <Nav>
                        <div className="left">
                            <Link href={'/'}>
                                <a className="logo">findmyservice</a>
                            </Link>
                        </div>
                        <div className="right">
                            <div className="links">
                                {navOptions.map((option, idx) => (
                                    option && (
                                        <Link href={option.route} key={idx}>
                                            <a className={`link ${path === option.route ? 'active' : ''}`}>{option.name}</a>
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="profile">
                                <Dropdown
                                    controlClassName="profile-dropdown"
                                    Overlay={(props) => profileMenu(props)}
                                    Layer={
                                        ({ onClick }) => {
                                            return (
                                                <div className="profile-box" onClick={onClick}>
                                                    <div className="initial">{user.email[0].toUpperCase()}</div>
                                                </div>
                                            )
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </Nav>
                </Container>
            </NavContainer>
        )
    }
}

export default Navbar