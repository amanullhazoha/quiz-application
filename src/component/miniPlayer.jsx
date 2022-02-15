/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../css/miniPlayer.module.css';

const MiniPlayer = ({ id, title }) => {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    const buttonToggle = () => {
        if (!status) {
            buttonRef.current.classList.remove(classes.floatingBtn);
            setStatus(true);
        } else {
            buttonRef.current.classList.add(classes.floatingBtn);
            setStatus(false);
        }
    };

    return (
        <div
            className={`${classes.miniPlayer} ${classes.floatingBtn}`}
            ref={buttonRef}
            onClick={buttonToggle}
        >
            <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={buttonToggle}>
                {' '}
                close{' '}
            </span>
            <ReactPlayer
                className={classes.player}
                url={videoUrl}
                width="300px"
                height="168px"
                playing={status}
                controls
            />
            <p>{title}</p>
        </div>
    );
};

export default MiniPlayer;
