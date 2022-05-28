import React from 'react'
import { Oval } from 'react-loader-spinner';
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';
import { Flex } from '.';

const StyledButton = styledComponents.button`
    min-height: 50px;
    outline: none;
    border: none;
    background-color: ${props => props.background ? props.background : colors.primary};
    color: ${props => props.color ? props.color : colors.secondary};
    cursor: pointer;
    width: fit-content;
    min-width: 150px;
    border-radius: ${styles.borderRadius.md};
    font-weight: ${fonts.weights.bold};
`;
function Button({ children, loading, ...props }) {
  return (
    <StyledButton {...props}>
      <Flex justify="center" gap="10px">
        {children} {loading && (
          <Oval
            ariaLabel="loading-indicator"
            height={15}
            width={15}
            strokeWidth={5}
            strokeWidthSecondary={1}
            color="black"
            secondaryColor="white"
          />
        )}
      </Flex>
    </StyledButton>
  )
}

export default Button