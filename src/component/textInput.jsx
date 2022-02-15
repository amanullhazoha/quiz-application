/* eslint-disable react/jsx-props-no-spreading */
import classes from '../css/textInput.module.css';

const TextInput = ({ type, icon, placeholder, ...rest }) => (
    <div className={classes.textInput}>
        <input type={type} placeholder={placeholder} {...rest} />
        <span className="material-icons-outlined"> {icon} </span>
    </div>
);

export default TextInput;
