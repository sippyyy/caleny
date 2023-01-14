import style from './Events.module.scss'
import clsx from 'clsx';
import EventBlock from './components/EventBlock';
import moment from 'moment';
import { getShortMonthName } from '../../functionsNVariables';

const now = new Date()
const getTimeTitle =(timeChosen)=>{
    if(timeChosen){
        const sameTime = moment(timeChosen).isSame(now,'day','year','month')
        console.log(timeChosen,now)
        return sameTime ? `Today, ${timeChosen.getDate() + ' ' + getShortMonthName(timeChosen.getMonth())}` : `${timeChosen.getDate() + ' ' + getShortMonthName(timeChosen.getMonth())}`
    }
}

function Events({data}) {
    return ( 
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.container)}>
                <div className={clsx(style.head)}>
                    <h3 className={clsx(style.title)}>Upcoming Events</h3>
                    <button className={clsx(style.button)}>View All</button>
                </div>
                <p className={clsx(style.time)}>{getTimeTitle(data?.time)}</p>
            </div>
            {
                data?
                    data?.eventsOfDay?.map((info, index) => (
                        <EventBlock key={index} data={info} />
                    ))
                :
                null
            }
        </div>
     );
}

export default Events;