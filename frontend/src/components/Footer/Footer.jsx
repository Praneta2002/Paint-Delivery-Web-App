// import React from 'react'
// import './Footer.css'
// import { assets } from '../../assets/frontend_assets/assets'

// const Footer = () => {
//   return (
//     <div className='footer' id='footer'>
//       <div className="footer-content">
//         <div className="footer-content-left">
//             <img src={assets.logo} alt="" />
//             <p>123 Elm Street, Springfield, IL 62704</p>
//             <div className="footer-social-icons">
//                 <img src={assets.facebook_icon} alt="" />
//                 <img src={assets.twitter_icon} alt="" />
//                 <img src={assets.linkedin_icon} alt="" />
//             </div>
//         </div>
//         <div className="footer-content-center">
//             <h2>COMPANY</h2>
//             <ul>
//                 <li>Home</li>
//                 <li>About us</li>
//                 <li>Delivery</li>
//                 <li>Privacy Policy</li>
//             </ul>
//         </div>
//         <div className="footer-content-right">
//             <h2>GET IN TOUCH</h2>
//             <ul>
//                 <li>+91 8200434571</li>
//                 <li>kinnart2000@gmail.com</li>
//             </ul>
//         </div>
//       </div>
//       <hr />
//       <p className="footer-copyright">Copyright 2024 @ kinnart.com - All Right Reserved.</p>
//     </div>
//   )
// }

// export default Footer

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>123 Elm Street, Springfield, IL 62704</p>
            <div className="footer-social-icons">
                {/* <img src={assets.facebook_icon} alt="" /> */}
                <a href="https://www.instagram.com/kinn_art143?igsh=MTVwaGJucTU4MzJoYg==" target="_blank" rel="noopener noreferrer">
  <img src={assets.facebook_icon} alt="Instagram" />
  <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
</a>
                {/* <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" /> */}
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/about')}>About us</li>
                <li onClick={() => navigate('/delivery')}>Delivery</li>
                <li onClick={() => navigate('/privacy')}>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 8141629247</li>
                <li>kinnart2000@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ kinnart.com - All Right Reserved.</p>
    </div>
  );
};

export default Footer;

