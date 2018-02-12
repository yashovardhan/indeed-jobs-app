import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likes from './likes_reducer';

export default combineReducers({
  auth,
  jobs,
  likes,
});
