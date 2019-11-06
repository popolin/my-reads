import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {
    let {title, books, onUpdateBook} = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
                    ))}
                </ol>
            </div>
        </div>
    )

}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default BookShelf
