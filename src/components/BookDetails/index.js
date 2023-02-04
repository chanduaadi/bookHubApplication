import {Component} from 'react'

import {BsFillStarFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetailsApi()
  }

  getBookDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.book_details
      const filteredData = {
        aboutAuthor: data.about_author,
        aboutBook: data.about_book,
        authorName: data.author_name,
        coverPic: data.cover_pic,
        id: data.id,
        rating: data.rating,
        readStatus: data.read_status,
        title: data.title,
      }

      this.setState({
        bookDetailsList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getBookDetailsApi()
  }

  renderBookDetails = () => {
    const {bookDetailsList} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetailsList

    return (
      <div className="book-details-card-container">
        <div className="book-details-card-info-container">
          <div className="book-details-image-details-container">
            <img className="book-details-img" src={coverPic} alt={title} />
            <div className="book-profile-info-container">
              <h1 className="book-detail-title-text">{title}</h1>
              <p className="book-detail-author-name">{authorName}</p>
              <div className="book-detail-rating-contianer">
                <p className="book-detail-rating-text">Avg Rating</p>
                <BsFillStarFill className="book-detail-star-icon" />
                <p className="book-detail-rating">{rating}</p>
              </div>
              <p className="book-detail-status">
                Status:{' '}
                <span className="book-detail-read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <h1 className="about-author-heading">About Author</h1>
          <p className="about-author-discription">{aboutAuthor}</p>
          <h1 className="about-author-heading">About Book</h1>
          <p className="about-author-discription">{aboutBook}</p>
        </div>
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
        return this.renderBookDetails()
      case apiStatusConstants.failure:
        return this.renderBooksFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPendingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-page-container">
        <Header />
        <div className="book-details-main-container">{this.renderSwitch()}</div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
