import * as React from 'react';
import './linksearch.css';

interface LinkSearchProps {
    inputChange: Function;
}

interface LinkSearchState {}

class LinkSearch extends React.Component <LinkSearchProps, LinkSearchState> {

    render() {
        return (
        <div>
            <input type="text" onChange={(e)=>this.props.inputChange(e)} placeholder="Search Title / #Tag"/>
        </div>
        );
    }
}

export default LinkSearch;