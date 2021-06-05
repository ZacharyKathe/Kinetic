import API from '../utils/API';
import Moment from "moment";

export default function updateGoals(token, goals) {
  let goalsToEnd = [];

  // Check if any goals have reached their end date
  const removeExpiredGoals = () => {
    for (const goal of goals) {
      if (Moment(goal.goal_finish).isBefore(Moment())) {
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
        const daysSinceRefresh = Moment().diff(Moment(goal.lastRefresh), 'days')
        console.log(Moment().format("MMMM Do") + ' is now and the goal refreshed ' + Moment(goal.lastRefresh).format("MMMM Do"));
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
        if (daysSinceRefresh > 31) {
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
