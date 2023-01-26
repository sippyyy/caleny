import clsx from "clsx";
import { createRef, useImperativeHandle, useState } from "react";
import style from './Popup.module.scss'
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { useEffect } from "react";


const popupRef= createRef()

const showPopup = (message)=> popupRef.current?.open?.(message)
const hidePopup = ()=> popupRef.current?.close?.()

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
        open:(message)=>{
            setOpen(true)
            setData(message)
        }
    }),[open])

    useEffect(()=>{
        console.log(data)
    })

    return ( 
        <div className={clsx(style.wrapper,{
            [style.active] : open === true
        })}>
            <div className={clsx(style.container,{
                [style.active] : open === true
            })}>
                <div className={clsx(style.head)}>
                    <p className={clsx(style.text, style.topic)}>{!data ? 'Notification!' : 'Create event'}</p>
                    <span onClick={handleClose} className={clsx(style.icon, style.close)}><AiOutlineClose /></span>
                </div>
                <div className={clsx(style.body)}>
                    <div className={clsx(style.content)}>
                        {data}
                    </div>
                    {!data ? <div className={clsx(style.buttonContainer)}>
                        <button onClick={handleClose} className={clsx(style.button)}>Close</button>
                    </div> : null}
                </div>
            </div>
        </div>
     );
}
export {showPopup,hidePopup}

export default Popup;