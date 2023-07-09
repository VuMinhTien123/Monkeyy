import styled from 'styled-components'
import { Label } from '../conponents/label'
import { Input } from '../conponents/input'
import {useForm} from 'react-hook-form'
import { IconEyeClose, IconEyeOpen } from '../conponents/icon'
import { Field } from '../conponents/field'
import { useEffect } from 'react'
import { Button } from '../conponents/button'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth, db } from '../firebase-apps/firebase-config'
import { NavLink, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import AuthenticationPage from './AuthenticationPage'
import InputPassWordToggle from '../conponents/input/InputPassWordToggle'
import slugify from 'slugify'


const schema = yup.object({
    fullname : yup.string().required("Vui lòng nhập tên đầy đủ của bạn"),
    email : yup.string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
    password : yup.string()
    .min(6, "Mật khẩu có 6 kí tự")
    .required("Vui lòng nhập mật khẩu của bạn")
})

const SignUpPage = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: {
        errors,
        isValid,
        isSubmitting,
    }, watch, reset} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })

    const handleSignUp = async (values) => {
        
        if(!isValid) return;
        console.log('values', values)
        const user = await createUserWithEmailAndPassword(
            auth, 
            values.email, 
            values.password);
        
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        const colRef = collection(db, 'users');
        await setDoc(doc(db, 'users',auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: slugify(values.fullname,  {lower: true}),
        })
       

        toast.success("đăng kí tài khoản thành công")
       navigate('/')
    }

    useEffect(() => {
        const arrErroes = Object.values(errors);
        if(arrErroes.length > 0) {
            toast.error(arrErroes[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            })
        }
    }, [errors])
    
    useEffect(() => {
       document.title = 'Register Page' 
    },[])

  return (
    <AuthenticationPage>

        <form className='form' 
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete='off'
        >
            <Field>
                <Label htmlFor='fullname'> FullName</Label>
                <Input 
                type='text' 
                name='fullname'
                placeholder='Eenter your name' 
                control = {control}              
                 />
            </Field>
            <Field>
                <Label htmlFor='email'> Email Adress</Label>
                <Input 
                type='email' 
                name='email'
                placeholder='Eenter your Email' 
                control = {control}              
                 />
            </Field>
            <Field>
                <Label htmlFor='password'> Password</Label>
                <InputPassWordToggle control = {control}></InputPassWordToggle>
            </Field>
                
    <div className='have-account'>
        Bạn có tài khoản chưa? 
        <NavLink className='nav-form' to='/sign-in'>Đăng nhập</NavLink>
    </div>

            <Button type='submit'
            
              style = {{width : "100%",maxWidth : 300, margin : '0 auto'}}
              isLoading = {isSubmitting}
              disabled = {isSubmitting}
               >Register</Button>
        </form>
    </AuthenticationPage>
  )
}
export default SignUpPage

