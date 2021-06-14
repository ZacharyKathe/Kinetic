import API from '../utils/API';
import Moment from "moment";

export default function refreshGoals(token, goals) {

  // Check if any goals have reached their end date
  const removeExpiredGoals = () => {
    for (const goal of goals) {
      if (Moment(goal.goal_finish).isBefore(Moment().format("YYYY-MM-DD"))) {
        // Remove the goal that have reached their end date from API
        API.deleteGoal(goal.id, token).then(res => console.log('This goal has expired:', res.data));
      }
    }
  }



// Check which goals need to be refreshed based off their frequency
const renewGoals = () => {
  for (const goal of goals) {

    if (goal.goal_frequency === "Daily") {
      const daysSinceRefresh = Moment().diff(Moment(goal.lastRefresh), 'days')
      console.log("days since refresh for", goal, "is", daysSinceRefresh)
      // console.log(Moment().format("MMMM Do") + ' is now and the goal refreshed ' + Moment(goal.lastRefresh).format("MMMM Do"));
      // console.log(`days since daily refresh for ${goal.goal_name}:`, daysSinceRefresh);

      // Check if today is the day of refresh
      if (daysSinceRefresh > 0) {
        const goalObj = {
          goal_progress: 0,
          isComplete: false,
          lastRefresh: Moment().format("YYYY-MM-DD")
        }
        console.log("last refresh of this 'old' goal:", goalObj.lastRefresh, `${daysSinceRefresh} days ago`);
        API.editGoal(goal.id, goalObj, token).then(res => console.log('This goal has been refreshed:', goal));


      }
    }

    if (goal.goal_frequency === "Weekly") {

      const daysSinceRefresh = (Moment().diff((Moment(goal.lastRefresh)), 'days'))

      // console.log(`days since weekly refresh for ${goal.goal_name}:`, daysSinceRefresh);
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

      // console.log(`days since monthly refresh for ${goal.goal_name}:`, daysSinceRefresh);

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


async function updateGoals() {
  if (goals) {
    await removeExpiredGoals();
    await renewGoals();
  }
}

updateGoals();

}
