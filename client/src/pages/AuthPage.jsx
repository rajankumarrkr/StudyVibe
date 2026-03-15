import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const AuthPage = ({ type }) => {
    const isLogin = type === 'login';
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login, register, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isLogin 
            ? await login(formData.email, formData.password)
            : await register(formData.name, formData.email, formData.password);
        
        if (success) navigate('/onboarding');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-surface">
            <div className="glow-background" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-premium-gradient rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-glow shadow-primary/40"
                    >
                        <h1 className="text-3xl font-black text-white italic">SV</h1>
                    </motion.div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-white">
                        Study<span className="text-primary italic">Vibe</span>
                    </h1>
                    <p className="text-white/30 font-bold uppercase tracking-widest text-[10px] mt-2">
                        {isLogin ? 'Ascend to Greatness' : 'Join the Elite Scholars'}
                    </p>
                </div>

                <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="relative group">
                                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-premium pl-14"
                                    placeholder="Full Name"
                                />
                            </div>
                        )}
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input-premium pl-14"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="input-premium pl-14"
                                placeholder="Password"
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 flex items-center justify-center gap-3 text-lg haptic-feedback h-16"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                        <p className="text-white/30 text-sm font-medium">
                            {isLogin ? "New to StudyVibe?" : "Already an elite?"}
                        </p>
                        <Link 
                            to={isLogin ? '/register' : '/login'} 
                            className="flex items-center gap-2 text-white font-black tracking-tight hover:text-primary transition-colors haptic-feedback px-6 py-2 rounded-full border border-white/5 bg-white/[0.02]"
                        >
                            {isLogin ? 'Build Profile' : 'Access Portal'} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
