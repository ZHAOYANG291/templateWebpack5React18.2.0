export default {
  state:{
    CurrentUser:""
  },
  actions:{
    changeCurrentUser(newState:{CurrentUser:string},action:{type:string,val:string}){
      newState.CurrentUser=action.val
    },
  },
}