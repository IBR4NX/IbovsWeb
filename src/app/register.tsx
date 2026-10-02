// Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { post } from "../features/api/api.js";
import Loading from "../components/Animations/Loading.js";
import { useTranslation } from "react-i18next";

export default function Register() {
  const nav = useNavigate();
  // const dispatch = useDispatch();
  const { t } = useTranslation('common');
  
  const [messange, setMessange] = useState("");
  const [loading, setLoading] = useState(false);
  // const [username, setUsername] = useState("");
  // const [step, setStep] = useState(false);
  // const cssInput="";

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessange("");
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
      number: { value: string };
      username: { value: string };
    };

    const data = ({
      email: target.email.value,
      password: target.password.value,
      name: target.name.value,
    });

    post("/user/signup", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        // dispatch(login(res.data.resp));

        console.log(res);
        nav("/login");
        // setMessange(res.data.error)
      })
      .catch((err) => {
        setMessange(err.response?.data?.message || "حدث خطأ غير متوقع");
      });
    setLoading(false);
  }
  // const {err, success} =apiPost("url test","req test");
  // console.log(err,success);

  return (
    <>

      {messange && <p>{messange}</p>}
      <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-xs space-y-6 sm:space-y-8 bg-alpha-5 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold "> {t('register.title')}</h2>
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleRegister}>
            <div className="rounded-md shadow-sm space-y-2">

              <input className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm" type="text" name="username" placeholder={t('register.username')} required />
              <>
                <input className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm" type="text" name="name" placeholder={t('register.name')} required />
                <input className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm" type="email" name="email" placeholder={t('register.email')} required />
                <input className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm" type="password" name="password" placeholder={t('register.password')} required />
              </>

            </div>

            <div className=" -mx-4 items-center justify-between">
              {messange && (
                <div dir='ltr' className="text-red-500 text-sm t ">{messange}</div>
              )}

              {/* <div className="text-sm">
                    <a href="#" className="font-medium text-gold text-gold-hover">
                      {t('login.forgotPassword')}
                    </a>
                  </div> */}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full  flex justify-center py-3 sm:py-2 px-4 border border-transparent bg-alpha-10  rounded-2xl text-gold"
              >
                {loading ? <Loading size={24} /> : t('register.submit')}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-alpha ">

                  {t('register.haveAccount')}
                <a href="/login" className="font-medium text-gold ">
                  {t('register.login')}
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}