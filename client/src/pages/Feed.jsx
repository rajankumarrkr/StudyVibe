import React, { useEffect } from 'react';
import { useFeedStore } from '../store/feedStore';
import MCQCard from '../components/MCQCard';
import { Loader2, Search } from 'lucide-react';

const Feed = () => {
    const { questions, fetchQuestions, loading, hasMore } = useFeedStore();

    useEffect(() => {
        fetchQuestions(true);
    }, []);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
            fetchQuestions();
        }
    };

    return (
        <div className="relative">
            {/* Top Bar Overlay */}
            <div className="fixed top-0 left-0 right-0 p-6 z-20 flex justify-between items-center pointer-events-none">
                <h2 className="text-xl font-black text-content pointer-events-auto">For You</h2>
                <button className="w-10 h-10 rounded-full glass-card border border-overlay/10 flex items-center justify-center text-content pointer-events-auto">
                    <Search size={20} />
                </button>
            </div>

            <div 
                onScroll={handleScroll}
                className="reels-container"
            >
                {questions.map((q, index) => (
                    <MCQCard key={q._id + index} question={q} />
                ))}

                {loading && (
                    <div className="reel-item flex items-center justify-center text-primary">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                )}

                {!loading && questions.length === 0 && (
                    <div className="reel-item flex items-center justify-center text-content/30 px-12 text-center">
                        <div>
                            <p className="text-2xl font-bold mb-2">No more vibes</p>
                            <p className="text-sm">Check back later for new questions!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
