import React from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import {CURRENTLY_READING, WANT_TO_READ, READ} from "../utils/Consts";

const ListBooks = (props) => {
    let {books, onUpdateBook, onClickBtnAdd} = props

    let currentlyReading = books.filter((book) => book.shelf === CURRENTLY_READING.value)
    let wantToRead = books.filter((book) => book.shelf === WANT_TO_READ.value)
    let read = books.filter((book) => book.shelf === READ.value)

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>

                    <BookShelf title={CURRENTLY_READING.label} books={currentlyReading}
                               onUpdateBook={onUpdateBook}/>

                    <BookShelf title={WANT_TO_READ.label} books={wantToRead}
                               onUpdateBook={onUpdateBook}/>

                    <BookShelf title={READ.label} books={read}
                               onUpdateBook={onUpdateBook} />

                </div>
            </div>
            <div className="open-search">
                <a className='add-book' onClick={onClickBtnAdd}>Add a book</a>
            </div>
        </div>
    )

}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onClickBtnAdd: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default ListBooks
