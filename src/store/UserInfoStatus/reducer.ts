import UserInfoStatus from "./index";

let reducer=(state={...UserInfoStatus.state},action:{type:string,val:string})=>{
  let newState={...state}
  //自动生成匹配方法
  for(let key in UserInfoStatus.actions){
    if(action.type===key){
      (UserInfoStatus.actions as {[key: string]: Function})[key](newState, action)
      break
    }
  }
  return newState
}
export default reducer