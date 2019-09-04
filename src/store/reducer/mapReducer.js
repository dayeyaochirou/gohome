//引入type
import { CITY_SET } from "../actionTypes";

// 1 默认数据
const defaultState = {
    cityName: "莫斯科"
}
  // 2 对外暴露一个函数
  // 1 state 等于什么 那么我们在 组件中就可以使用这个数据 
  // 2 action 后期需要根据这个action 来判断 数据的 crud  
  export default (state = defaultState, action) => {
    const {value,type}=action;
    let newState=JSON.parse(JSON.stringify(state));
    switch (type) {
        case CITY_SET:
          newState.cityName=value;
        //   console.log(newState);
          return newState;
    
         default:
          break;
      }
    return state;
 }