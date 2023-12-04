import {legacy_createStore,combineReducers} from 'redux'
import UserInfoStatus from './UserInfoStatus/reducer' 
import CurrentUserStatus from './CurrentUserStatus/reducer' 
import ArrStatus from './ArrStatus/reducer'
//组个全部模块（reducer）
const reducers=combineReducers({
  ArrStatus,
  UserInfoStatus,
  CurrentUserStatus
})
//关联reducer和reduxthunk
const store=legacy_createStore(reducers)
export default store
/*创建并导出仓库*/