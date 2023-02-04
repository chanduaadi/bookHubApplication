import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookCardItem = props => {
  const {eachBook} = props
  const {authorName, coverPic, id, rating, readStatus, title} = eachBook
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-card-container">
        <img className="book-img" src={coverPic} alt={title} />
        <div className="book-details-container">
          <h1 className="book-title-text">{title}</h1>
          <p className="book-author-text">{authorName}</p>
          <div className="book-rating-contianer">
            <p className="book-rating-text">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="book-rating">{rating}</p>
          </div>
          <p className="book-status">
            Status: <span className="book-read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookCardItem
