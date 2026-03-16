import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Bookmark, Share2, MoreVertical, MessageCircle } from 'lucide-react';
import { useFeedStore } from '../store/feedStore';

const MCQCard = ({ question }) => {
    const [selected, setSelected] = useState(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const { submitAttempt } = useFeedStore();

    const handleSelect = (optionKey, optionValue) => {
        if (isRevealed) return;
        
        const isCorrect = optionKey === question.correctAnswer;
        setSelected(optionKey);
        setIsRevealed(true);
        
        submitAttempt(question._id, optionValue, isCorrect);
    };

    const options = [
        { key: 'A', value: question.optionA },
        { key: 'B', value: question.optionB },
        { key: 'C', value: question.optionC },
        { key: 'D', value: question.optionD },
    ];

    return (
        <div className="reel-item flex flex-col items-center justify-center px-4 py-8">
            <div className="glow-background" />
            
            <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                className="w-full max-w-md glass-card p-8 relative flex flex-col min-h-[75vh]"
            >
                {/* Floating Side Actions */}
                <div className="absolute right-[-10px] bottom-32 flex flex-col gap-6 z-10">
                    <button className="w-12 h-12 rounded-full glass-card backdrop-blur-xl border border-overlay/20 flex items-center justify-center text-content/70 haptic-feedback">
                        <Bookmark size={22} />
                    </button>
                    <button className="w-12 h-12 rounded-full glass-card backdrop-blur-xl border border-overlay/20 flex items-center justify-center text-content/70 haptic-feedback">
                        <MessageCircle size={22} />
                    </button>
                    <button className="w-12 h-12 rounded-full glass-card backdrop-blur-xl border border-overlay/20 flex items-center justify-center text-content/70 haptic-feedback">
                        <Share2 size={22} />
                    </button>
                    <button className="w-12 h-12 rounded-full glass-card backdrop-blur-xl border border-overlay/20 flex items-center justify-center text-content/70 haptic-feedback">
                        <MoreVertical size={22} />
                    </button>
                </div>

                {/* Top Metadata */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-premium-gradient flex items-center justify-center font-bold text-white shadow-glow">
                        {question.subject[0]}
                    </div>
                    <div>
                        <span className="block text-sm font-bold text-content tracking-wide uppercase">{question.subject}</span>
                        <span className="text-xs text-content/30 font-medium">{question.exam || 'General'}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 mb-8 overflow-y-auto hide-scrollbar">
                    <h2 className="text-2xl md:text-3xl font-bold leading-[1.3] text-content tracking-tight">
                        {question.question}
                    </h2>
                </div>

                {/* Options Grid */}
                <div className="space-y-3.5">
                    {options.map((option, index) => {
                        const isSelected = selected === option.key;
                        const isCorrect = isRevealed && option.key === question.correctAnswer;
                        const isWrong = isRevealed && isSelected && option.key !== question.correctAnswer;

                        return (
                            <motion.button
                                key={option.key}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleSelect(option.key, option.value)}
                                disabled={isRevealed}
                                className={`w-full group relative flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 haptic-feedback ${
                                    isCorrect 
                                        ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                                        : isWrong 
                                            ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                            : isSelected
                                                ? 'bg-primary/20 border-primary/50 text-primary-300'
                                                : 'bg-overlay/40 border-overlay/20 text-content/60 hover:bg-overlay/60 hover:border-overlay/40'
                                } border-2`}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 rounded-lg border-2 font-black text-xs transition-all ${
                                    isCorrect ? 'bg-green-500 border-green-500 text-white' : 
                                    isWrong ? 'bg-red-500 border-red-500 text-white' : 
                                    isSelected ? 'bg-primary border-primary text-white' :
                                    'border-overlay/40 text-content/20'
                                }`}>
                                    {option.key}
                                </div>
                                <span className="flex-1 font-bold tracking-tight text-[15px]">{option.value}</span>
                                {isCorrect && <Check size={18} className="text-green-400" />}
                                {isWrong && <X size={18} className="text-red-400" />}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Feedback Panel */}
                <AnimatePresence>
                    {isRevealed && question.explanation && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mt-6 pt-6 border-t border-overlay/10"
                        >
                            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                                <p className="text-xs font-black uppercase tracking-widest text-primary/60 mb-2">Deep Dive</p>
                                <p className="text-[13px] text-content/50 leading-relaxed font-medium">
                                    {question.explanation}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default MCQCard;
