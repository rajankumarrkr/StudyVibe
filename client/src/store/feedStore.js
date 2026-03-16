import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const useFeedStore = create((set, get) => ({
    questions: [],
    loading: false,
    hasMore: true,
    page: 0,

    fetchQuestions: async (reset = false) => {
        if (get().loading || (!get().hasMore && !reset)) return;
        
        set({ loading: true });
        try {
            const page = reset ? 0 : get().page;
            const res = await api.get(`/questions?limit=10&skip=${page * 10}`);
            const newQuestions = res.data;
            
            set({
                questions: reset ? newQuestions : [...get().questions, ...newQuestions],
                page: page + 1,
                hasMore: newQuestions.length === 10,
                loading: false
            });
        } catch (err) {
            console.error('Fetch questions failed', err);
            set({ loading: false });
        }
    },

    submitAttempt: async (questionId, selectedAnswer, isCorrect) => {
        const token = localStorage.getItem('token');
        try {
            await api.post('/questions/attempt', { 
                questionId, 
                selectedAnswer, 
                isCorrect 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error('Submit attempt failed', err);
        }
    }
}));
