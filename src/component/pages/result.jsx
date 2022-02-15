/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import useAnswer from '../../hook/useAnswer';
import Analysis from '../analysis';
import Summary from '../summary';

const Reuslt = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { answers, loading, error } = useAnswer(id);

    const calculate = () => {
        let score = 0;

        answers.forEach((question, index) => {
            const currectIndexs = [];
            const currectChecked = [];

            question.options.forEach((option, index1) => {
                if (option.correct) {
                    currectIndexs.push(index1);
                }

                if (state[index].options[index1].checked) {
                    currectChecked.push(index1);
                    option.checked = true;
                }
            });

            if (_.isEqual(currectIndexs, currectChecked)) {
                score += 5;
            }
        });

        return score;
    };

    const userScore = calculate();

    return (
        <>
            {loading && <h1>Loading...</h1>}
            {error && <h1>There was an error!</h1>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
};

export default Reuslt;
