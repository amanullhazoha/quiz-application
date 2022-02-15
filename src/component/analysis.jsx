import classes from '../css/analysis.module.css';
import Question from './question';

const Analysis = ({ answers }) => (
    <div className={classes.analysis}>
        <h1>Question Analysis</h1>

        <Question answers={answers} />
    </div>
);

export default Analysis;
