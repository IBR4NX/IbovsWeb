import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from "@/components/feedback/Loading";
import { post, setToken } from "@/lib/api";

const  Login: React.FC =  () => {
const { t,ready } = useTranslation('common');
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [messange, setMessange] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessange('');
    const data = ({
      email: email,
      password: password,
    });
    post("/login",data)
    .then((res) => {
      // console.log(res.data.token);
      setToken(res.data.token,res.data.refreshToken);
      setMessange(res.data.message || "Login successful");
      setLoading(false)
    }).catch((err) => {
      // console.log("error :",err);
      setLoading(false);
      setMessange(err.response?.data?.message || "An unexpected error occurred");
    });
  }
    if (!ready) {
    return null;
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-xs space-y-6 sm:space-y-8 bg-alpha-5 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold "> {t('login.title')}</h2>
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm" placeholder={t('login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none  relative block w-full px-3 py-3 sm:py-2 outline-none  rounded-2xl border border-alpha-35 border-gold-focus  text-sm"
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            
          </div>

          <div className=" -mx-4 items-center justify-between">
          {messange && <p className="text-red-500">{messange}</p>}

            <div className="text-sm">
              <a href="#" className="font-medium text-gold text-gold-hover">
                {t('login.forgotPassword')}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full  flex justify-center py-3 sm:py-2 px-4 border border-transparent bg-alpha-10  rounded-2xl text-gold"
            >
              {loading ? <Loading size={24}/> : t('login.submit')}
              
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-alpha ">
              {t('login.noAccount')}{" "}
              <a href="/register" className="font-medium *:mx-auto text-gold ">
               {loading? <Loading size={24}/> : t('login.register')}
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
