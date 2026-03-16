import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, Flame, PlusCircle, Bookmark, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="nav-pill">
            <NavLink to="/" className={({isActive}) => `p-3 rounded-2xl transition-all haptic-feedback ${isActive ? 'bg-primary text-white shadow-glow translate-y-[-10px]' : 'text-content/30 hover:text-content/60'}`}>
                <Flame size={24} strokeWidth={2.5} />
            </NavLink>
            <NavLink to="/upload" className={({isActive}) => `p-3 rounded-2xl transition-all haptic-feedback ${isActive ? 'bg-primary text-white shadow-glow translate-y-[-10px]' : 'text-content/30 hover:text-content/60'}`}>
                <PlusCircle size={24} strokeWidth={2.5} />
            </NavLink>
            <NavLink to="/dashboard" className={({isActive}) => `p-3 rounded-2xl transition-all haptic-feedback ${isActive ? 'bg-primary text-white shadow-glow translate-y-[-10px]' : 'text-content/30 hover:text-content/60'}`}>
                <LayoutGrid size={24} strokeWidth={2.5} />
            </NavLink>
            <NavLink to="/bookmarks" className={({isActive}) => `p-3 rounded-2xl transition-all haptic-feedback ${isActive ? 'bg-primary text-white shadow-glow translate-y-[-10px]' : 'text-content/30 hover:text-content/60'}`}>
                <Bookmark size={24} strokeWidth={2.5} />
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => `p-3 rounded-2xl transition-all haptic-feedback ${isActive ? 'bg-primary text-white shadow-glow translate-y-[-10px]' : 'text-content/30 hover:text-content/60'}`}>
                <User size={24} strokeWidth={2.5} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
