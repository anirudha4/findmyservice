import React from 'react'
import styledComponents from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import { colors, fonts, styles } from 'theme';
const SearchBarInputContainer = styledComponents.div`
    display: flex;
    background-color: ${colors.secondary};
    border-radius: ${styles.borderRadius.md};
    overflow: hidden;
    border: 1px solid ${colors.layer};
    transition: all .2s;
    &:focus-within {
        border: 1px solid ${colors.border};
    }
    input {
        outline: none;
        border: none;
        flex: 1;
        padding: ${styles.paddings.lg};
        font-weight: ${fonts.weights.medium};
    }
    button {
        min-width: 50px;
        border: none;
        outline: none;
        border-radius: ${styles.borderRadius.md};
        margin: 5px;
        background-color: ${colors.primary};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
function SearchBar() {
  return (
    <SearchBarInputContainer>
        <input type="text" placeholder='Search for services, sellers/stores ' />
        <button>
            <FiSearch size='20px' color={colors.secondary} />
        </button>
    </SearchBarInputContainer>
  )
}

export default SearchBar