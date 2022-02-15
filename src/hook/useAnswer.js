import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useAnswer = (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAswer = async () => {
            const db = getDatabase();
            const answerRef = ref(db, `answers/${id}/questions`);
            const answerQuery = query(answerRef, orderByKey());
            setLoading(false);

            try {
                setLoading(true);
                setError(false);
                const snapshot = await get(answerQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => [...prevAnswers, ...Object.values(snapshot.val())]);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchAswer();
    }, [id]);

    return {
        loading,
        error,
        answers,
        setAnswers,
    };
};

export default useAnswer;
