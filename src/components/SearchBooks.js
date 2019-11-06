import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import {DebounceInput} from 'react-debounce-input';
import Book from './Book'

const SearchBooks = (props) => {
    const { books, searching, query } = props.data

    const updateQuery = (query) => {
        props.onUpdateQuery(query)
        if(query.trim() !== '') {
            props.onSearchBooks(query)
        } else {
            props.onClearSearchBooks()
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        value={query}
                        minLength={1}
                        debounceTimeout={300}
                        onChange={(event) => updateQuery(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                {searching && (
                    <ReactLoading type="spinningBubbles" color="#444" delay={0} />
                )}
                {!searching && (
                    books && books.length? (
                        <ol className="books-grid">
                            {books.map((book) => (
                                <Book key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
                            ))}
                        </ol>
                    ) : (
                    <div>Nothing to show here.</div>
                    )
                )}
            </div>
        </div>
    )

}

SearchBooks.propTypes = {
    data: PropTypes.object.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onClearSearchBooks: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default SearchBooks
