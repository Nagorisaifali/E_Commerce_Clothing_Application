

import React from 'react';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-600">Need Help?</h1>

      <p className="text-lg mb-4">
        We're here to help! Whether you're facing issues placing an order, uploading a design, or have questions about our printing process — this page has you covered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">How to Get Support</h2>
      <p className="text-lg text-gray-700 mb-4">
        You can reach out to our customer support team at:
      </p>
      <p className="text-lg text-blue-600 font-medium mb-6">
        📧 Email: <a href="mailto:support@clothprintingapp.com" className="underline">support@clothprintingapp.com</a>
        
      </p>
      <p className="text-lg text-blue-600 font-medium">
        📞Phone: <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a>
        </p>

      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Frequently Asked Questions</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
        <li><strong>How do I upload my own design?</strong> <br />Go to the product page, click "Customize", and upload your design using the uploader tool.</li>
        <li><strong>Can I see a preview before ordering?</strong> <br />Yes! A live preview will show your design on the product before checkout.</li>
        <li><strong>What is the delivery time?</strong> <br />Most orders are printed and shipped within 3–5 business days.</li>
        <li><strong>Do you accept bulk or corporate orders?</strong> <br />Absolutely! Contact us via email and we’ll help you with discounts and support.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-800">Still Need Help?</h2>
      <p className="text-lg text-gray-700">
        Feel free to drop us an email anytime. We typically respond within 24 hours.
      </p>
    </div>
  );
};

export default Help;