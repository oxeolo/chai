import React from 'react';
import './booksPage.css';
import BookView, { BooksView } from '../../components/Books/views/BookView'
import PageLogoView from '../../components/UI/views/PageLogoView';
import { Colors } from '../../utils/colors';

const BooksPage = ({books}) => (
    <div className = 'booksPage'>
        <PageLogoView/>
        <BooksView
            books = {
                Object.values(books)
            }
        />
    </div>
)

export default BooksPage;