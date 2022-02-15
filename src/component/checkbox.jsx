/* eslint-disable react/jsx-props-no-spreading */
const CheckBox = ({ id, text, className, ...rest }) => (
    <label htmlFor={id} className={className}>
        <input type="checkbox" id={id} {...rest} />
        <span>{text}</span>
    </label>
);

export default CheckBox;
