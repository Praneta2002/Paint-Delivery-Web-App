import React from 'react';
import './AboutUs.css'; // Import your CSS for styling
// import teamPhoto from '../../assets/images/team-photo.jpg'; // Example image
// import missionImage from '../../assets/images/mission-image.jpg'; // Example image
import { assets } from '../../assets/frontend_assets/assets';
// import team_photo from '../../assets/admin_assets/assets/'

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>We are committed to delivering high-quality art materials and an exceptional experience to our customers.</p>
      </header>
      {/* <section className="about-us-mission">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            At Kinnart, our mission is to inspire creativity and support artists of all levels. We carefully curate our selection of products to ensure quality and affordability, helping you create your best work.
          </p>
        </div>
        <img src={missionImage} alt="Our Mission" />
      </section> */}
      <section className="about-us-team">
        <h2>Meet the Team</h2>
        <div className="team-content">
          <img src={assets.team_photo} alt="Our Team" />
          <div className="team-info">
            <p>
              Our team is passionate about art and dedicated to providing excellent customer service. We bring together a diverse set of skills and experiences to ensure that every artist's needs are met.
            </p>
          </div>
        </div>
      </section>
      <footer className="about-us-footer">
        <p>Thank you for choosing Kinnart. We look forward to being part of your creative journey!</p>
      </footer>
    </div>
  );
};

export default AboutUs;
