import React from 'react';
import './SearchBar.css'
import SearchBar from 'material-ui-search-bar'
import axios from 'axios';

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState('')

    async function search() {
        sessionStorage.setItem('searchTerm', searchTerm)
        window.location = '/search_results'
    }

    return (
        <SearchBar
            value={searchTerm}
            placeHolder="Search"
            onChange={e => setSearchTerm(e)}
            onRequestSearch={search}
            style={{
                marginRight: '5vw',
            }} />
    )
}

export default Search