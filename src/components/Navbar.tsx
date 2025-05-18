import { Book, Home, Info, Mail, LogIn, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8" />
            <span className="text-xl font-bold">BookMind</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            {user && (
              <>
                <Link to="/favorites" className="flex items-center space-x-1 hover:text-purple-200 transition">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                <Link to="/reading-list" className="flex items-center space-x-1 hover:text-purple-200 transition">
                  <BookOpen className="h-5 w-5" />
                  <span>Reading List</span>
                </Link>
              </>
            )}
            <Link to="/about" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </Link>
            
            {user ? (
              <ProfileMenu />
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}