import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.topRatedApiCall()
  }

  topRatedApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const filteredData = data.books.map(eachData => ({
        authorName: eachData.author_name,
        coverPic: eachData.cover_pic,
        id: eachData.id,
        title: eachData.title,
      }))

      this.setState({
        topRatedBooksList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.topRatedApiCall()
  }

  renderTopBooksList = () => {
    const {topRatedBooksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedBooksList.map(eachCard => (
          <div className="book-card-item-container" key={eachCard.id}>
            <div className="book-image-container">
              <Link to={`/books/${eachCard.id}`}>
                <img
                  className="book-image"
                  src={eachCard.coverPic}
                  alt="company logo"
                />
              </Link>
              <div className="book-details-container">
                <h1 className="book-title">{eachCard.title}</h1>
                <p className="book-author">{eachCard.authorName}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
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
        return this.renderTopBooksList()
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
      <div className="home-page-container">
        <Header />
        <div className="home-container">
          <div className="home-info-container">
            <h1 className="home-page-heading">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-page-discription">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="link">
              <button
                className="find-books-button sm-find-books-btn"
                type="button"
              >
                Find Books
              </button>
            </Link>
          </div>
          <div className="top-rated-books-container">
            <div className="top-rated-books-text-container">
              <h1 className="top-rated-text">Top Rated Books</h1>
              <Link to="/shelf">
                <button
                  className="find-books-button lg-find-books-btn"
                  type="button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            <div className="home-page-curosal-container">
              {this.renderSwitch()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
