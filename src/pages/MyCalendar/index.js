import {
    Calendar,
    Views,
    momentLocalizer,
} from 'react-big-calendar'
import moment from 'moment'
import './calendarStyle.css'
import events from '../../mock_api/event'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import TimeGutterHeader from '../../components/TimeGutterHeader'
import EventWrapper from '../../components/EventWrapper'
import Events from '../../components/Events'

const mLocalizer = momentLocalizer(moment)


window.onresize = function () {
    setTimeout(() => {
        window.location.reload()
    }, 1000);
}

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        // style: {
        //     backgroundColor: 'lightblue',
        // },
    })


function MyCalendar({
    localizer = mLocalizer,
    showDemoLink = true,
    ...props
}) {
    const [eventsOfday, setEventsOfDay] = useState('')


    useEffect(() => {
        const time = new Date()
        const currentDay = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()
        const eventsOfDay = events.filter(event => event.start.getFullYear() + '-' + event.start.getMonth() + '-' + event.start.getDate() === currentDay)
        setEventsOfDay({ time, eventsOfDay })
    }, [])

    const onDrillDown = (data) => {
        const currentDay = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()
        const eventsOfDay = events.filter(event => {
            const dayStartFormated = event.start.getFullYear() + '-' + event.start.getMonth() + '-' + event.start.getDate()
            if (dayStartFormated === currentDay) {
                return event
            }
        })
        setEventsOfDay({ time: data, eventsOfDay })
    }


    const { components, defaultDate, max, views, formats } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
                toolbar: Toolbar,
                timeGutterHeader: TimeGutterHeader,
                eventWrapper: EventWrapper
            },
            defaultDate: new Date(),
            formats: {
                dateFormat: 'D',
                // the day of the week header in the 'month' view
                weekdayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'dddd', culture),
                // the day header in the 'week' and 'day' (Time Grid) views
                dayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'dddd Do', culture),
                // the time in the gutter in the Time Grid views
                timeGutterFormat: (date, culture, localizer) =>
                    localizer.format(date, 'hh:mm a', culture),
            },
            views: window.innerWidth > 500 ? Object.keys(Views).map((k) => Views[k]) : 'month',
        }),
        []
    )

    const onShowMore = (data) => {
        console.log(data)
    }
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
                />
            </div>
            {window.innerWidth < 500 ?
                <Events data={eventsOfday} />
                :
                null
            }
        </>

    );
}

export default MyCalendar;