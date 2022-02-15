import classes from '../css/video.module.css';

const Video = ({ noq, title, id }) => (
    <div className={classes.video}>
        <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={id} />
        <p>{title}</p>
        <div className={classes.qmeta}>
            <p>{noq} Questions</p>
            <p>Score : {noq * 5}</p>
        </div>
    </div>
);

export default Video;
