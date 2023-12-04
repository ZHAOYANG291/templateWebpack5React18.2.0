
import { Outlet,useNavigate,useParams } from "react-router-dom";



const Login:React.FC=()=>{
    const navigateTo=useNavigate()


    return (<>
    
    <div>
        登录界面
       <button onClick={()=>{navigateTo('/main/home')}}>点击去到主页</button>
    </div>
    </>)
}

export default Login
