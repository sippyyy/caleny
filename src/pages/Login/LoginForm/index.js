import { Form } from "formik";
import { TextField } from "../../../components/CustomField";
import clsx from "clsx";
import style from './LoginForm.module.scss'
import { Link } from "react-router-dom";

function LoginForm() {
    return ( 
        <Form>
            <div className={clsx(style.wrapper)}>
                <div className={clsx(style.form)}>
                    <TextField
                        label='Email'
                        name='email'
                        placeholder='Please fill your email'
                    />

                    <TextField
                        label='Password'
                        name='password'
                        placeholder='Please fill your password'
                    />
                        <button type='submit'>
                            Sign In
                        </button>
                </div>
            </div>
        </Form>
     );
}

export default LoginForm;