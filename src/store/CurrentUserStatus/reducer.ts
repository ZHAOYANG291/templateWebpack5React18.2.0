import UserListStatus from "./index";

let reducer=(state={...UserListStatus.state},action:{type:string,val:string})=>{
  let newState={...state}
  //自动生成匹配方法
  for(let key in UserListStatus.actions){
    if(action.type===key){
      (UserListStatus.actions as {[key: string]: Function})[key](newState, action)
      break
    }
  }
  return newState
}
export default reducer