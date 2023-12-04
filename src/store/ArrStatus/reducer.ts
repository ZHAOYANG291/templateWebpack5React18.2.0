import ArrStatus from "./index";



let reducer=(state={...ArrStatus.state},action:{type:string,val:number})=>{
  let newState={...state}
  // switch (action.type) {
  //   case "push":
  //     ArrStatus.actions.arr_push(newState,action)
  //     break;
  //   case "pop" :
  //     ArrStatus.actions.arr_pop(newState,action)
  // }
  for(let key in ArrStatus.actions){
    if(action.type===key){
      //元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型
      (ArrStatus.actions as {[key: string]: Function})[key](newState, action)
      break
    }
  } 
  return newState
}
export default reducer
