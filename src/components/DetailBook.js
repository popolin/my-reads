import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';
import * as BooksAPI from '../utils/BooksAPI'

class DetailBook extends Component {

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        book: {},
        loaded: false
    }

    componentDidMount() {
        BooksAPI.get(this.props.match.params.id)
            .then(
                book => {
                    this.setState({book, loaded: true})
                });
    }

    onChangeBookShelf = (e) => {
        this.props.onUpdateBook(this.state.book, e.target.value)
    }

    goBack = () => {
        if(this.props.history.length > 1) {
            this.props.history.goBack()
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        const { book } = this.state
        const { title, authors = [], shelf = 'none', description, language = '', publisher = ''} = book
        return (
            this.state.loaded ? (
                <div>

                    <div className='top-bar'>
                        <a className='btn-back' onClick={this.goBack}>Voltar</a>
                    </div>

                    <div className='book-content'>
                        <div className="book">

                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={shelf} onChange={this.onChangeBookShelf}>
                                        <option value="moveTo" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='book-detail'>
                            <div><b>Title:</b> {title}</div>
                            <div><b>Authors:</b> {authors.length === 0 ? '--' : authors.join(", ")}</div>
                            <div><b>Publisher:</b> {publisher}</div>
                            <div><b>Description:</b> {description}</div>
                            <div><b>Language:</b> {language}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <ReactLoading type="spinningBubbles" color="#444" delay={0} />
            )
        )
    }

}

export default DetailBook
