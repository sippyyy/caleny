import clsx from "clsx";
import style from './EventBlock.module.scss'
import { FiVideo } from "@react-icons/all-files/fi/FiVideo";

const timeDefault = (time)=>{
    const hours = time.getHours()
    const minute = time.getMinutes()
    return `${hours}:${minute}`
}


function EventBlock({data}) {

    const handleOpen = (url)=>{
        window.open(url)
    }

    return ( 
        <div onClick={()=>handleOpen(data?.url)}>
            <div className={clsx(style.wrapper, {
                [style.webinar]: data?.type === 'webinar'
            }, {
                [style.appointment]: data?.appointment === 'appointment'
            })}>
                <div className={clsx(style.detail)}>
                    <div className={clsx(style.left)}>
                        <h5 className={clsx(style.title, {
                            [style.appointment]: data?.type === 'appointment'
                        }, {
                            [style.webinar]: data?.type === 'webinar'
                        })}>{data?.title ?? ''}</h5>
                        <p className={clsx(style.time, {
                            [style.webinar]: data?.type === 'webinar'
                        })}>{data?.start?.toTimeString() ?? ''} - {data?.end?.toTimeString()?? ''}</p>
                    </div>
                    {data?.type == 'appointment' && data?.type ?
                        <a href={data?.url ?? ''} className={clsx(style.right)}>
                            <div className={clsx(style.icon, {
                                [style.appointment]: data?.type === 'appointment'
                            })}><FiVideo /></div>
                        </a>
                        :
                        null}
                </div>
                {data?.type == 'appointment' && data?.type ?
                    <div className={clsx(style.client)}>
                        <img alt='' src={data?.img ?? ''} className={clsx(style.img)} />
                        <a href={data?.clientLink ?? ''} className={clsx(style.link)}>View Client Profile</a>
                    </div>
                    :
                    null}
            </div>
        </div>
     );
}

export default EventBlock;