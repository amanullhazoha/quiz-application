/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import classes from '../css/singup.module.css';
import Button from './button';
import Form from './form';
import TextInput from './textInput';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { login } = useAuth();

    async function handelLogIn(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Failed to login!');
        }
    }

    return (
        <Form className={`${classes.singup}`} style={{ height: '330px' }} onSubmit={handelLogIn}>
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

            <Button type="submit" disabled={loading}>
                <span>Submit Now</span>
            </Button>

            {error && <div className="error">{error}</div>}

            <div className="info">
                Don&apos;t have an account? <Link to="/singup">Signup</Link> instead.
            </div>
        </Form>
    );
};

export default LoginForm;
