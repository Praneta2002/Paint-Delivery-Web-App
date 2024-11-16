import React from 'react';
import './Delivery.css'; // Import your CSS for styling

const Delivery = () => {
  return (
    <div className="delivery">
      <header className="delivery-header">
        <h1>Shipping & Packaging</h1>
      </header>
      <section className="delivery-content">
        <h2>Shipping Information</h2>
        <p>
          At Kinnart, we take great care in delivering your artwork safely and on time. We partner with leading logistics companies to ensure fast and reliable delivery across India and internationally.
        </p>

        <h2>Domestic Shipping</h2>
        <p>
          We offer free shipping across India for all orders. Orders are typically processed within 1-2 business days and delivered within 5-7 business days, depending on the location.
        </p>
        
        <h2>International Shipping</h2>
        <p>
          For international orders, shipping fees vary based on the destination and weight of the package. We strive to offer competitive rates, and all international shipments are securely packaged to ensure the safety of your artwork during transit. Delivery timelines may vary between 10-15 business days depending on the location.
        </p>

        <h2>Packaging</h2>
        <p>
          All artworks are carefully packaged with protective materials to ensure they arrive in perfect condition. Our packaging methods are designed to protect against damages during transit. We use eco-friendly materials wherever possible.
        </p>

        <h2>Tracking Your Order</h2>
        <p>
          Once your order has been shipped, you will receive a confirmation email with a tracking number so you can follow your package's journey to your door.
        </p>

        <h2>Delivery Timelines</h2>
        <p>
          Domestic deliveries within India typically take 5-7 business days. International deliveries may take 10-15 business days, depending on the destination. Please note that delivery times may be extended during holiday seasons or due to unforeseen delays.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about your delivery or need assistance tracking your order, please feel free to contact us at support@kinnart.com or call us at +91 8200434571.
        </p>
      </section>
    </div>
  );
};

export default Delivery;
