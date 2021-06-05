import React, {useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {isSameDay} from 'react-dates';
import moment from 'moment';
import API from '../../utils/API';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

export default function CalendarCard(props) {

    const [dateState, setDateState] = useState(new Date());
    const [userIncompleteGoals, setUserIncompleteGoals] = useState([]);
    const [userCompleteGoals, setUserCompleteGoals] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        // Checks if user is logged in, and sends them to login if not
        if (!token) {
          history.push('/')
        }
        // gathers data from props and sets them as local state
        API.getIncompleteGoals(token).then(res => {
          setUserIncompleteGoals(res.data.Goals)
        }).catch(err => {
          console.log(err);
        })
    
        API.getCompleteGoals(token).then(res => {
            setUserCompleteGoals(res.data.Goals)
            // setUserGroups(res.data.Groups)
          }).catch(err => {
            console.log(err);
          })

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const changeDate = (e) => {
        setDateState(e)
        console.log(e)
        console.log(moment(e).format('MMMM Do YYYY'))
    }

    // const datesToAddContentTo = [props.tomorrow, props.in3Days, props.in5Days];
    const currentDate = moment(Date()).format('YYYY-MM-DD');
    const yesterday = moment(Date()).subtract(1, 'days').startOf('day').format('YYYY-MM-DD');
    const selectedDate = moment(dateState).format('YYYY-MM-DD');
    const datesToAddContentTo = [yesterday, currentDate, selectedDate];

    const userIncGoals = userIncompleteGoals.map(goals => goals.goal_start)
    function tileContent({ date, view }) {
        // Add class to tiles in month view only
        let dDate = moment(date).format('YYYY-MM-DD');

        if (view === 'month') {
            
        //    for (let i = 0; i < userGoals.length; i++) {
        //        if (dDate === userGoals[i]) {
        //            return (
        //             <Badge 
        //                 color='secondary' 
        //                 variant='dot'
        //                 style={{
        //                     marginLeft: 5,
        //                     marginBottom: 10
        //                 }}
        //             >
                        
        //             </Badge>
        //            )
        //        }   
        //    }

            for (let i = 0; i < userIncompleteGoals.length; i++) {
                if(moment(date).isBetween(userIncompleteGoals[i].goal_start, moment(), 'days', '[]'))
                 {
                    return (
                        <Badge 
                            color='secondary' 
                            variant='dot'
                            style={{
                                marginLeft: 5,
                                marginBottom: 10
                            }}
                        >      
                        </Badge>
                    )
                }  
            }

            for (let i = 0; i < userCompleteGoals.length; i++) {
                if(moment(date).isBetween(userCompleteGoals[i].goal_start, moment(), 'days', '[]'))
                return (
                    <Badge
                        color='primary'
                        variant='dot'
                        style={{
                            marginLeft: 5,
                            marginBottom: 10,
                            zIndex: 1
                        }}
                    >
                    </Badge>
                )
            }
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
        }
    }

    return(
        <div className='calendarCard'>
        <Calendar className='react-calendar'
        minDetail="year"
        value={dateState}
        onChange={changeDate}
        tileContent={tileContent}
        />
      <p>Current selected date is <b>{selectedDate}</b></p>
      <p>{(currentDate === selectedDate) ? "That's Today" : null}</p>
      <p>{(yesterday === selectedDate) ? "That was yesterday" : null}</p>
      </div>  
    )
}