import clsx from "clsx";
import { createRef, useImperativeHandle, useState } from "react";
import style from './Popup.module.scss'
import { FiVideo } from "@react-icons/all-files/fi/FiVideo";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";


const popupRef= createRef()

const showPopup = (data)=> popupRef.current?.open?.(data)

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
}

function convertHours(str){
    var hours = new Date(str),
        hour = ("0" + (hours.getHours())).slice(-2),
        min = ("0" + hours.getMinutes()).slice(-2);
    return [hour, min].join(":");
}

function Popup() {
    const [data,setData] = useState('')
    const [open,setOpen] = useState(false)

    const handleClose = ()=>{
        setOpen(false)
    }

    useImperativeHandle(popupRef,()=>({
        close:()=>{
            setOpen(false)
        },
        open:(data)=>{
            setOpen(true)
            setData(data)
        }
    }),[open])

    return ( 
        <div className={clsx(style.wrapper,{
            [style.active] : open === true
        })}>
            <div className={clsx(style.container,{
                [style.active] : open === true
            })}>
                <div className={clsx(style.head)}>
                    <p className={clsx(style.text, style.topic)}>Event Detail</p>
                    <span onClick={handleClose} className={clsx(style.icon, style.close)}><AiOutlineClose /></span>
                </div>
                <div className={clsx(style.body)}>
                    <div className={clsx(style.content)}>
                        <div className={clsx(style.left)}>
                            <h3 className={clsx(style.title)}>{data?.title ?? ''}</h3>
                            <p className={clsx(style.text)}>{convert(data?.start ?? '')} - {convert(data?.end ?? '')}</p>
                            <p className={clsx(style.text)}>{convertHours(data?.start ?? '')} to {convertHours(data?.end ?? '')}</p>
                            {data?.type !== 'webinar' && data?.type !== 'worldEvent' ?
                                <div className={clsx(style.client)}>
                                    <img className={clsx(style.clientImg)} src='https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1663579184/1663579182.jpg' alt='' />
                                    <a className={clsx(style.clientLink)} href=''>View Client Profile</a>
                                </div>
                                :
                                null
                            }

                        </div>
                        {data?.type !== 'webinar' && data?.type !== 'worldEvent' ?
                        <div className={clsx(style.right, style.icon)}>
                                <a href='#'><FiVideo /></a>
                        </div>    
                        :
                        null
                        }
                    </div>
                <div className={clsx(style.buttonContainer)}>
                    <button onClick={handleClose} className={clsx(style.button)}>Close</button>
                </div>
                </div>
            </div>
        </div>
     );
}
export {showPopup}

export default Popup;