import classes from '../css/summery.module.css';
import useFatch from '../hook/useFatch';
import successImage from '../images/success.png';

const Summery = ({ score, noq }) => {
    const getKeyword = () => {
        if ((score / (5 * noq)) * 100 < 50) {
            return 'failed';
        }
        if ((score / (5 * noq)) * 100 < 75) {
            return 'good';
        }
        if ((score / (5 * noq)) * 100 < 100) {
            return 'very good';
        }
        return 'excellent';
    };

    const { loading, error, result } = useFatch(
        `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,
        'GET',
        {
            Authorization: '563492ad6f9170000100000159e19b6f350d4791b2e1853155c9ed94',
        }
    );

    const image = result ? result?.photos[0].src.medium : successImage;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>

            {loading && <div className={classes.badge}>Loading...</div>}
            {error && <div className={classes.badge}>There was an error!</div>}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}
        </div>
    );
};

export default Summery;
