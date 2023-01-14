import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import LoginForm from "./LoginForm";
import axios from "axios";
import LoginSlice from "./LoginSlice";
import { showPopup } from "../../components/Popup";
const loginUrl = 'https://reqres.in/api/login'

function Login() {
    const dispatch = useDispatch()
    return ( 
        <Formik
            initialValues={
                {
                    email: '',
                    password:''
                }

            }
            validationSchema={Yup.object({
                email: Yup.string()
                .required("Email is required"),
                password: Yup.string()
                .required("Pass word is required")
                .min(4,'Password must be longer than 4 characters')
            })
        }
        onSubmit={(values,actions)=>{
            console.log('asdasd')
            axios.post(loginUrl, values)
                .then(res => {
                    console.log(res)
                    const {status,data} = res || {}
                    if(status === 200 || status === 201){
                        if(data.token){
                            dispatch(LoginSlice.actions.setAuthentication(true))
                            localStorage.setItem('user', data.token)
                            window.location.replace('/')
                        }
                    }else{
                        showPopup('Login false')
                    }
                })
                .catch(err => {
                    console.log(err.message)
                    showPopup(err.message)
                })
            dispatch(LoginSlice.actions.setUsername(values.email))
            dispatch(LoginSlice.actions.setPassword(values.password))
        }}
        >
            <LoginForm />
        </Formik>
     );
}

export default Login;