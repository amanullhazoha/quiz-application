import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useQuiz = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuiz() {
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${videoId}/questions`);
            const quizQuery = query(quizRef, orderByKey());

            try {
                setLoading(true);
                setError(false);
                const snapshot = await get(quizQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setQuestions((prevQuestions) => [
                        ...prevQuestions,
                        ...Object.values(snapshot.val()),
                    ]);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchQuiz();
    }, [videoId]);

    return {
        error,
        loading,
        questions,
    };
};

export default useQuiz;
