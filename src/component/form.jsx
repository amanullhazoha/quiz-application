/* eslint-disable react/jsx-props-no-spreading */
import classes from '../css/form.module.css';

const Form = ({ children, className, ...rest }) => (
    <form className={`${classes.form} ${className}`} action="#" {...rest}>
        {children}
    </form>
);

export default Form;
