import { Form, useFormikContext } from "formik";
import { SelectField, TextField } from "../../../CustomField";
import { DateSelect } from "react-ymd-date-select/dist/cjs/presets/vanilla";
import { useEffect, useState } from "react";
import clsx from "clsx";
import style from './CreateEventForm.module.scss'
import { useUpdateEffect } from "ahooks";
import moment from "moment/moment";

const currentTime = moment().month(0).format("YYYY-MM-DD")


function CreateEventForm() {

    const [dateStart, setDateStart] = useState(currentTime)
    const [dateEnd,setDateEnd] = useState(currentTime)
    const {setFieldValue,values} = useFormikContext()

    useEffect(()=>{
        if(dateEnd && dateEnd){
            if (moment(dateEnd).isBefore(dateStart)){
                setFieldValue('dayEnd', dateStart)
                setFieldValue('dayStart', dateEnd)
            }else{
                setFieldValue('dayEnd',dateEnd)
                setFieldValue('dayStart',dateStart) 
            }
        }
    },[dateEnd,dateStart])

    useUpdateEffect(()=>{
        if(!dateEnd){
            setDateEnd(currentTime)
        }
        if(!dateStart){
            setDateStart(currentTime)
        }
    },[dateEnd,dateStart])

    useUpdateEffect(()=>{
        if(values.allday){
            setFieldValue('hoursStart',0)
            setFieldValue('hoursEnd', 0)
        }
    },[values.allday])
    return ( 
        <Form>
            <TextField
                label='Title :'
                placeholder='Title of the event'
                name='title'
            />
            <div className={clsx(style.section)}>
                <SelectField name="allday" label="All day :">
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                </SelectField>
            </div>
            <div className={clsx(style.section)}>
                <label>From : </label>
                <div className={clsx(style.container)}>
                    <div className={clsx(style.containerTime)}>
                        <div className={clsx(style.containerText)}>
                            <TextField
                                disabled={values.allday === 'true' ? true : false}
                                placeholder='Hours'
                                name='hoursStart'
                            />
                        </div>
                        <span>:</span>
                        <div className={clsx(style.containerText)}>
                            <TextField
                                disabled={values.allday === 'true' ? true : false}
                                placeholder='Minute'
                                name='minutesStart'
                            />
                        </div>
                    </div>
                    <DateSelect onChange={setDateStart} value={dateStart} />
                </div>
            </div>
            <div className={clsx(style.section)}>
                <label>To : </label>
                <div className={clsx(style.container)}>
                    <div className={clsx(style.containerTime)}>
                        <div className={clsx(style.containerText)}>
                            <TextField
                                disabled={values.allday === 'true' ? true : false}
                                placeholder='Hours'
                                name='hoursEnd'
                            />
                        </div>
                        <span>:</span>
                        <div className={clsx(style.containerText)}>
                            <TextField
                                disabled={values.allday === 'true' ? true : false}
                                placeholder='Minute'
                                name='minutesEnd'
                            />
                        </div>
                    </div>
                    <DateSelect onChange={setDateEnd} value={dateEnd} />
                </div>
            </div>
            <div className={clsx(style.section)}>
                <SelectField name="type" label="Event's Type :">
                    <option value="">Choose event's type</option>
                    <option value="self">Self's event</option>
                    <option value="webinar">Webinar</option>
                </SelectField>
            </div>
            {values.type === 'webinar' ? 
                <TextField
                    name='url'
                    label='Website :'
                    placeholder='Website of the event'
                />
            :
                null
            }
            <div className={clsx(style.button)}>
                <button  type="submit" className={clsx(style.buttonSubmit)}>Add</button>
            </div>
        </Form>
     );
}

export default CreateEventForm;