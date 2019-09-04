import React, { Component, Fragment } from 'react';
import styles from "./index.module.scss";
import store from "../../store";
//引入路由中内置的鬼
import {withRouter} from "react-router-dom";

class index extends Component {
    constructor() {
        super();
        const storeState = store.getState();
        //设置cityname，同时取ctore对其赋值
        this.state = {
          cityName: storeState.mapReducer.cityName
        }
        //订阅store值的改变
        store.subscribe(this.handleStateChange);
      }
      //store值改变后触发的函数
      handleStateChange = () => {
        let cityName=store.getState().mapReducer.cityName
        //去掉末尾的‘市’字
        cityName = cityName.substr(0, cityName.length-1); 
        this.setState({
          cityName
        })
      }
    render() {
        // console.log(this.props)
        return (
            <Fragment>
                <div className={styles.search}>
                    <div className={styles.search_input}>
                        <div className={styles.city_name}>
                            <span className={styles.city_name_content} onClick={()=>this.props.history.push("/CityList")}>{this.state.cityName}</span>
                            <i className="iconfont icon-arrow"></i>
                        </div>
                        <div className={styles.city_input}>
                            <i className="iconfont icon-seach"></i>
                            <span className={styles.city_input_content}>请输入小区或地址</span>
                        </div>
                    </div>
                    <div className={styles.search_iont}>
                        <i className={"iconfont icon-map " + styles["icon-map"] }></i>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(index)