import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [interests, setInterests] = useState({
        subjects: [],
        exams: [],
        classes: []
    });
    const navigate = useNavigate();

    const subjects = ['Mathematics', 'Science', 'History', 'Geography', 'Economics', 'Polity', 'English', 'Reasoning'];
    const exams = ['SSC', 'UPSC', 'Banking', 'Railway', 'State PCS', 'JEE/NEET'];
    const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'College'];

    const toggleInterest = (category, item) => {
        setInterests(prev => ({
            ...prev,
            [category]: prev[category].includes(item)
                ? prev[category].filter(i => i !== item)
                : [...prev[category], item]
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            localStorage.setItem('onboarded', 'true');
            localStorage.setItem('userInterests', JSON.stringify(interests));
            navigate('/');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    const renderSelection = (category, items) => (
        <motion.div 
            key={category}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
        >
            <div className="grid grid-cols-2 gap-3">
                {items.map(item => (
                    <button
                        key={item}
                        onClick={() => toggleInterest(category, item)}
                        className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 haptic-feedback ${
                            interests[category].includes(item)
                                ? 'border-primary bg-primary/10 text-content'
                                : 'border-overlay/10 bg-overlay/40 text-content/50'
                        }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            interests[category].includes(item) ? 'bg-primary border-primary' : 'border-overlay/20'
                        }`}>
                            {interests[category].includes(item) && <Check size={14} className="text-white" />}
                        </div>
                        <span className="font-semibold text-sm">{item}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
            <div className="glow-background" />
            
            {/* Header */}
            <header className="pt-12 pb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-content">
                        Study<span className="text-primary italic">Vibe</span>
                    </h1>
                    <p className="text-content/40 mt-1 font-medium italic">Scroll. Solve. Succeed.</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step === i ? 'bg-primary w-10' : 'bg-overlay/10'}`} />
                    ))}
                </div>
            </header>

            <main className="flex-1 flex flex-col h-full">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-content mb-2 leading-tight">
                        {step === 1 && "What are you studying?"}
                        {step === 2 && "Targeting any exams?"}
                        {step === 3 && "Which class are you in?"}
                    </h2>
                    <p className="text-content/40 font-medium">Select one or more that apply to you.</p>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
                    <AnimatePresence mode="wait">
                        {step === 1 && renderSelection('subjects', subjects)}
                        {step === 2 && renderSelection('exams', exams)}
                        {step === 3 && renderSelection('classes', classes)}
                    </AnimatePresence>
                </div>
            </main>

            {/* Bottom Action */}
            <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface/80 to-transparent pt-12">
                <button
                    onClick={handleNext}
                    className="w-full btn-premium flex items-center justify-center gap-3 h-16"
                >
                    <span className="text-lg">
                        {step === 3 ? "Let's Start" : "Continue"}
                    </span>
                    <ChevronRight size={20} />
                </button>
            </footer>
        </div>
    );
};

export default OnboardingPage;
