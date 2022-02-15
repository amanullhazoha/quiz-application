/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import classes from '../css/answers.module.css';
import CheckBox from './checkbox';

const Answers = ({ handelChange, options, input }) => (
    <div className="answers">
        {options.map((option, index) => (
            <Fragment key={index}>
                {input ? (
                    <CheckBox
                        className={classes.answer}
                        text={option.title}
                        key={index}
                        checked={option.checked}
                        onChange={(e) => handelChange(e, index)}
                    />
                ) : (
                    <CheckBox
                        className={`${classes.answer} ${
                            option.correct ? classes.correct : option.checked ? classes.wrong : null
                        }`}
                        text={option.title}
                        key={index}
                        defaultChecked={option.checked}
                        disabled
                    />
                )}
            </Fragment>
        ))}
    </div>
);

export default Answers;
