import { useState, useEffect } from "react";
import { FcGoogle } from 'react-icons/fc';
import { Card, Container, CustomWidthHeightCenterContainer, Field, Flex, Spaces } from "components/custom"
import SwitchTab from "components/custom/SwitchTab";
import SearchBar from "components/custom/SearchBar";
import styledComponents from "styled-components"
import { colors, fonts, styles } from "theme";
import Button from "components/custom/Button";
import { useUser } from "contexts/AuthContext";
import useForm from "hooks/useForm";
import Router, { useRouter } from "next/router";

const AuthContainer = styledComponents(Card)`
    display: grid;
    // grid-template-columns: 1fr 1fr;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: ${styles.paddings.md};
    min-height: 500px;
    // @media (max-width: 700px) {
    //     grid-template-columns: 1fr;
    // }
`;
const ContainedCard = styledComponents(Card)`
    box-shadow: none;
    position: relative;
    background-color: ${colors.primary};
    color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    .logo {
        font-size: ${fonts.sizes.xxxl};
        font-weight: ${fonts.weights.bold};
        color: #f4f4f4;
        position: absolute;
        top: 20px;
        left: 20px;
    }
    .headline {
        font-size: ${fonts.sizes.xxxl};
        font-weight: ${fonts.weights.medium};
        line-height: 40px;
    }
`;
const FormContainer = styledComponents.div`
    padding: ${styles.paddings.xl} ${styles.paddings.md};
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
function Auth() {
    const defaultValues = {
        email: '',
        password: ''
    }
    const router = useRouter();
    const { user, manualLogin, manualSignup } = useUser();
    const [loading, setLoading] = useState(false);
    const switchOptions = [{ name: 'Login', id: 1, value: 'login' }, { name: 'Signup', id: 2, value: 'signup' }]
    const [active, setActive] = useState(switchOptions[0]);
    const { values, onChange } = useForm(defaultValues);
    const handleSubmit = async e => {
        try {
            setLoading(true)
            e.preventDefault();
            if(active.value === 'login') {
                await manualLogin(values.email, values.password);
            } else {
                await manualSignup(values.email, values.password);
            }
            setLoading(false);
        } catch (err) {
            console.log({ err: err.message });
        }
    }
    return (
        <Container>
            <CustomWidthHeightCenterContainer>
                <AuthContainer width={900}>
                    <ContainedCard>
                        <div className="logo">
                            findmyservice
                        </div>
                        <Spaces top={styles.margins.xxl} />
                        <div className="headline">
                            Find and Buy Services that perfectly meet your Business Requirements
                        </div>
                        <Spaces top={styles.margins.xxl} />
                        <div className="search-bar">
                            <SearchBar />
                        </div>
                    </ContainedCard>
                    <FormContainer>
                        <SwitchTab
                            options={switchOptions}
                            onChange={setActive}
                            selected={active}
                        />
                        <Spaces top={styles.margins.xxl} />
                        <form
                            onSubmit={handleSubmit}
                            autoComplete="off"
                            autoSave={true}
                            style={{ display: 'grid', gap: 20 }}
                        >
                            {/* {active.value === 'signup' && <Flex gap="20px">
                                <Field>
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input type="text" id="firstName" placeholder="Eg. John" />
                                </Field>
                                <Field>
                                    <label htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input type="text" id="lastName" placeholder="Eg. Doe" />
                                </Field>
                            </Flex>} */}
                            <Field>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input type="email" name="email" id="email" placeholder="Eg. johndoe@gmail.com" onChange={onChange} value={values.email} />
                            </Field>
                            <Field>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" name="password" id="password" placeholder="***********" onChange={onChange} value={values.password} />
                            </Field>
                            <Flex gap="20px">
                                <Button loading={loading} disabled={loading} style={{ width: '100%' }}>
                                    {active.name}
                                </Button>
                                {/* <Button type="button" style={{ backgroundColor: colors.secondary, color: colors.primary }}>
                                    <Flex gap="10px" justify="center">
                                        <span>Google</span>
                                        <FcGoogle size={20} />
                                    </Flex>
                                </Button> */}
                            </Flex>
                        </form>
                    </FormContainer>
                </AuthContainer>
            </CustomWidthHeightCenterContainer>
        </Container>
    )
}
export default () => {
    const { user } = useUser();
    if(user) {
        Router.push('/')
    } else {
        return <Auth />
    }
};

export function getStaticProps() {
    return {
        props: {
            showHeader: false
        }
    }
}