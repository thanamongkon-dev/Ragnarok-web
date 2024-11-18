import { useState } from 'react';
import useEncryption from '../hooks/useEncryption'; // Import the custom hook
import useDonate from '../hooks/useDonate';

const Card = ({ title, price, features, buttonText, itemId }) => {
  const { Package, loading, error } = useDonate();

  const [quantity, setQuantity] = useState(1);
  const [realPrice, setRealPrice] = useState(price);

  const handleButtonClick = () => {
    Package(realPrice, price, quantity, itemId);
  };

  // Update realPrice when quantity changes
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10); // Get the input value directly
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      setRealPrice(newQuantity * price);
    }
  };

  return (
    <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-fit">
      <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden bg-white shadow-md">
        <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
          {title}
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-5xl pb-4 mb-4 border-b border-gray-800 leading-none">
          {realPrice}฿
        </h1>
        <div className='flex-grow'>
          {features.map((feature, index) => (
            <p key={index} className="flex items-center text-black mb-2">
              <span className="w-8 h-8 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                <img
                  src={`https://www.divine-pride.net/img/items/item/thROG/${feature.itemId}`}
                  alt=""
                />
              </span>
              {feature.item}
            </p>
          ))}
        </div>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="จำนวนที่ต้องการซื้อ"
          className="w-full p-2 my-4 border border-gray-400 rounded mt-auto"
        />
        <button 
          onClick={handleButtonClick} 
          disabled={loading} 
          className="flex items-center justify-center mt-auto text-white bg-green-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-500 rounded"
        >
          {buttonText}
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <path
              d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <path
              d="M11 10.8L12.1429 12L15 9"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
