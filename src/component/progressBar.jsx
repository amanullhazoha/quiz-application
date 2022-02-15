/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useRef, useState } from 'react';
import classes from '../css/progressBar.module.css';
import Button from './button';

const ProgressBar = ({ handelNext, handelPrev, progress, handelSubmit }) => {
    const tooltip = useRef();
    const [toggler, setToggler] = useState(false);

    const handelToggle = () => {
        if (toggler) {
            setToggler(false);
            tooltip.current.style.display = 'none';
        } else {
            setToggler(true);
            tooltip.current.style.left = `calc(${progress}% - 65px)`;
            tooltip.current.style.display = 'block';
        }
    };

    return (
        <div className={classes.progressBar}>
            <Button className={classes.backButton} type="button" onClick={handelPrev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </Button>
            <div className={classes.rangeArea}>
                <div className={classes.tooltip} ref={tooltip}>
                    {progress}% Cimplete!
                </div>
                <div className={classes.rangeBody}>
                    <div
                        className={classes.progress}
                        style={{ width: `${progress}%` }}
                        onMouseOut={handelToggle}
                        onMouseOver={handelToggle}
                    />
                </div>
            </div>
            <Button
                type="button"
                className={classes.next}
                onClick={progress === 100 ? handelSubmit : handelNext}
            >
                <span>Next Question</span>
                <span className="material-icons-outlined"> arrow_forward </span>
            </Button>
        </div>
    );
};

export default ProgressBar;
