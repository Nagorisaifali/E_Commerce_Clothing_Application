import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Us</h1>

      <p className="text-lg mb-4">
        Welcome to our Custom Clothes Printing App — your one-stop destination for personalized apparel! 
        Whether you're an individual looking to design your own t-shirt or a business aiming to create branded merchandise, 
        we've got you covered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>Choose from a wide range of apparel: t-shirts, hoodies, jackets, and more</li>
        <li>Upload your own designs or use our design tools</li>
        <li>Live mockup previews before you order</li>
        <li>Easy order placement and secure checkout</li>
        <li>Admin dashboard to manage inventory and orders</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Our Mission</h2>
      <p className="text-lg mb-4">
        Our goal is to make custom clothing accessible, affordable, and fun. 
        We empower creators and businesses to express themselves through high-quality printed apparel, 
        all from the convenience of a modern web application.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>User-friendly interface</li>
        <li>Fast turnaround time</li>
        <li>Top-quality printing</li>
        <li>Responsive customer support</li>
      </ul>
    </div>
  );
};

export default About;
