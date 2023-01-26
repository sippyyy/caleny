import {
    Calendar,
    Views,
    momentLocalizer,
} from 'react-big-calendar'
import moment from 'moment'
import './calendarStyle.scss'
import {event} from '../../mock_api/event'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import TimeGutterHeader from '../../components/TimeGutterHeader'
import EventWrapper from '../../components/EventWrapper'
import Events from '../../components/Events'
import { useUpdateEffect } from 'ahooks'


const mLocalizer = momentLocalizer(moment)


window.onresize = function () {
    setTimeout(() => {
        window.location.reload()
    }, 1000);
}

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
    })


function MyCalendar({
    localizer = mLocalizer,
    showDemoLink = true,
    ...props
}) {
    const [eventsOfday, setEventsOfDay] = useState('')
    const [events, setEvents] = useState(JSON.parse?.(localStorage.getItem('events'))??event)


    useUpdateEffect(()=>{
        localStorage.setItem('events', JSON.stringify(events))
    },[events])

    useEffect(() => {
        const time = new Date()
        const currentDay = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()
        const eventsOfDay = events.filter(event => new Date(event.start).getFullYear() + '-' + new Date(event.start).getMonth() + '-' + new Date(event.start).getDate() === currentDay)
        setEventsOfDay({ time, eventsOfDay })
    }, [events])

    const onDrillDown = (data) => {
        const currentDay = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()
        const eventsOfDay = events.filter(event => {
            const dayStartFormated = new Date(event.start).getFullYear() + '-' + new Date(event.start).getMonth() + '-' + new Date(event.start).getDate()
            if (dayStartFormated === currentDay) {
                return event
            }
        })
        setEventsOfDay({ time: data, eventsOfDay })
    }


    const { components, defaultDate, views, formats } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
                toolbar: props => (<Toolbar {...props} events={events} setEvents={setEvents} />),
                timeGutterHeader: TimeGutterHeader,
                eventWrapper: EventWrapper
            },
            defaultDate: new Date(),
            formats: {
                dateFormat: 'D',
                dayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'dddd Do', culture),
                timeGutterFormat: (date, culture, localizer) =>
                    localizer.format(date, 'hh:mm a', culture),
            },
            views: window.innerWidth > 500 ? Object.keys(Views).map((k) => Views[k]) : 'month',
        }),
        []
    )

    return (
        <>
            <div className='container' {...props}>
                <Calendar
                    components={components}
                    defaultDate={defaultDate}
                    events={events}
                    localizer={localizer}
                    showMultiDayTimes
                    step={60}
                    views={views}
                    onDrillDown={onDrillDown}
                    formats={formats}
                    messages={{
                        showMore: function showMore(total) {
                            return total + ' more';
                        }
                    }}
                    // onShowMore={onShowMore}
                    popup={true}
                    selectable
                />
            </div>
            {window.innerWidth < 500 ?
                <Events events={events} setEvents={setEvents} data={eventsOfday} />
                :
                null
            }
        </>

    );
}

export default MyCalendar;