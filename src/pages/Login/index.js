import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import LoginForm from "./LoginForm";
import axios from "axios";
import LoginSlice from "./LoginSlice";
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
            })
        }
        onSubmit={(values,actions)=>{
            console.log('asdasd')
            axios.post(loginUrl, values)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('user', res.data.token)
                        dispatch(LoginSlice.actions.setAuthentication(true))
                    }
                })
                .catch(err => actions.resetForm())
            dispatch(LoginSlice.actions.setUsername(values.email))
            dispatch(LoginSlice.actions.setPassword(values.password))
        }}
        >
            <LoginForm />
        </Formik>
     );
}

export default Login;