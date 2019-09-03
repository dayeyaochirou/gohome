//大管理员收集地图管理员的信息
import mapReducer from "./mapReducer";
//引入组合管理员函数
import {combineReducers  } from "redux";
//将组合管理员和他下面的管理员一起暴露出去
export default combineReducers({mapReducer}); 