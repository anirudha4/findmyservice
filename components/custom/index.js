import Link from "next/link";
import styledComponents from "styled-components";
import { colors, fonts, styles } from "theme";

export const Container = styledComponents.div`
    max-width: ${styles.maxWidth};
    margin: 0 auto;
    padding: 0 ${styles.paddings.lg};
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
    ${props => props.disabled && `
        background-color: ${colors.layer};
        cursor: not-allowed;
        input {
            pointer-events: none;
        }
    `}
    &:focus-within {
        border-color ${colors.primary};
    }
    label {
        color: ${colors.layerLightText};
        font-size: ${fonts.sizes.sm};
        padding-left: ${styles.paddings.md};
        padding-top: ${styles.paddings.md};
    }
    input, textarea {
        outline: none;
        border: none;
        padding: ${styles.paddings.sm};
        padding-left: ${styles.paddings.md};
        font-size: ${fonts.sizes.lg};
        padding-bottom: 15px;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
        background-color: white;
    }
`;
export const MediaField = styledComponents.div`
    width: 100%;
    gap: 5px;
    border: 1px dashed ${colors.border};
    border-radius: ${styles.borderRadius.md};
    overflow: hidden;
    transition: all .2s;
    position: relative;
    input {
        display: none;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        min-height: 70px;
        color: ${colors.layerLightText};
        font-size: ${fonts.sizes.md};
        user-select: none;
    }
    .filename {
        color: ${colors.primary};
    }
    .clear-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgba(255, 0, 0, 0.06);
        border-radius: 50%;
        cursor: pointer;
        svg {
            color: rgba(255, 0, 0, 0.55);
            pointer-events: none;
        }
    }
`;
export const Flex = styledComponents.div`
    display: flex;
    align-items: ${props => props.align ? props.align : 'center'};
    justify-content: ${props => props.justify ? props.justify : 'start'};
    gap: ${props => props.gap ? props.gap : '0px'};
`;


export const Logo = styledComponents(Link)`
    text-decoration: none;
    color: ${colors.primary};
`;

export const Line = styledComponents.div`
    border-bottom: 1px solid ${colors.border};
`;

export const Title = styledComponents.div`
    font-size: ${fonts.sizes.xxxl};
    font-weight: ${fonts.weights.bold};
`;

export const List = styledComponents.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    .list-item {
        padding: ${styles.paddings.md};
        border-radius: ${styles.borderRadius.md};
        background-color: ${colors.secondary};
        border: 1px solid ${colors.border};
    }
`;

export const Chip = styledComponents.div`
    padding: ${styles.paddings.sm} ${styles.paddings.md};
    border-radius: ${styles.borderRadius.md};
    border: 1px solid ${colors.border};
    background-color: ${colors.primary};
    color: ${colors.secondary};
    font-size: ${fonts.sizes.sm};
    font-weight: ${fonts.weights.bold};
    cursor: pointer;
`;

export const Skeleton = styledComponents.div`
`;
export const Rectangle = styledComponents.div`
    ${props => `
        max-width: ${props.width}px;
        width: 100%;
        height: ${props.height}px;
        border-radius: ${styles.borderRadius.md};
        background-color: ${props.background};
    `}
`;