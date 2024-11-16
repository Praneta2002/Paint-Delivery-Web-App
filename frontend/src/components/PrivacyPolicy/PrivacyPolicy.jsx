import React from 'react';
import './PrivacyPolicy.css'; // Import your CSS for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <header className="privacy-policy-header">
        <h1>Privacy Policy</h1>
      </header>
      <section className="privacy-policy-content">
        <h2>Introduction</h2>
        <p>
          At Kinnart, we are committed to safeguarding the privacy and security of your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or make a purchase.
        </p>

        <h2>What Information We Collect</h2>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Payment and transaction details</li>
          <li>Browser and device data</li>
          <li>Website usage information</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          The data we collect is used for the following purposes:
        </p>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To communicate with you about your orders, inquiries, or support requests</li>
          <li>To improve our website and services</li>
          <li>To provide personalized offers and promotions (with your consent)</li>
        </ul>

        <h2>How We Protect Your Information</h2>
        <p>
          We use a variety of security measures, including encryption and secure servers, to protect your personal information. We ensure that only authorized personnel have access to sensitive data, and we never share or sell your information with third parties without your consent.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to request access to the personal data we hold about you, request corrections or deletions, and opt out of any marketing communications. To exercise any of these rights, please contact us at support@kinnart.com.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies to improve your experience on our site. Cookies help us understand how visitors use our website, enabling us to provide personalized content and targeted promotions.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          Kinnart reserves the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and we encourage you to review our policy periodically to stay informed.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or how we handle your data, please reach out to us at:
        </p>
        <ul>
          <li>Email: support@kinnart.com</li>
          <li>Phone: +91 8258434571</li>
          <li>123 Elm Street, Springfield, IL 62704</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
