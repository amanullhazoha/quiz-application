import { useState } from 'react';
import InfifiteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hook/useVideoList';
import Video from './video';

const Videos = () => {
    const [page, setPage] = useState(1);
    const { error, loading, videos, hasMore } = useVideoList(page);

    return (
        <div>
            {videos.length > 0 && (
                <InfifiteScroll
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage(page + 6)}
                >
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link
                                to={`/quiz/${video.youtubeID}`}
                                state={{ videoTitle: video.title }}
                                key={video.youtubeID}
                            >
                                <Video title={video.title} id={video.youtubeID} noq={video.noq} />
                            </Link>
                        ) : (
                            <Video
                                title={video.title}
                                key={video.youtubeID}
                                id={video.youtubeID}
                                noq={video.noq}
                            />
                        )
                    )}
                </InfifiteScroll>
            )}

            {!loading && videos.length === 0 && <div> No data found!</div>}
            {error && <div>There was an error!</div>}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Videos;
