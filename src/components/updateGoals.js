import API from '../utils/API';
import Moment from "moment";

export default function updateGoals(token, goals) {
  let goalsToEnd = [];

  // Check if any goals have reached their end date
  const removeExpiredGoals = () => {
    for (const goal of goals) {
      if (Moment(goal.goal_finish).format("YYYY-MM-DD") === Moment().format("YYYY-MM-DD")) {
        goalsToEnd.push(goal)
      }
    }
    // Remove all the goals that have reached their end date from API
    for (const goal of goalsToEnd) {
      API.deleteGoal(goal.id, token).then(res => console.log('This goal has expired:', res.data));
    }
  }

  
  // Check which goals need to be refreshed based off their frequency
  const refreshGoals = () => {
    for (const goal of goals) {

      if (goal.goal_frequency === "Daily") {
        const daysSinceRefresh = (Moment().diff((Moment(goal.lastRefresh)), 'days'))
        console.log(`days since daily refresh for ${goal.goal_name}:`, daysSinceRefresh);
        
        // Check if today is the day of refresh
        if (daysSinceRefresh > 0) {
          const goalObj = {
            goal_progress: 0,
            isComplete: false,
            lastRefresh: Moment().format("YYYY-MM-DD")
          }
          API.editGoal(goal.id, goalObj, token).then(res => console.log('This goal has been refreshed:', goal));
          
          
        }
      }

      if (goal.goal_frequency === "Weekly") {
        // ARE LINES 34 TO 67 A WASTE OF MY TIME? PROBABLY

        // // Day when goal was completed:
        // const completedDate = Moment(goal.completeDate)

        // // How many days since it was completed:
        // const daysSinceCompleted = Moment().diff(completedDate, 'days')

        // // Find the day-of-week when the goal was started:
        // const startDayOfWeek = Moment(goal.goal_start).format("d");

        // // Get current day-of-week
        // const currDayOfWeek = Moment().isoWeekday();

        // // This will be the next day-of-week when the goal refreshes:
        // let nextWeekDayToRefresh;

        // // If the starting day-of-week is still in the same week as current day-of-week:
        // if (currDayOfWeek <= startDayOfWeek) {
        //   console.log(startDayOfWeek);
        //   const daysUntil = (startDayOfWeek - currDayOfWeek);

        //   nextWeekDayToRefresh = Moment().add(daysUntil, 'days');
        //   console.log(nextWeekDayToRefresh);

        //   // Else if the starting day-of-week is in the following week:
        // } else {
        //   const daysUntil = (currDayOfWeek - startDayOfWeek)
        //   nextWeekDayToRefresh = Moment().add(1, 'weeks').subtract(daysUntil, "days");
        // }


        // console.log("it has been", daysSinceCompleted, "days since goal was completed");
        // console.log('This goal was created on a', Moment(goal.goal_start).format('dddd'));
        // console.log('Today is a', Moment().format('dddd'));
        // console.log('That means that this goal will refresh on', nextWeekDayToRefresh.format("dddd, MM-DD"));

        const daysSinceRefresh = (Moment().diff((Moment(goal.lastRefresh)), 'days'))

        console.log(`days since weekly refresh for ${goal.goal_name}:`, daysSinceRefresh);
        // Check if today is the day of refresh
        if (daysSinceRefresh > 7) {
          const goalObj = {
            goal_progress: 0,
            isComplete: false,
            lastRefresh: Moment().format("YYYY-MM-DD")
          }
          API.editGoal(goal.id, goalObj, token).then(res => console.log('This goal has been refreshed:', goal));
          
          
        }
      }

      if (goal.goal_frequency === "Monthly") {
        // console.log(goal.goal_start);

        // Get how many days since last refresh
        const daysSinceRefresh = (Moment().diff((Moment(goal.lastRefresh)), 'days'))

        console.log(`days since monthly refresh for ${goal.goal_name}:`, daysSinceRefresh);

        // if it has been over 30 days since last refresh, refresh it.
        if (daysSinceRefresh > 30) {
          const goalObj = {
            goal_progress: 0,
            isComplete: false,
            lastRefresh: Moment().format("YYYY-MM-DD")
          }
          API.editGoal(goal.id, goalObj, token).then(res => console.log('This goal has been refreshed:', goal));
          
          
        }

      }
    }
  }

  

  // Take all the goals needing a refresh, and well, refresh them to the user's goal page
  // for (const goal of goalsToRefresh) {
  //   console.log(goal);
    
  //   const goalObj = {
  //     goal_progress: 0,
  //     isComplete: false,
  //     lastRefresh: Moment().format("YYYY-MM-DD")
  //   }
  //   API.editGoal(goal.id, goalObj, token).then(res => console.log('This goal has been refreshed:', res.data));
  // }

  async function updateGoals() {
    if(goals){
    await removeExpiredGoals();
    await refreshGoals();
   }
  }

  updateGoals();
}
