import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, CheckCircle2, Zap, Trophy, History, BookMarked } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ attempted: 0, correct: 0, wrong: 0, accuracy: 0 });
    const [subjectData, setSubjectData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const [dailyRes, subjectRes] = await Promise.all([
                    axios.get(`${apiUrl}/stats/daily`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${apiUrl}/stats/subject`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setStats(dailyRes.data);
                setSubjectData(subjectRes.data);
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Today Streak', value: stats.attempted, icon: <Zap size={20} />, trend: '+12%', color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-400' },
        { label: 'Accuracy', value: `${stats.accuracy}%`, icon: <Target size={20} />, trend: 'Top 5%', color: 'from-primary/20 to-primary/5', iconColor: 'text-primary-300' },
        { label: 'Solved', value: stats.correct, icon: <CheckCircle2 size={20} />, trend: 'Keep it up!', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-400' },
        { label: 'Leaderboard', value: '#124', icon: <Trophy size={20} />, trend: 'Regional', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400' },
    ];

    return (
        <div className="min-h-screen pt-12 pb-32 px-6">
            <div className="glow-background" />
            
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-content tracking-tighter">My Progress</h1>
                    <p className="text-content/30 text-sm font-bold uppercase tracking-widest mt-1">Season 1 • Sprint Analyst</p>
                </div>
                <div className="flex gap-2">
                    <button className="w-11 h-11 glass-card border-none flex items-center justify-center text-content/50 haptic-feedback">
                        <History size={20} />
                    </button>
                    <button className="w-11 h-11 glass-card border-none flex items-center justify-center text-content/50 haptic-feedback">
                        <BookMarked size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-4 mb-10">
                {cards.map((card, i) => (
                    <motion.div 
                        key={card.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-[2rem] bg-gradient-to-br ${card.color} border border-overlay/10 haptic-feedback`}
                    >
                        <div className={`w-10 h-10 rounded-xl bg-overlay/40 flex items-center justify-center mb-4 ${card.iconColor}`}>
                            {card.icon}
                        </div>
                        <p className="text-content/30 text-xs font-black uppercase tracking-widest mb-1">{card.label}</p>
                        <p className="text-2xl font-black text-content">{card.value}</p>
                        <p className={`text-[10px] font-bold mt-2 ${card.iconColor}`}>{card.trend}</p>
                    </motion.div>
                ))}
            </div>

            <section className="glass-card p-8 mb-8">
                <h3 className="text-lg font-black text-content mb-8 tracking-tight">Subject Proficiency</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={subjectData}>
                            <XAxis dataKey="_id" stroke="rgb(var(--color-content) / 0.2)" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                            <Tooltip 
                                cursor={{ fill: 'rgb(var(--color-content) / 0.05)' }}
                                contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgb(var(--color-overlay) / 0.1)', borderRadius: '16px', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="correct" radius={[8, 8, 8, 8]} barSize={32}>
                                {subjectData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6C4EFF' : '#3B82F6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center mb-3 shadow-glow">
                        <span className="text-md font-black text-content">{stats.accuracy}%</span>
                    </div>
                    <p className="text-xs font-bold text-content/40">Global Rank</p>
                </div>
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Zap size={24} className="text-primary-300" />
                    </div>
                    <p className="text-xs font-bold text-content/40">7 Day Active</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
