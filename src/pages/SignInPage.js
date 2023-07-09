import { useAuth } from '../contexts/auth-context'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage'
import { useForm } from 'react-hook-form'
import { Field } from '../conponents/field'
import { Label } from '../conponents/label'
import { Input } from '../conponents/input'
import { Button } from '../conponents/button'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { IconEyeClose, IconEyeOpen } from '../conponents/icon'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-apps/firebase-config'
import InputPassWordToggle from '../conponents/input/InputPassWordToggle'



const schema = yup.object({
    email : yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
    password : yup
    .string()
    .min(6, "Mật khẩu có 6 kí tự")
    .required("Vui lòng nhập mật khẩu của bạn")
})



const SignInPage = () => {


    const {handleSubmit, control, formState: {isValid ,isSubmitting, errors}} = useForm(
       {
        mode: 'onChange',
        resolver: yupResolver(schema)
       }
    )

    useEffect(() => {
        const arrErroes = Object.values(errors);
        if(arrErroes.length > 0) {
            toast.error(arrErroes[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            })
        }
    }, [errors])
   
    const {userInfo} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      document.title = "Login Page";
      if (userInfo?.email) navigate("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const handleSignIn = async (values) => {
      if( !isValid) return;
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      } catch (error) {
        if (error.message.includes("wrong-password"))
          toast.error("It seems your password was wrong");
      }
        
    }
  return (
    <AuthenticationPage>
      <form className='form' 
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete='off'
        >
            <Field>
                <Label htmlFor='email'> Email address </Label>
                <Input 
                type='email'
                name = "email"
                 placeholder = "Nhập địa chỉ email"
                 control = {control}
                  ></Input>
            </Field>
            <Field>
                <Label htmlFor='password'> password </Label>
                <InputPassWordToggle control = {control}></InputPassWordToggle>
            </Field>

            <div className='have-account'>
              Tạo tài khoản ? 
               <NavLink className='nav-form' to='/sign-up'>Đăng kí</NavLink>
            </div>

            <Button type='submit'
              className = 'w-full max-w[300px] mx-auto'
              isLoading = {isSubmitting}
              disabled = {isSubmitting}
               >Login</Button>
        </form>
    </AuthenticationPage>
  )
}

export default SignInPage
