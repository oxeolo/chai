import React, { Component } from 'react';
import './bookView.css';

import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';

const BookView = ({ small, color, open, linkTo = '' }) => (
    <div className={`bookView ${small && 'small'} ${open && 'open'}`}
    >
        <Link to={linkTo} />
        <div className='flippable'>
            <div className='bookCover'
                style={{ background: color }}
            >
                <div className='bookSpine' />
            </div>

            <div className='bookPage' />
            <div className='bookPage' />
            <div className='bookPage' />
            <div className='bookPage' />
            <div className='bookPage' />
            <div className='bookPage' />

            <div className='bookCover'
                style={{ background: color }}
            >
                <div className='bookSpine' />
            </div>
        </div>
    </div>
)

export const BooksView = ({ books }) => (
    <div className='booksView'>
        {
            books.map(book => (
                <div className='book'>
                    <BookView
                        linkTo={`/compose/${book.id}`}
                        color={book.color}
                    />
                    <div className='text'>
                        {book.title}
                    </div>
                </div>
            ))
        }
    </div>
)

export default BookView;