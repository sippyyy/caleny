import style from './EventWrapper.module.scss'
import clsx from 'clsx';

function EventWrapper(props) {

    const handleClick= (data)=>{
        window.open('http://dummywebiste.com/')
    }

    return ( 
        <div onClick={() => { handleClick (props.event)}} className={clsx(style.wrapper,{
            [style.borderAppoinment]: props?.event?.type === 'appointment'
        },{
            [style.borderWebinar]: props?.event?.type === 'webinar'
        },{
            [style.borderSelfEvent]: props?.event?.type === 'self'
        })}>
            <div className={clsx(style.title)}>{props?.event?.title}</div>
        </div>
     );
}

export default EventWrapper;