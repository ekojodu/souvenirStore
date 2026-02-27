import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (currentState === 'Sign Up') {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: name } }
            });

            if (error) { setError(error.message); setLoading(false); return; }
            alert('Account created! Please check your email to confirm your account, then log in.');
            setCurrentState('Login');

        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) { setError(error.message); setLoading(false); return; }
            navigate('/');
        }

        setLoading(false);
    };

    const handleForgotPassword = async () => {
        if (!email) { setError('Enter your email address above first.'); return; }
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) { setError(error.message); return; }
        alert('Password reset link sent to your email.');
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 min-h-[45vh]'
        >
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            {currentState === 'Sign Up' && (
                <input
                    type='text'
                    placeholder='Full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full px-3 py-2 border border-gray-800'
                />
            )}

            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-800'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-800'
            />

            {error && <p className='text-red-500 text-sm w-full'>{error}</p>}

            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                {currentState === 'Login' ? (
                    <p className='cursor-pointer hover:underline' onClick={handleForgotPassword}>
                        Forgot your password?
                    </p>
                ) : (
                    <p
                        className='cursor-pointer hover:underline'
                        onClick={() => setCurrentState('Login')}
                    >
                        Already have an account?
                    </p>
                )}
                {currentState === 'Login' ? (
                    <p className='cursor-pointer hover:underline' onClick={() => setCurrentState('Sign Up')}>
                        Create account
                    </p>
                ) : (
                    <p className='cursor-pointer hover:underline' onClick={() => setCurrentState('Login')}>
                        Login here
                    </p>
                )}
            </div>

            <button
                type='submit'
                disabled={loading}
                className='bg-orange-500 py-2 text-white text-sm rounded-full px-8 mt-4 w-full disabled:opacity-50 hover:bg-orange-600 transition-all duration-300'
            >
                {loading ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;