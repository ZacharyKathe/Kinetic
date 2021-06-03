import React, {useState} from 'react';
import Calender from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

export default function CalenderCard() {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    return(
        <div className='calenderCard'>
        <Calender className='react-calender'
        minDetail="year"
        value={dateState}
        onChange={changeDate}
        />
      <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      </div>  
    )
}