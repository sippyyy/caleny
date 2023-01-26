import { Formik } from "formik";
import * as Yup from 'yup'
import CreateEventForm from "../CreateEventForm";
import clientImg from '../../../../assets/img/client.jpg'
import { hidePopup } from "../../../Popup";
import { useEffect } from "react";

function CreateEvent({events,setEvents}) {
    useEffect(()=>{
        console.log(events)
    },[events])
    return ( 
        <Formik
            initialValues={
                {
                    title:'',
                    type:'',
                    dayStart:'',
                    hoursStart:0,
                    minutesStart:0,
                    dayEnd: '',
                    hoursEnd: 0,
                    minutesEnd: 0,
                    allday:'false'
                }
            }

            validationSchema={Yup.object({
                title:Yup.string()
                .required('Title is required!'),
                type:Yup.string()
                .required('Type is required!'),
                dayStart: Yup.string()
                .required('Day is required!'),
                hoursStart: Yup.number()
                .min(0,'Invalid hours')
                .max(24,'Invalid hours')
                .required('Hour is required!'),
                minutesStart: Yup.number()
                .max(59,'Invalid minutes')
                .min(0,'Invalid minutes')
                .required('Minute is required!'),
                dayEnd: Yup.string()
                .required('Day is required!'),
                hoursEnd: Yup.string()
                .min(0, 'Invalid hours')
                .max(24, 'Invalid hours')
                .required('Hour is required!'),
                minutesEnd: Yup.string()
                .min(0, 'Invalid hours')
                .max(24, 'Invalid hours')
                .required('Minute is required!'),
            })}

            onSubmit = {(values,actions)=>{
                const newObj = {
                    id:events.length,
                    allday:values.allday === 'false' ? false : true,
                    clientLink: values?.clientLink ?? 'http://dummyurl.com',
                    start: new Date(`${values.dayStart} ${values.hoursStart}:${values.minutesStart}:00`),
                    end: new Date(`${values.dayEnd} ${values.hoursEnd}:${values.minutesEnd}:00`),
                    img:values?.img??clientImg,
                    title:values.title,
                    type:values.type,
                    url: values?.url ?? 'http://dummyurl.com'
                }
                setEvents(pre=>[...pre,newObj])
                actions.resetForm({
                    values:{
                        title: '',
                        type: '',
                        dayStart: values.dayStart,
                        hoursStart: 0,
                        minutesStart: 0,
                        dayEnd: values.dayEnd,
                        hoursEnd: 0,
                        minutesEnd: 0,
                        allday: 'false'
                    }
                })
                hidePopup()
            }}
        >
            <CreateEventForm />
        </Formik>
     );
}
export default CreateEvent;