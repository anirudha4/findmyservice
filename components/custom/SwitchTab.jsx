import React from 'react'
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';

const SwitchContainer = styledComponents.div`
    padding: 5px;
    border-radius: ${styles.borderRadius.md};
    background-color: ${colors.layer};
    user-select: none;
    display: flex;
    gap: 2px;
    width: fit-content;
`;
const Switch = styledComponents.div`
    padding: ${styles.paddings.sm} ${styles.paddings.lg};
    background-color: ${props => props.active ? colors.secondary : 'inherit'};
    border-radius: ${styles.borderRadius.md};
    font-weight: ${fonts.weights.medium};
    cursor: pointer;
    font-size: ${fonts.sizes.lg};
`;
function SwitchTab({ options, onChange, selected }) {
    const handleClick = value => {
        onChange(value);
    }
    return (
        <SwitchContainer>
            {options.map(option => (
                <Switch key={JSON.stringify(option)} active={option.id === selected.id} className="switch" onClick={e => handleClick(option)}>
                    {option.name}
                </Switch>
            ))}
        </SwitchContainer>
    )
}

export default SwitchTab