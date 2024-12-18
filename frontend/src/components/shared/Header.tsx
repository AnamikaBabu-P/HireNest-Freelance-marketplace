import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/userSlice';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('role') || 'guest';

  const getNavLinks = () => {
    if (userRole === "freelancer") {
      return (
        <>
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          <a href="/freelancer/task-list" className="text-gray-700 hover:text-blue-600">Find Work</a>
        </>
      );
    } else if (userRole === "client") {
      return (
        <>
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          <a href="/client/task-form" className="text-gray-700 hover:text-blue-600">Post Task</a>
          <a href="/client/freelancer-list" className="text-gray-700 hover:text-blue-600">Find Talent</a>
        </>
      );
    } else {
      return (
        <>
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          <a href="/client/freelancer-list" className="text-gray-700 hover:text-blue-600">Find Talent</a>
          <a href="/freelancer/task-list" className="text-gray-700 hover:text-blue-600">Find Work</a>
        </>
      );
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    dispatch(logoutUser())
    navigate('/login');
  };

  return (
    <header className="bg-white text-white w-10/12 shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6">
      <div className="flex justify-between items-center h-16">
        <div className="text-2xl font-bold flex items-center text-blue-600">
          <span className="mr-2">🔷</span> HireNest
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {getNavLinks()}
        </nav>

        {/* Auth Buttons for Guest */}
        {userRole === "guest" ? (
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="hover:text-blue-200 px-4 py-2 bg-blue-600 rounded-full"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <button className="relative hover:text-blue-200">🔔</button>
            <button className="relative hover:text-blue-200">✉️</button>
            <div className="relative" ref={profileMenuRef}>
              <img
                src="https://i.pinimg.com/474x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              />
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3"></span>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-md rounded-lg">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm">{localStorage.getItem('role')}</p>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/my-account')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden focus:outline-none text-blue-600"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-700 shadow-md p-4 absolute rounded-lg mt-2 top-full left-1/2 transform -translate-x-1/2 w-full">
          <div className="flex flex-col space-y-2">
            {getNavLinks()}
            {userRole === "guest" && (
              <>
                <a href="/login" className="block py-2 text-blue-600">Sign In</a>
                <a href="/register" className="block py-2 text-blue-600">Sign Up</a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
