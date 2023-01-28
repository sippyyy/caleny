import { Formik } from "formik";
import * as Yup from 'yup'
import CreateEventForm from "../CreateEventForm";
import clientImg from '../../../../assets/img/client.jpg'
import { hidePopup } from "../../../Popup";
var randomId = require('random-id');
var len = 10;
var pattern = 'c4lEny'

function CreateEvent({setEvents}) {
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
                    allday:'false',
                    url:''
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
                    id: randomId(len, pattern),
                    allDay:values.allday === 'false' ? false : true,
                    end: new Date(Date.parse(`${values.dayEnd} ${values.hoursEnd}:${values.minutesEnd}:00`)),
                    start: new Date(Date.parse(`${values.dayStart} ${values.hoursStart}:${values.minutesStart}:00`)),
                    title:values.title,
                    clientLink: values?.clientLink ?? 'http://dummyurl.com',
                    img:values?.img??clientImg,
                    type:values.type,
                    url: values.url ? values.url : 'http://dummyurl.com'
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