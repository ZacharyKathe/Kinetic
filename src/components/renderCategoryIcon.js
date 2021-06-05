import React from 'react'
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

export default function renderActivityIcon(props) {
  switch (props) {
    case "Diet":
      return (<RestaurantRoundedIcon />);
    case "Intellectual":
      return (<SchoolRoundedIcon />);
    case "Exercise":
      return (<DirectionsRunRoundedIcon />);
    case "Financial":
      return (<MonetizationOnRoundedIcon />);
    case "Habit":
      return (<BallotRoundedIcon />);
    case "Health":
      return (<FavoriteRoundedIcon />);
    case "Relationship":
      return (<SupervisedUserCircleRoundedIcon />);
    case "Work":
      return (<WorkRoundedIcon />);
    case "Productivity":
      return (<TrendingUpRoundedIcon />);
    case "Skill":
      return (<BuildRoundedIcon />);
    default: return (<AccessibilityNewRoundedIcon />);
  }



}
