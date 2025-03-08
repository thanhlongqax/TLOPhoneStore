import { useAuth } from '../../context';
import {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {notifyLogin , notifyError} from "../../../utils";
import {jwtDecode} from "jwt-decode";
import {AuthSkeleton, LoadingSkeleton} from "../index.jsx";
function LoginComponent() {
  const { login, loginWithToken, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const hasLoggedIn = useRef(false);
  const [loadingRegister, setLoadingRegister] = useState(true);
  const handleLoginWithToken = async (token) => {
    try {
      const response = await loginWithToken(token);
      if (response && response.accessToken) {
        if (!hasLoggedIn.current) {
          notifyLogin();
          hasLoggedIn.current = true;
        }
        navigate("/")
      } else {
        const errorMessage = response?.message || 'Đăng nhập thất bại!';
        notifyError(errorMessage);
        navigate('/401')
      }
    } catch (err) {
      console.error("Login with token failed:", err);
      notifyError(err);
      navigate('/401')
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      handleLoginWithToken(token);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response && response.accessToken) {
        if (!hasLoggedIn.current) {
          notifyLogin();
          hasLoggedIn.current = true;
        }
        const decodedToken = jwtDecode(response.accessToken);
        if (decodedToken.role == "ADMIN"){
          navigate("/admin")
        }
        else{
          navigate("/")
        }
      } else {
        const errorMessage = response?.message || 'Đăng nhập thất bại!';
        notifyError(errorMessage);
      }
    } catch (err) {
      console.error("Login failed:", err);
      notifyError(err);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setLoadingRegister(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    return null;
  }
  if (loading) {
    return <LoadingSkeleton/>
  }
  if (error) {
    return <LoadingSkeleton/>;
  }
  return (
      <>
        {loadingRegister ? (
            <AuthSkeleton/>
        ) : (
            <section className="flex flex-col self-stretch justify-center px-6">
              <div className="flex flex-col max-w-full w-[400px]">
                <div className="flex flex-col self-start text-black">
                  <h1 className="self-start text-4xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                    Đăng nhập với TLO
                  </h1>
                </div>
                <form className="flex flex-col mt-12 w-full max-md:mt-10 " onSubmit={handleSubmit}>
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="username" className="text-base text-black opacity-40">
                      Tên người dùng
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg text-sm rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        placeholder="Nhập tên người dùng ở đây"
                        required
                    />
                  </div>
                  <div className="flex flex-col mt-10 w-full gap-2">
                    <label htmlFor="password" className="text-base text-black opacity-40">
                      Nhập mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm shadow-lg rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        placeholder="Nhập mật khẩu ở đây"
                        required
                    />
                  </div>
                  <div className="flex gap-10 items-center mt-10 text-base">
                    <button
                        type="submit"
                        className="flex-col self-stretch my-auto bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:bg-gradient-to-br font-medium text-neutral-50 gap-2.5 px-12 py-4 bg-red-500 rounded max-md:px-5"
                        disabled={loading}
                    >
                      Đăng nhập
                    </button>
                  </div>
                  {error && <p className="text-red-500 mt-4">Login failed: {error}</p>}
                  <div className="flex gap-4 items-center mt-8 text-base text-black ">
                    <p className="self-stretch my-auto opacity-70">Bạn chưa có tài khoản?</p>
                    <div
                        className="flex flex-col self-stretch my-auto font-medium w-[100px] hover:shadow hover:shadow-gray-200 hover:bg-pink-200">
                      <a href="/signup"
                         className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
                        Tạo tài khoản
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </section>
        )}

      </>

  );
}

export default LoginComponent;
