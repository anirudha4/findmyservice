import React from 'react';
import { GoSettings } from 'react-icons/go';
import styledComponents from 'styled-components';
import { colors, fonts, styles } from 'theme';

const FilterContainer = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: ${colors.secondary};
    padding: 0 ${styles.paddings.lg};
    font-weight: ${fonts.weights.medium};
    font-size: ${fonts.sizes.lg};
    border-radius: ${styles.borderRadius.md};
    height: 56px;
    cursor: pointer;
    transition: all .2s;
    border: 1px solid ${colors.layer};
    &:hover {
        border: 1px solid ${colors.border};
    }
    &:focus {
        background-color: ${colors.layer};
    }
`;
function Filters() {
    return (
        <FilterContainer tabIndex={0}>
            <div className="icon">
                <GoSettings size={20} />
            </div>
        </FilterContainer>
    )
};

export default Filters;