import {useEffect, useState} from "react";
import { useAuth } from '../../context';
import FormInput from "./FormInput";
import {notifyRegister, notifyError, notifyRegisterMessage} from "../../../utils/index.jsx";
import { useNavigate } from "react-router-dom";
import {useAuthHook} from "../../hook/index.jsx";
import {AuthSkeleton, LoadingSkeleton} from "../index.jsx";
function SignUpComponent() {
  const { loading , error ,registerWithMail } = useAuthHook()
  const [loadingRegister, setLoadingRegister] = useState(true);
  const [credentials, setCredentials] = useState({ email: '', fullName: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerWithMail(credentials);
      if (response && response.message) {
        notifyRegisterMessage("Đăng ký tài khoản nhân viên thành công.Nhân viên tạo tài khoản trong 1 giờ ")
        navigate('/admin');
      }
      else if(response?.statusCode === 400) {
        throw new Error("Đăng ký thất bại. tên người dùng đã tổn tại");
      }
      else {
        throw new Error(" Đăng ký thất bại");
      }
    } catch (err) {
      notifyError(err.message || 'Đăng ký thất bại');
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setLoadingRegister(false), 500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <LoadingSkeleton/>
  }
  if (error) {
    return <LoadingSkeleton/>;
  }
  return (
      <>
        {loadingRegister ?
            (<AuthSkeleton/>) :
            (
                <section className="flex flex-col self-stretch justify-center px-6 ">
                  <div className="flex flex-col max-w-full w-[400px]">
                    <div className="flex flex-col self-start text-black">
                      <h1 className="self-start text-4xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                        Tạo tài khoản
                      </h1>
                      <p className="mt-6 text-base">Nhập thông tin chi tiết dưới đây</p>
                    </div>
                    <form className="flex flex-col mt-12 w-full max-md:mt-10 " onSubmit={handleSubmit}>
                      <div className="flex flex-col w-full gap-2 ">
                        <label htmlFor="email" className="text-base text-black opacity-40">
                          Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm shadow-lg rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            placeholder="Nhập emai ở đây"
                            required
                        />
                      </div>
                      <div className="flex flex-col mt-10 gap-2">
                        <label htmlFor="fullName" className="text-base text-black opacity-40">
                          Họ và tên
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg text-sm rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={credentials.fullName}
                            onChange={(e) => setCredentials({...credentials, fullName: e.target.value})}
                            placeholder="Nhập họ và tên nhân viên ở đây"
                            required
                        />
                      </div>

                      <div className="flex gap-10 items-center mt-10 text-base">
                        <button
                            type="submit"
                            className="flex-col self-stretch my-auto bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:bg-gradient-to-br font-medium text-neutral-50 gap-2.5 px-12 py-4 bg-red-500 rounded max-md:px-5"
                            disabled={loading}
                        >
                          Tạo tài khoản
                        </button>
                      </div>
                      <div className="flex gap-4 items-center mt-8 text-base text-black ">
                        <p className="self-stretch my-auto opacity-70">Bạn đã có tài khoản?</p>
                        <div
                            className="flex flex-col self-stretch my-auto font-medium w-[100px] hover:shadow hover:shadow-gray-200 hover:bg-pink-200">
                          <a href="/login"
                             className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
                            Đăng nhập
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
            )
        }

      </>

  );
}

export default SignUpComponent;
