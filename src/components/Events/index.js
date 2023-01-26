import style from './Events.module.scss'
import clsx from 'clsx';
import EventBlock from './components/EventBlock';
import moment from 'moment';
import { getShortMonthName } from '../../functionsNVariables';
import { showPopup } from '../Popup';
import CreateEvent from '../Toolbar/components/CreateEvents';

const now = new Date()
const getTimeTitle =(timeChosen)=>{
    if(timeChosen){
        const sameTime = moment(timeChosen).isSame(now,'day','year','month')
        return sameTime ? `Today, ${timeChosen.getDate() + ' ' + getShortMonthName(timeChosen.getMonth())}` : `${timeChosen.getDate() + ' ' + getShortMonthName(timeChosen.getMonth())}`
    }
}



function Events({data,events,setEvents}) {
    const handleOpenPopup = () => {
        showPopup(<CreateEvent events={events} setEvents={setEvents} />)
    }
    return ( 
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.container)}>
                <div className={clsx(style.head)}>
                    <h3 className={clsx(style.title)}>Upcoming Events</h3>
                    <button onClick={handleOpenPopup} className={clsx(style.button)}>Add event</button>
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