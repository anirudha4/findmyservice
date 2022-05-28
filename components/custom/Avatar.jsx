import React from 'react'
import styledComponents from 'styled-components';
import { colors, fonts, styles } from 'theme';

export const AvatarBox = styledComponents.div`
    ${props => `
        height: ${props.height}px;
        width: ${props.width}px;
        min-height: ${props.height}px;
        min-width: ${props.width}px;   
    `}
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary};
    border-radius: ${styles.borderRadius.md};
    cursor: pointer;
    .initial {
        color: ${colors.primaryText};
        font-size: ${fonts.sizes.lg};
        user-select: none;
    }
`;
function Avatar({
    width,
    height,
    src
}) {
    return (
        <AvatarBox width={width} height={height} >
            <div className="initial">{src[0].toUpperCase()}</div>
        </AvatarBox>
    )
}

export default Avatar