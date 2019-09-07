import React from 'react';
import './composePage.css';
import TitleView from '../../components/Compose/views/TitleView';
import ComposeContainer from '../../components/Compose/containers/ComposeContainer';
import StatusContainer from '../../components/Compose/containers/StatusContainer';


const ComposePage = ({books, match}) => {
    const book = books[match.params.id];
    return(
        <div className = 'composePage'>
            <TitleView
                title = {book.title}
                color = {book.color}
            />
            <ComposeContainer/>
            <StatusContainer/>
        </div>
    )
}
export default ComposePage;