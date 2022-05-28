import React from 'react'
import styledComponents from 'styled-components'
import { styles } from 'theme';
import Filters from './Filters'
import SearchBar from './SearchBar'

const SearchAndFilterContainer = styledComponents.div`
    display: flex;
    gap: 20px;
    align-items: center;
    div:nth-child(1) {
        max-width: 600px;
        flex: 1;
    }
`;
function CustomSearchAndFilter() {
    return (
        <SearchAndFilterContainer>
            <SearchBar />
            <Filters />
        </SearchAndFilterContainer>
    )
}

export default CustomSearchAndFilter