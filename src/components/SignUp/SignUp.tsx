import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
interface logbtn 
{
  btn: string;
}
export default function SignUp({btn} : logbtn) {
    const [name, setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')
    const [confPassword , setConfPassword] = useState('')
    const {t} = useTranslation()
    const navigate = useNavigate();
    const send = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // التحقق من تطابق كلمة المرور مع تأكيد كلمة المرور
        if (password !== confPassword) {
          alert(t("Passwords do not match"));
          return;
        }
    
        // إرسال البيانات عبر API باستخدام axios
        axios.post('http://127.0.0.1:8000/api/register', { name: name, email: email, password: password , password_confirmation : confPassword})
          .then(response => {
            console.log(response.data);
            // إعادة التوجيه بعد التسجيل الناجح
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // إعادة التوجيه بعد التسجيل الناجح
                navigate('/');
              }
          })
          .catch(error => {
            console.error("Error during signup:", error);
            alert(t("Signup failed"));
          });
      };
  return (
    <form className="mb-6" onSubmit={send}>
      <label className='mb-2.5 font-medium text-base block' htmlFor="name">{t("Name")}</label>
      <input
        className="w-full mb-5 p-5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("NamePlace")}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className='mb-2.5 font-medium text-base block' htmlFor="email">{t("Email")}</label>
      <input
        className="w-full mb-5 p-5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("EmailPlace")}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className='mb-2.5 font-medium text-base block' htmlFor="">{t("Password")}</label>
      <div className=" mb-5 flex gap-2">
      <input value={password}
        onChange={(e) => setPassword(e.target.value)} className="w-1/2 p-5 placeholder:text-base bg-White/95 rounded-md" placeholder={t("PasswordPlace")} type="password" />
      <input         value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)} className="w-1/2 p-5 placeholder:text-base bg-White/95 rounded-md" placeholder={t("PasswordPlace")} type="password" />
      </div>
      <p className="block  text-base font-normal text-gray-700 mb-5" > <input type="checkbox" name="" id="" /> {t("I agree with Terms of Use and Privacy Policy")}</p>
      <button className="w-full text-white py-4.5 px-5 rounded-lg bg-violet-950">{t(btn)}</button>
    </form>
  )
}
