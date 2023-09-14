import{ useState } from 'react';
import {useNavigate,Navigate} from 'react-router-dom';
import * as api from '../../api'; 
import { useAuth } from '../../utils/auth';

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginError, setLoginError] = useState(null); 
  const [signupError, setSignupError] = useState(null);

  const { isSigned, login } = useAuth();

  if (isSigned) {
    return <Navigate to="/home" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.login({ email, password });
    console.log(res);
    try {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert('Login Success');
        login();
        navigate('/home');
      } else if (res.status === 404) {
        setLoginError(res.data.message || 'User Not Found');
      } else if (res.status === 400) {
        setLoginError('Incorrect password');
      }
    } catch (error) {
      setLoginError(res.message || 'Login Failed');
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await api.signup({ name, email, password });
    try {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert('Signup Success, Login Now!');
        navigate('/');
      } else if (res.status === 400) {
        setSignupError(res.message || 'User already exists');
      }
    } catch (error) {
      setSignupError(res.data.message||'Signup Failed');
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setLoginError(null);
    setSignupError(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className='min-h-screen text-center flex justify-center items-center p-4 md:p-8 lg:p-12'>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate__animated animate__bounceIn">
              Welcome to My Twitter Clone
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 animate__animated animate__fadeIn">
              Connect people Worldwide, Meet new friends
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            {isLogin ? (
              <>
                <h2 className="text-2xl font-semibold font-serif my-4  text-center">Login</h2>
                {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-800">Email</label>
                    <input type="email" id="username" required name="username" placeholder="johndev@gmail.com" className="w-full p-2 border rounded-md"
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800">Password</label>
                    <input type="password" id="password" name="password" required placeholder='*******' className="w-full p-2 border rounded-md" 
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className="mb-4">
                    <input type="checkbox" id="remember" name="remember" className="mr-1" />
                    <label htmlFor="remember" className="text-gray-700">Remember me</label>
                  </div>
                  <button type="submit" className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                    Login
                  </button>
                </form>
                <p className="mt-4 text-gray-600">Don`t have an account? <button onClick={toggleForm} className="text-blue-600 ">Sign up</button></p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold font-serif my-4  text-center">Sign Up</h2>
                {signupError && <p className="text-red-500 text-sm mb-4">{signupError}</p>}
                <form onSubmit={handleSignup} >
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-800">Name</label>
                    <input type="text" id="name" placeholder="John Dev" name="name" required className="w-full p-2 border rounded-md"
                    value={name} onChange={(e)=>setName(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800">Email</label>
                    <input type="email" id="email" name="email" placeholder="johndev@gmail.com" required className="w-full p-2 border rounded-md"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800">Password</label>
                    <input type="password" id="password" name="password" required placeholder="********" className="w-full p-2 border rounded-md"
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                    Sign Up
                  </button>
                </form>
                <p className="mt-4 text-gray-600">Already have an account? <button onClick={toggleForm} className="text-blue-600 ">Log in</button></p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  }
  
  export default Home;
  