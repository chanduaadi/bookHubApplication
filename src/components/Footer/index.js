import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-contianer">
    <ul className="footer-list-container">
      <li>
        <FaGoogle className="footer-item" />
      </li>
      <li>
        <FaTwitter className="footer-item" />
      </li>
      <li>
        <FaInstagram className="footer-item" />
      </li>
      <li>
        <FaYoutube className="footer-item" />
      </li>
    </ul>
    <p className="footer-para-item">Contact Us</p>
  </div>
)

export default Footer
