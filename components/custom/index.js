import styledComponents from "styled-components";
import { colors, fonts, styles } from "theme";

export const Container = styledComponents.div`
    max-width: ${styles.maxWidth};
    margin: 0 auto;
    padding: 0 ${styles.paddings.md};
`;

export const CustomWidthHeightCenterContainer = styledComponents.div`
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '100vh'};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styledComponents.div`
    padding: ${styles.paddings.lg};
    border-radius: ${styles.borderRadius.md};
    background-color: ${colors.secondary};
    box-shadow: ${styles.boxShadow.sm};
    max-width: ${props => props.width ? `${props.width}px` : '100%'};
    width: 100%;
`;

export const Spaces = styledComponents.div`
    margin-top: ${props => props.top ? `${props.top}` : '0'};
    margin-bottom: ${props => props.bottom ? `${props.bottom}` : '0'};
    margin-left: ${props => props.left ? `${props.left}` : '0'};
    margin-right: ${props => props.right ? `${props.right}` : '0'};
`;

export const Field = styledComponents.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    border: 1px solid ${colors.border};
    border-radius: ${styles.borderRadius.md};
    overflow: hidden;
    transition: all .2s;
    &:focus-within {
        border-color ${colors.primary};
    }
    label {
        color: ${colors.layerLightText};
        font-size: ${fonts.sizes.sm};
        padding-left: ${styles.paddings.md};
        padding-top: ${styles.paddings.md};
    }
    input {
        outline: none;
        border: none;
        padding: ${styles.paddings.sm};
        padding-left: ${styles.paddings.md};
        padding-bottom: 15px;
    }
`;
export const Flex = styledComponents.div`
    display: flex;
    align-items: ${props => props.align ? props.align : 'center'};
    justify-content: ${props => props.justify ? props.justify : 'start'};
    gap: ${props => props.gap ? props.gap : '0px'};
`;
