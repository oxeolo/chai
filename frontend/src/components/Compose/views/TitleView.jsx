import React, { Component , useState} from 'react';
import './titleView.css';
import BookView from '../../Books/views/BookView';
import { Colors } from '../../../utils/colors';
import Overdrive from 'react-overdrive';


const TitleView = ({ name, color }) => {
    const [isOpen, setIsOpen] = useState(false);

    setTimeout(() => setIsOpen(true), 100)

    return (<div className='titleView'>
        <BookView
            color={color}
            linkTo='/app/books'
            small
            open = {isOpen}
        />
        <div className='title'>
            {name}
        </div>
        <div className='divider' />
    </div>
    )
}

export default TitleView;