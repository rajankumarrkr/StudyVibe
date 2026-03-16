import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, CheckCircle, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import axios from 'axios';

const UploadPage = () => {
    const [mode, setMode] = useState('manual');
    const [formData, setFormData] = useState({
        question: '', optionA: '', optionB: '', optionC: '', optionD: '',
        correctAnswer: 'A', subject: '', explanation: ''
    });

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/questions', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Question added to your feed! ✨');
            setFormData({
                question: '', optionA: '', optionB: '', optionC: '', optionD: '',
                correctAnswer: 'A', subject: '', explanation: ''
            });
        } catch (err) { console.error(err); }
    };

    return (
        <div className="min-h-screen pt-12 pb-32 px-6">
            <div className="glow-background" />

            <header className="mb-10 text-center">
                <div className="inline-flex p-1.5 glass-card rounded-2xl mb-8">
                    <button 
                        onClick={() => setMode('manual')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all haptic-feedback ${mode === 'manual' ? 'bg-primary text-white shadow-glow' : 'text-content/30'}`}
                    >
                        <Plus size={16} /> Manual
                    </button>
                    <button 
                        onClick={() => setMode('ocr')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all haptic-feedback ${mode === 'ocr' ? 'bg-primary text-white shadow-glow' : 'text-content/30'}`}
                    >
                        <Sparkles size={16} /> AI Photo
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {mode === 'manual' ? (
                    <motion.form 
                        key="manual"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleManualSubmit} 
                        className="space-y-6"
                    >
                        <div className="glass-card p-8 border-none bg-overlay/40">
                            <h3 className="text-xl font-black text-content mb-8 flex items-center gap-2">
                                <FileText className="text-primary-300" /> New Challenge
                            </h3>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 ml-1">Question Body</label>
                                    <textarea required value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} className="input-premium min-h-[140px] resize-none" placeholder="Draft your question here..." />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <div key={opt}>
                                            <input required value={formData[`option${opt}`]} onChange={(e) => setFormData({...formData, [`option${opt}`]: e.target.value})} className="input-premium py-3 text-sm" placeholder={`Option ${opt}`} />
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <select value={formData.correctAnswer} onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})} className="input-premium py-3 text-sm appearance-none bg-surface/50">
                                        <option value="A">Answer: A</option>
                                        <option value="B">Answer: B</option>
                                        <option value="C">Answer: C</option>
                                        <option value="D">Answer: D</option>
                                    </select>
                                    <input required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="input-premium py-3 text-sm" placeholder="Subject" />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 ml-1">Explanation (Optional)</label>
                                    <textarea value={formData.explanation} onChange={(e) => setFormData({...formData, explanation: e.target.value})} className="input-premium py-3 text-sm min-h-[80px]" placeholder="Why is this answer correct?" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-premium py-5 text-lg flex items-center justify-center gap-3">
                            <CheckCircle size={24} /> <span>Deploy Question</span>
                        </button>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="ocr"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-32 h-32 rounded-[2.5rem] bg-premium-gradient flex items-center justify-center mb-8 shadow-glow overflow-hidden relative group">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Upload size={56} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-content mb-3">Vision Scan</h2>
                        <p className="text-content/30 font-bold max-w-xs mb-10 leading-relaxed">
                            Upload a textbook shot. Our <span className="text-primary-300">Neural Engine</span> will extract the MCQ instantly.
                        </p>
                        
                        <input type="file" className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="px-10 py-5 glass-card border-primary/20 bg-primary/5 cursor-pointer transition-all font-black text-content hover:bg-primary/10 tracking-tight active:scale-95 flex items-center gap-3">
                            <ImageIcon size={20} /> Select from Gallery
                        </label>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UploadPage;
