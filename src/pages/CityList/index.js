import React, { Component } from 'react'
//类似面包屑
import { NavBar, Icon } from 'antd-mobile';
// 准备拿仓库数据
import store from "../../store";
import { axios } from "../../utils/request"



export default class index extends Component {
    state = {
        // 汇总的城市列表数组
        totalCity: [],
    }
    getAllCitys = async () => {
        //  当前城市
        const cityName = store.getState().mapReducer.cityName;
        //获取热门城市
        const cityHot = (await axios("/area/hot")).body
        //获取全部城市
        const cityAll = (await axios("/area/city?level=1")).body
        const totalCity = [
            { "当前城市": [cityName] },
            { "热门城市": cityHot.map(v => v.label) },
        ]
        cityAll.sort((a, b) => a.short.localeCompare(b.short));

        cityAll.forEach(v => {
            //取首字母并大写
            let initial = v.short[0].toUpperCase();
            //定义index数组，由总的城市列表数组中的每一个对象的键名构成
            const index = totalCity.findIndex(vv => {
                // vv = { "当前地址": [cityName] },
                //      { "热门城市": ['广州'] }
                //在这里判断总的城市列表中是否存在有 以首字母作为键名的对象
                if (vv[initial]) {
                    return true;
                } else {
                    return false;
                }
            })
            // 8 判断 数组中是否存在 A 对象了
            if (index === -1) {
                // {A:[]} 不存在 
                totalCity.push(
                    // initial 是一个变量 而不是 对象中的一个属性
                    { [initial]: [v.label] }
                );
            } else {
                // totalCity 数组
                //  totalCity[index] 数组中的某个元素  == 对象 => {"A":[]}
                //  totalCity[index][initial] {"A":[]}.A 
                totalCity[index][initial].push(v.label);
            }
        })
        console.log(totalCity)
    }
    constructor() {
        super();
        //订阅store数据的变化 subscribe
        store.subscribe(this.getAllCitys)
    }
    componentDidMount() {
        //解构仓库中的当前城市，如果里面有值就获取（有值说明是从主页跳过来的，直接获取不需要订阅变化了）
        const { mapReducer } = store.getState();
        if (mapReducer.cityName !== "莫斯科") this.getAllCitys();
    }
    render() {
        return (
            <div className="city_list">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
            </div>
        )
    }
}

