import { useEffect, useState } from 'react';

const useFatch = (url, method, headers) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const requestFetch = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch(url, { method, headers });
                const data = await response.json();
                setLoading(false);
                setResult(data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        requestFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        result,
        error,
        loading,
    };
};

export default useFatch;
