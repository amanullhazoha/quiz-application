/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { getDatabase, ref, set } from '@firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import useQuiz from '../../hook/useQuiz';
import Answers from '../answers';
import MiniPlayer from '../miniPlayer';
import ProgressBar from '../progressBar';

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });

            return action.value;

        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;

        default:
            return state;
    }
};

const Quiz = () => {
    const { id } = useParams();
    const { questions, loading, error } = useQuiz(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { currentUser } = useAuth();
    const [qna, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { videoTitle } = state;

    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions.map((q) => q),
        });
    }, [questions]);

    const handelAnswer = (e, index) => {
        dispatch({
            type: 'answer',
            value: e.target.checked,
            optionIndex: index,
            questionID: currentQuestion,
        });
    };

    const handelNext = () => {
        if (currentQuestion + 1 <= questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handelPrev = () => {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handelSubmit = async () => {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna,
        });

        navigate(`/result/${id}`, { state: qna });
    };

    const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
            {loading && <div>Loading ...</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>

                    <Answers
                        options={qna[currentQuestion].options}
                        handelChange={handelAnswer}
                        input
                    />
                    <ProgressBar
                        handelNext={handelNext}
                        handelPrev={handelPrev}
                        handelSubmit={handelSubmit}
                        progress={progress}
                    />
                    <MiniPlayer id={id} title={videoTitle} />
                </>
            )}
        </>
    );
};

export default Quiz;
