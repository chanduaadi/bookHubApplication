import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675393500/Group_7484page-not-found_ix0ggj.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-discription">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="link">
      <button className="back-to-home-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
