import clsx from "clsx";
import style from './TimeGutterHeader.module.scss'

function TimeGutterHeader() {
    return ( 
        <div className={clsx(style.wrapper)}>
            <p className={clsx(style.text)}>All day</p>
        </div>
     );
}

export default TimeGutterHeader;