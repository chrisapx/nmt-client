import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <img 
          src="https://illustrations.popsy.co/white/resistance-band.svg" 
          alt="Not Found" 
          className="w-64 mx-auto mt-6"
        />

        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;