/* eslint-disable react/no-array-index-key */
import classes from '../css/question.module.css';
import Answers from './answers';

const Question = ({ answers }) => {
    console.log(answers);
    return answers.map((answer, index) => (
        <div className={classes.question} key={index}>
            <div className={classes.qtitle}>
                <span className="material-icons-outlined"> help_outline </span>
                {answer.title}
            </div>
            <Answers options={answer.options} input={false} />
        </div>
    ));
};

export default Question;
