import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { login } from '../services/apiService';

const Login = () => {

    let history = useHistory();
    const { setIsLoggedIn, setUserInfo } = useGlobalContext();
    const [loginError, setLoginError] = useState('');
    const [loginForm, setLoginForm] = useState({
        username: {
            value: '',
            touched: false
        },
        password: {
            value: '',
            touched: false
        },
        errors: {
            username: 'please enter username',
            password: 'please enter password'
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setLoginForm({
                ...loginForm, username: {
                    value, touched: true,
                },
                errors: {
                    ...loginForm.errors,
                    username: ''
                }
            });
        } else {
            setLoginForm({
                ...loginForm, password: {
                    value, touched: true,
                },
                errors: {
                    ...loginForm.errors,
                    password: ''
                }
            })
        }
    };

    const handleBlur = (e) => {

        const { name, value } = e.target;
        if (name === 'username') {

            if (loginForm[name].value === '') {
                setLoginForm({
                    ...loginForm, errors: {
                        ...loginForm.errors,
                        username: 'Please enter username'
                    }
                });
            } else {
                setLoginForm({
                    ...loginForm, errors: {
                        ...loginForm.errors,
                        username: ''
                    }
                });
            }
        } else {
            if (loginForm[name].value === '') {
                setLoginForm({
                    ...loginForm, errors: {
                        ...loginForm.errors,
                        password: 'Please enter password'
                    }
                });
            } else {
                setLoginForm({
                    ...loginForm, errors: {
                        ...loginForm.errors,
                        password: ''
                    }
                });
            }
        }
    }


    
    const handleSubmit = e => {
        e.preventDefault();
        if (!(loginForm.errors.username && loginForm.errors.password)) {
            login({username: loginForm.username.value, password: loginForm.password.value}).then(response => {
                setLoginError('');
                setIsLoggedIn(true);
                setUserInfo(response.data);
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                history.push('/home/list');
            })
            .catch(
                error => {
                    setLoginError(error.response.data.message);
                }
            )
            
        }

    }
    return (
        <section className="section login-section">
            <div className="login-wrapper">
                <h2>login</h2>
                {loginError && <span className="error">{loginError}</span>}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <AiOutlineUser className="icon" />
                        <input type="text" id="username" name="username" placeholder="Username" value={loginForm.username.value}
                            onChange={handleChange} onBlur={handleBlur} />
                        {(loginForm.username.touched && loginForm.errors.username) && <span className="error">{loginForm.errors['username']}</span>}
                    </div>
                    <div className="form-control">
                        <AiOutlineLock className="icon" />
                        <input type="password" id="password" name="password" placeholder="Password" value={loginForm.password.value}
                            onChange={handleChange} onBlur={handleBlur} />
                        {(loginForm.password.touched && loginForm.errors.password) && <span className="error">{loginForm.errors['password']}</span>}
                    </div>
                    <button className="btn login-btn" type="submit" disabled={loginForm.errors.username || loginForm.errors.password}>Login</button>
                </form>
            </div>

        </section>
    )
}

export default Login
