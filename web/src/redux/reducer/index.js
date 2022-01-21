import { combineReducers } from 'redux';
import { readLogListReducer, readLogInfoReducer } from '../reducer/readlog';


const appReducer = combineReducers({
    read_log_list: readLogListReducer,
    read_log_info: readLogInfoReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;