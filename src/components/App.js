import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from '../utils/BooksAPI'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css'

import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import DetailBook from './DetailBook'

class BooksApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            searchBooks: {
                searching: false,
                query: '',
                books: []
            }
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(resp => {
            book.shelf = shelf
            this.setState(state => ({
                books: state.books.filter((b) => b.id !== book.id).concat([book])
            }))
            toast(`Book '${book.title}' moved successfully!`);
        })
    }

    searchBooks = (query) => {
        this.setState(state => ({
            searchBooks: { ...state.searchBooks, searching: true }
        }))
        BooksAPI.search(query.trim(), 20).then((serchedsBooks) => {
            var resultBooks = []
            if (Array.isArray(serchedsBooks)) {
                resultBooks = serchedsBooks.map(book => {
                    const found = this.state.books.find(b => b.id === book.id)
                    if(found){
                        book.shelf = found.shelf
                    } else {
                        book.shelf = 'none'
                    }
                    return book
                })
            }
            this.setState(state => ({
                searchBooks: { ...state.searchBooks, books: resultBooks, searching: false }
            }))
        }).catch(() => {
            toast('Failed to fetch');
            this.clearSearchBooks()
        })


    }

    updateQuery = (query) => {
        this.setState(state => ({
            searchBooks: { ...state.searchBooks, query: query }
        }))
    }

    clearSearchBooks = () => {
        this.setState(state => ({
            searchBooks: { query: '', books: [], searching: false }
        }))
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={({ history }) => (
                    <ListBooks books={this.state.books}
                               onClickBtnAdd={() => {
                                   this.clearSearchBooks()
                                   history.push('/search')
                               }}
                               onUpdateBook={this.updateBook} />
                )}/>
                <Route path='/search' render={() => (
                    <SearchBooks data={this.state.searchBooks}
                                 onUpdateQuery={this.updateQuery}
                                 onSearchBooks={this.searchBooks}
                                 onClearSearchBooks={this.clearSearchBooks}
                                 onUpdateBook={this.updateBook} />
                )} />
                <Route path='/books/:id' render={(props) => (
                    <DetailBook {...props} onUpdateBook={this.updateBook} />
                )} />

                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />

            </div>
        )
    }

}

export default BooksApp
