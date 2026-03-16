import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../context/ThemeProvider';
import { Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';

const ProfilePage = () => {
    const { logout } = useAuthStore();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen pt-12 pb-32 px-6">
            <div className="glow-background" />
            
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-black text-content tracking-tighter">Profile</h1>
                <p className="text-content/30 text-sm font-bold uppercase tracking-widest mt-1">Manage your account</p>
            </header>

            <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mb-4 shadow-glow">
                    <UserIcon size={40} className="text-primary-300" />
                </div>
                <h2 className="text-xl font-bold text-content">Student User</h2>
            </div>
            
            <div className="glass-card p-2 mb-6">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5 rounded-2xl transition-colors haptic-feedback" onClick={toggleTheme}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-overlay/40 flex items-center justify-center text-content">
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <p className="font-bold text-content">Theme</p>
                            <p className="text-xs text-content/40">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-content/20'}`}>
                        <div className={`w-4 h-4 rounded-full bg-surface-nav transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </div>
                
                <div className="h-px bg-overlay/20 mx-4" />
                
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-red-500/5 rounded-2xl transition-colors haptic-feedback" onClick={logout}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                            <LogOut size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-red-500">Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
