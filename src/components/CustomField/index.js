import { useField } from 'formik'
import clsx from 'clsx'
import style from './CustomField.module.scss'



export const TextField = ({ children, label, buttonName, children2, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={clsx(style.container)}>
            {label ? <label >{label}</label> : null}
            <div>
                <input
                    autoComplete='off' {...props} {...field}
                />
                {meta.error && meta.touched ? (<p className={clsx(style.errorMessage)}>{meta.error}</p>) : null}
            </div>
            
        </div>
    )
}

export const SelectField = ({ children, label, buttonName, children2, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={clsx(style.container)}>
            {label ? <label >{label}</label> : null}
            <div>
                <select className={clsx(style.singleOption)} {...props} {...field}>
                    {children}
                </select>
                {meta.error && meta.touched ? (<p className={clsx(style.errorMessage)}>{meta.error}</p>) : null}
            </div>
        </div>
    )
}