import clsx from "clsx";
import style from './EventBlock.module.scss'
import { FiVideo } from "@react-icons/all-files/fi/FiVideo";
import moment from "moment";


function EventBlock({data}) {

    const handleOpen = (url)=>{
        window.open(url)
    }

    return ( 
        data ? 
            <div onClick={() => handleOpen(data?.url)}>
                <div className={clsx(style.wrapper, {
                    [style.webinar]: data?.type === 'webinar'
                }, {
                    [style.appointment]: data?.appointment === 'appointment'
                },{
                    [style.self] : data?.type === 'self'
                })}>
                    <div className={clsx(style.detail)}>
                        <div className={clsx(style.left)}>
                            <h5 className={clsx(style.title, {
                                [style.appointment]: data?.type === 'appointment'
                            }, {
                                [style.webinar]: data?.type === 'webinar'
                            },{
                                [style.self] : data?.type === 'self'
                            })}>{data?.type === 'webinar' ? 'Webinar: ' : ''} {data?.title ?? ''}</h5>
                            <p className={clsx(style.time, {
                                [style.webinar]: data?.type === 'webinar'
                            })}>{moment(new Date(data?.start??'')).format('LT')} - {(new Date(data?.end))?.toTimeString() ?? ''}</p>
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
            :
            null
     );
}

export default EventBlock;