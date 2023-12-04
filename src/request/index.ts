import axios from "axios";
import qs from "qs";

// 2.判别是否是开发环境还是生产环境
/**
 * development:开发环境
 * production:生产环境
 */
let baseURL = "";
if (process.env.NODE_ENV === "development") {
  // 开发环境
  // baseURL = "http://192.168.43.227:3003"; //
  baseURL = "http://localhost:5000/"; //
} else if (process.env.NODE_ENV === "production") {
  // 生产环境
  baseURL = "http://192.168.43.227:3003";
}

// 3.创建自定义axios
const axiosInstance = axios.create({
  baseURL,
  timeout: 11000,
});

type httpType = {
  get: Function;
  post: Function;
  put: Function;
  del: Function;
};

const http: httpType = {
  get: () => {},
  post: () => {},
  put: () => {},
  del: () => {},
};

// 4.请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 做令牌校验
    if (config.url !== "/logins/login") {
      // 做token令牌设置
      /*  config.headers.token = 1; */
    }

    console.groupEnd();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 5.响应拦截器
axiosInstance.interceptors.response.use(
  (res) => {
    /*     console.group('本次响应的地址为:', res.config.url);
      console.log(res.data); */
    // 统一做服务端响应的一些统一处理
    console.groupEnd();
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get(url: string, params = null) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { params })
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
}

// post方法
/**
 * 参数一:地址
 * 参数二:表单提交的数据
 * 参数三: isFile   是否包含有文件  默认值:false
 */

export function post(url: string, params: any, isFile = false) {
  // 参数序列化
  let data: string | FormData | null = JSON.stringify(params);
  // 设置请求头
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (isFile) {
    data = new FormData();
    for (let i in params) {
      data.append(i, params[i]);
    }
    // 处理请求头
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
  //处理带有文件的表单数据进行参数序列化及请求头的设置
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// put方法
/**
 * 参数一:地址
 * 参数二:表单提交的数据
 * 参数三: isFile   是否包含有文件  默认值:false
 */
export function put(url: string, params: any, isFile = false) {
  // 参数序列化
  let data = qs.stringify(params);
  let data2 = null;
  // 设置请求头
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //处理带有文件的表单数据进行参数序列化及请求头的设置
  if (isFile) {
    data2 = new FormData();
    for (let i in params) {
      data2.append(i, params[i]);
    }

    // 处理请求头
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// delete方法
/**
 * 参数一:url
 * 参数二:params  默认值为:null
 */
export function del(url: string, params = null) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, { params })
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
}

// //get方法
// // @returns {promises}
// http.get=(url:string)=>{
//     return axiosInstance.get(url)
// }

// //post方法
// http.post=(url:string,reqData:object)=>{
//     return axiosInstance.post(url,reqData)
// }

// //put方法
// http.put=(url:string,reqData:object)=>{
//     return axiosInstance.put(url,reqData)
// }

// //delete方法
// http.del=(url:string)=>{
//     return axiosInstance.delete(url)
// }

// export default http
