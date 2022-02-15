/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import classes from '../css/singup.module.css';
import Button from './button';
import CheckBox from './checkbox';
import Form from './form';
import TextInput from './textInput';

const SingUpForm = () => {
    const { singUp } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState();

    async function handelSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Password don't match!");
        }

        try {
            setError('');
            setLoading(true);
            await singUp(email, password, userName);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Failed to create an account!');
        }
    }

    return (
        <Form className={classes.singup} onSubmit={handelSubmit}>
            <TextInput
                type="text"
                placeholder="Enter name"
                icon="person"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <TextInput
                type="email"
                placeholder="Enter email"
                icon="alternate_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <TextInput
                type="password"
                placeholder="Confirm password"
                icon="lock_clock"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <CheckBox
                id="checkbox"
                text=" I agree to the Terms &amp; Conditions"
                required
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
            />

            <Button type="submit" disabled={loading}>
                <span>Submit Now</span>
            </Button>

            {error && <div className="error">{error}</div>}

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
};

export default SingUpForm;
