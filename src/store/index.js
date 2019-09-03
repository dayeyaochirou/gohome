
import reducer from "./reducer";
//引入创造store的函数
import {createStore  } from "redux";
//将store和它的管理员一起暴露出去
export default createStore(reducer); 