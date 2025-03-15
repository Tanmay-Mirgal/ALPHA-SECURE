import FAQ from '../../components/FAQ/FAQ';
import React from 'react';

const Home = () => {
  return (
    <>
      <div className="relative z-10 max-w-screen-xl flex items-center justify-between px-8 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 bg-gray-900 text-white">
        {/* Left Side - Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Make Better <br />
            Investment <br />
            Decisions With <br />
            Alternative Data
          </h2>
          <p className="text-lg text-gray-400">
            Get the inside scoop on companies like never before.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg mt-4 transition-colors">
            Get Started
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="max-w-lg">
          <img src="image.png" alt="Stock Data Visualization" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="relative z-10 max-w-screen-xl flex items-center justify-between px-8 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-lg">
          <img src="img2.jpg" alt="Stock Data Visualization" className="rounded-lg shadow-lg" />
        </div>
        {/* Left Side - Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Make Better <br />
            Investment <br />
            Decisions With <br />
            Alternative Data
          </h2>
          <p className="text-lg text-gray-400">
            Get the inside scoop on companies like never before.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-screen-xl flex items-center justify-between px-8 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 bg-gray-900 text-white">
        {/* Left Side - Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Make Better <br />
            Investment <br />
            Decisions With <br />
            Alternative Data
          </h2>
          <p className="text-lg text-gray-400">
            Get the inside scoop on companies like never before.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="max-w-lg">
          <img src="img3.jpg" alt="Stock Data Visualization" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="relative z-10 max-w-screen-xl flex items-center justify-between px-8 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-lg">
          <img src="img4.jpg" alt="Stock Data Visualization" className="rounded-lg shadow-lg" />
        </div>
        {/* Left Side - Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Make Better <br />
            Investment <br />
            Decisions With <br />
            Alternative Data
          </h2>
          <p className="text-lg text-gray-400">
            Get the inside scoop on companies like never before.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-screen-xl flex items-center justify-between px-8 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 bg-gray-900 text-white">
        {/* Left Side - Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Make Better <br />
            Investment <br />
            Decisions With <br />
            Alternative Data
          </h2>
          <p className="text-lg text-gray-400">
            Get the inside scoop on companies like never before.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="max-w-lg">
          <img src="img5.jpg" alt="Stock Data Visualization" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className='flex flex-col text-center justify-center items-center bg-gray-900'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-6xl text-white'>What clients say about <br />Stocker</h2>
        <p className='text-white text-lg mt-6'>Stocker solves business problems from</p>
        <p className='text-white text-lg'>simple to complex</p>
        
        {/* Testimonial Section */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="p-6 border border-gray-700 rounded-lg shadow-md bg-gray-800 hover:bg-gray-750 transition-all">
              <div className="flex items-center mb-4">
                <img src="image-removebg-preview.png" alt="Isabelle O'Connor" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Isabelle O'Connor</h4>
                  <p className="text-gray-200 text-sm">Business Analyst at Robin</p>
                </div>
              </div>
              <p className="text-gray-400">
                "AltIndex helped us reach more potential clients that we never thought we could reach via the website. Great work!"
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-green-500 text-xl">★</span>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 border border-gray-700 rounded-lg shadow-md bg-gray-800 hover:bg-gray-750 transition-all">
              <div className="flex items-center mb-4">
                <img src="image-removebg-preview.png" alt="Gail Hilport" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Gail Hilport</h4>
                  <p className="text-gray-200 text-sm">Business Analyst at Domino</p>
                </div>
              </div>
              <p className="text-gray-400">
                "AltIndex helped us reach more potential clients that we never thought we could reach via the website. Great work!"
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-green-500 text-xl">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FAQ/>
      
     
    </>
  );
};

export default Home;