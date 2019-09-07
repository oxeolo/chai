import React, { Component , useState} from 'react';
import './titleView.css';
import BookView from '../../Books/views/BookView';
import { Colors } from '../../../utils/colors';
import Overdrive from 'react-overdrive';


const TitleView = ({ title, color }) => {
    const [isOpen, setIsOpen] = useState(false);

    setTimeout(() => setIsOpen(true), 100)

    return (<div className='titleView'>
        <BookView
            color={color}
            linkTo='/books'
            small
            open = {isOpen}
        />
        <div className='title'>
            {title}
        </div>
        <div className='divider' />
    </div>
    )
}

export default TitleView;