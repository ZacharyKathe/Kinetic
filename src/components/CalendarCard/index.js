import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import API from '../../utils/API';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import CalendarGoalCard from '../CalendarGoalCard';
import './style.css'


export default function CalendarCard(props) {

  const [dateState, setDateState] = useState(new Date());
  const [userIncompleteGoals, setUserIncompleteGoals] = useState([]);
  const [userCompleteGoals, setUserCompleteGoals] = useState([]);
  const [completedDates, setCompletedDates] = useState([]);
  const history = useHistory();

  let completed = [];
  useEffect(() => {
    const token = localStorage.getItem('token')
    // Checks if user is logged in, and sends them to login if not
    if (!token) {
      history.push('/')
    }
    // gathers data from props and sets them as local state
    API.getIncompleteGoals(token).then(res => {
      setUserIncompleteGoals(res.data.Goals)
      // console.log(userIncompleteGoals)
    }).catch(err => {
      console.log(err);
    })

    API.getCompleteGoals(token).then(res => {
      setUserCompleteGoals(res.data.Goals)
      // console.log(userCompleteGoals)
      // console.log(userIncompleteGoals)
    }).catch(err => {
      console.log(err);
    })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAllGoals = userIncompleteGoals.concat(userCompleteGoals)
  // console.log("All Goals", userAllGoals)
  const incDive = userIncompleteGoals.map(goals1 => goals1.CompletedDates);
  const superInc = incDive.map(goals => goals.map(goals2 => goals2.completedDate))
  const flatIncomplete = superInc.flat()
  // console.log("Incomplete Goals", flatIncomplete)

  const comDive = userCompleteGoals.map(goals => goals.CompletedDates);
  const superCom = comDive.map(goals => goals.map(goals2 => goals2.completedDate))
  const flatComplete = superCom.flat();
  // console.log("Complete Goals", flatComplete)

  completed = flatComplete.concat(flatIncomplete);
  // console.log("Every Date", completed)
  const changeDate = (e) => {
    setDateState(e)
    // console.log(e)
    // console.log(moment(e).format('YYYY-MM-DD'))
  }

  const currentDate = moment(Date()).format('YYYY-MM-DD');
  const yesterday = moment(Date()).subtract(1, 'days').startOf('day').format('YYYY-MM-DD');
  const selectedDate = moment(dateState).format('YYYY-MM-DD');

  for (let i = 0; i < userAllGoals.length; i++) {
    const allCompleted = userAllGoals[i].CompletedDates;
    console.log(allCompleted)

  }


  const userIncGoals = userIncompleteGoals.map(goals => goals.goal_start)

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      for (let i = 0; i < userAllGoals.length; i++) {
        //Handles Checking and Unchecking Current Day's Completion
        if (moment(date).isBetween(userAllGoals[i].goal_start, moment(), 'days', '[]') && moment(date).format('YYYY-MM-DD') === currentDate && !userAllGoals[i].isComplete) {
          return (
            <Badge
              color='secondary'
              variant='dot'
              style={{
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
            </Badge>
          )
        }
        //Handles parsing completed dates to check if all goals for a day were checked off
        if (moment(date).isBetween(userAllGoals[i].goal_start, moment(), 'days', '[]')) {
          for (let b = 0; b < userAllGoals[i].CompletedDates.length; b++) {
            if ((userAllGoals[i].CompletedDates[b].completedDate === moment(date).format('YYYY-MM-DD'))) {
              return (
                <Badge
                  color='primary'
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
        }
        //Handles keeping past dates that were incompleted unchecked
        if (moment(date).isBetween(userAllGoals[i].goal_start, moment(), 'days', '[]')) {
          for (let b = 0; b < userAllGoals[i].CompletedDates.length; b++) {
            if (!(userAllGoals[i].CompletedDates[b].completedDate === moment(date).format('YYYY-MM-DD'))) {
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
        }

        if (moment(date).isBetween(moment(), userAllGoals[i].goal_finish, 'days', '(]')) {
          return (
            <Badge
                  color='error'
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

    }
  }

  //     if (view === 'month') {
  //       if (userAllGoals) {
  //         for (let i = 0; i < userAllGoals.length; i++) {
  //             if(moment(date).isBetween(userAllGoals[i].goal_start, moment(), 'days', '[]')) {
  //               for (let b = 0; b < completed.length; b++) {
  //                 if(!(moment(date).format('YYYY-MM-DD') === completed[b])) {
  //                   return (
  //                     <Badge 
  //                       color='secondary' 
  //                       variant='dot'
  //                       style={{
  //                         marginLeft: 5,
  //                         marginBottom: 10
  //                       }}
  //                     >      
  //                     </Badge>
  //                   )
  //                 } else {
  //                       return (
  //                         <Badge
  //                           color='primary'
  //                           variant='dot'
  //                           style={{
  //                               marginLeft:5,
  //                               marginBottom: 10,
  //                           }}
  //                         >
  //                         </Badge>
  //                       )
  //                 }     
  //               }
  //             }
  //         }
  //       }
  //     }  
  // }

  // for (let i = 0; i < completed.length; i++) {
  //   if(moment(date).format('YYYY-MM-DD') === completed[i]) {
  //     return (
  //       <Badge
  //         color='primary'
  //         variant='dot'
  //         style={{
  //             marginLeft:5,
  //             marginBottom: 10,
  //         }}
  //       >
  //       </Badge>
  //     )
  //   }     
  // }  
  // Check if a date React-Calendar wants to check is on the list of dates to add class to

  return (
    <div className='calendarCard'>
      <Calendar className='react-calendar'
        minDetail="year"
        value={dateState}
        onChange={changeDate}
        tileContent={tileContent}
      />
      <div className='calendar-goals'>
        {
          userAllGoals.map((item) => {
            return (
              ((selectedDate >= item.goal_start && selectedDate <= item.goal_finish) ?
                <CalendarGoalCard
                  goal_name={item.goal_name}
                  goal_description={item.goal_description}
                  goal_category={item.goal_category}
                  goal_frequency={item.goal_frequency}
                  goal_target={item.goal_target}
                  goal_progress={item.goal_progress}
                  goal_start={item.goal_start}
                  goal_finish={item.goal_finish}
                  value_type={item.value_type}
                  id={item.id}
                  completed_date={item.completedDate}
                  last_refresh={item.lastRefresh}
                  key={item.id}
                  token={props.token}
                // setUserGoals={setUserGoals}
                />
                : null)
            )
          })}
      </div>
    </div>
  )
}