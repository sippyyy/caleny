import { useRef, useState } from "react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import clsx from 'clsx'
import style from './Toolbar.module.scss'
import { RiArrowUpSLine } from "@react-icons/all-files/ri/RiArrowUpSLine";
import { useClickAway } from "ahooks";
import CreateEvent from "./components/CreateEvents";
import { showPopup } from "../Popup";

function Toolbar(props) {
    const [openViews,setOpenViews] = useState(false)
    const viewRef = useRef(null)

    useClickAway(()=>{
        setOpenViews(false)
    },viewRef)

    const handlePrevious = (option) => {
        let view = props.view;
        let mDate = props.date;
        let newDate;
        if (view === "month") {
            if (option === 'pre') {
                newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
            } else if (option === 'next') {
                newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
            }
        } else if (view === "week") {
            if (option === 'pre') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 7,
                    1
                );
            } else if (option === 'next') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 7,
                    1
                )
            }
        } else {
            if (option === 'pre') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 1,
                    1
                );
            } else if (option === 'next') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 1,
                    1

                );
            }
        }
        if (option === 'pre') {
            props.onNavigate("prev", newDate);
        } else if (option === 'next') {
            props.onNavigate("next", newDate);
        }
    };

    const handleClickToday = () => {
        const now = new Date();
        props.date.setMonth(now.getMonth());
        props.date.setYear(now.getFullYear());
        props.date.setDate(now.getDate());
        props.onNavigate("current");
    }
    
    const handleChooseView = (data) => {
        if (data === 'month') {
            props.onView('month')
        } else if (data === 'week') {
            props.onView('week')
        } else {
            props.onView('day')
        }
    }

    const handleOpenViews = ()=>{
        setOpenViews(openViews === true ? false : true)
    }

    const handleShowPopup = ()=>{
        showPopup(<CreateEvent setEvents={props.setEvents} />)
    }

    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.left)}>
                {window.innerWidth > 500 ?
                    <button
                        onClick={handleClickToday}
                        className={clsx(style.wrapText, style.leftItems, style.noneBackground,style.allCenter)}>Today</button>
                    :
                    null
                }
                <button onClick={() => handlePrevious('pre')} className={clsx(style.leftItems, style.allCenter)}>
                    <span className={clsx(style.arrowIcon)}><MdKeyboardArrowLeft stroke='#5684AE' /></span>
                </button>
                
                {window.innerWidth <= 500 ? 
                    <h2 className={clsx(style.title, style.leftItems)}>{props.label}</h2>
                :
                null
                }

                <button onClick={() => handlePrevious('next')} className={clsx(style.leftItems,style.allCenter)}>
                    <span className={clsx(style.arrowIcon)}><MdKeyboardArrowRight fill='#5684AE' /></span>
                </button>
                {window.innerWidth > 500 ?
                    <h2 className={clsx(style.title, style.leftItems)}>{props.label}</h2>
                :
                null}
            </div>
                {window.innerWidth > 500 ? 
                <div className={clsx(style.right)}>
                    <div onClick={handleShowPopup} className={clsx(style.wrapText, style.allCenter, style.noneBackground,style.orange)}>
                        <p> Create event </p>
                    </div>
                    <div ref={viewRef} onClick={handleOpenViews} className={clsx(style.container)}>
                        <p className={clsx(style.wrapText,style.allCenter,style.backgroundText)}>{props.view} <RiArrowUpSLine className={clsx(style.dropDownIcon,{
                            [style.dropDownIconActive] : openViews
                        })} /></p>
                        <div className={clsx(style.dropDown,{
                            [style.active] : openViews
                        })}>
                            <p onClick={()=>handleChooseView('month')} className={clsx(style.dropDownItem)}>Month</p>
                            <p onClick={()=>handleChooseView('week')} className={clsx(style.dropDownItem)}>Week</p>
                            <p onClick={()=>handleChooseView('day')} className={clsx(style.dropDownItem)}>Day</p>
                        </div>
                    </div>
                </div>
                :
                null
                }
        </div >
    );
}

export default Toolbar;