import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from 'react';

const useVideoList = (page) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            // Data base related work
            const db = getDatabase();
            const videoRef = ref(db, 'videos');
            const videoQuery = query(videoRef, orderByKey(), startAt(`${page}`), limitToFirst(6));

            try {
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVides) => [...prevVides, ...Object.values(snapshot.val())]);
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchVideos();
    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore,
    };
};

export default useVideoList;
