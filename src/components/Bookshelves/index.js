import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import BookCardItem from '../BookCardItem'

import Header from '../Header'
import TabItems from '../TabItems'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    bookList: [],
    apiStatus: apiStatusConstants.initial,
    searchVal: '',
    selectedTab: 'ALL',
  }

  componentDidMount() {
    this.getBookShelvesList()
  }

  getBookShelvesList = async () => {
    const {selectedTab, searchVal} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${selectedTab}&search=${searchVal}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.books
      const updatedData = data.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        bookList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getBookShelvesList()
  }

  onChangeTab = value => {
    this.setState({selectedTab: value}, this.getBookShelvesList)
  }

  onChangeSearch = event => {
    this.setState({searchVal: event.target.value})
  }

  onSearch = () => {
    this.getBookShelvesList()
  }

  noBooksFound = () => {
    const {searchVal} = this.state
    return (
      <div className="loader-container">
        <img
          className="no-books-found-img"
          src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675395251/Asset_1_1no-books-found_nlinao.jpg"
          alt="no books"
        />
        <p className="book-not-found-discription">
          Your search for {searchVal} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookShelves = () => {
    const {bookList} = this.state
    if (bookList.length === 0) {
      return this.noBooksFound()
    }
    return (
      <div>
        <ul className="books-items-list-container">
          {bookList.map(eachBook => (
            <BookCardItem key={eachBook.id} eachBook={eachBook} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderPendingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksFailureView = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675306680/Group_7522failure-img_da9ccl.png"
        alt="failure view"
      />
      <p className="failure-view-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.onTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookShelves()
      case apiStatusConstants.failure:
        return this.renderBooksFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPendingView()
      default:
        return null
    }
  }

  getSelectedTab = value => {
    switch (value) {
      case 'ALL':
        return 'All'
      case 'READ':
        return 'Read'
      case 'CURRENTLY_READING':
        return 'Currently Reading'
      case 'WANT_TO_READ':
        return 'Want To Read'
      default:
        return null
    }
  }

  render() {
    const {selectedTab, searchVal} = this.state
    const selectTabItem = this.getSelectedTab(selectedTab)
    return (
      <div className="book-shelves-page-container">
        <Header />
        <div className="book-shelves-container">
          <div className="shelves-and-search-list-container">
            <div className="book-shelve-sm-search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchVal}
                onChange={this.onChangeSearch}
              />
              <button
                className="search-input-btn"
                type="button"
                onClick={this.onSearch}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="tab-items-container">
              <h1 className="tab-heading">Bookshelves</h1>
              <ul className="tab-items-list-contianer">
                {bookshelvesList.map(eachtab => (
                  <TabItems
                    key={eachtab.id}
                    eachtab={eachtab}
                    onChangeTab={this.onChangeTab}
                    isActive={selectedTab === eachtab.value}
                  />
                ))}
              </ul>
            </div>
            <div className="book-shelves-books-container">
              <div className="books-container">
                <div className="books-search-container">
                  <h1 className="books-list-heading">{`${selectTabItem} Books`}</h1>
                  <div className="search-input-lg-container">
                    <input
                      type="search"
                      className="search-input"
                      placeholder="Search"
                      value={searchVal}
                      onChange={this.onChangeSearch}
                    />
                    <button
                      className="search-input-btn"
                      type="button"
                      onClick={this.onSearch}
                      testid="searchButton"
                    >
                      <BsSearch className="search-icon" />
                    </button>
                  </div>
                </div>
                {this.renderSwitch()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
