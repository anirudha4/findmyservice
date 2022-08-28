import React from 'react'
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';

const AlertBox = styledComponents.div`
    padding: 6px;
    border-radius: ${styles.borderRadius.md};
    background-color: ${props => colors[`${props.type}Light`]};
    font-size: ${fonts.sizes.sm};
    color: ${props => colors[props.type]}; 
`;
function Alert({ message, type }) {
  return (
    <AlertBox type={type}>{message}</AlertBox>
  )
}

export default Alert