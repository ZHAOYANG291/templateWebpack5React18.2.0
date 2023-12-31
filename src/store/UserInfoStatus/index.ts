export default {
  state:{
    username:"",
    password:"",
    isLogin:false,
    tips:""
  },
  actions:{
    changeUserName(newState:{username:string},action:{type:string,val:string}){
      newState.username=action.val
    },
    changePassWord(newState:{password:string},action:{type:string,val:string}){
      newState.password=action.val
    },
    changeLoginStatus(newState:{isLogin:boolean},action:{type:string,val:boolean}){
      newState.isLogin=action.val
    },
    changeTips(newState:{tips:string},action:{type:string,val:string}){
      newState.tips=action.val
    }
  },
}