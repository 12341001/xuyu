import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lists: [],
        des:[]
    },
    mutations: {
        handleLists(state, data) {
            state.lists = data;
        },
        haddes(state,data){
            state.des = data
        }
    },
    actions: {
        //获取主题列表
        getTopics({ commit }, data) {
            return axios
                .get(
                    "https://cnodejs.org/api/v1/topics?tab=" +
                        (data.query.tab ? data.query.tab : "all")
                )
                .then((res) => {
                    if (
                        (res.status >= 200 && res.status < 300) ||
                        res.status === 304
                    ) {
                        if (res.data.success) {
                            commit("handleLists", res.data.data);
                            return res.data.data;
                        } else {
                            console.log('数据返回失败')
                        }
                    } else {
                        console.log('数据请求失败')
                    }
                });
        },
        getdes({ commit }, data) {
            return axios
                .get(
                    "https://cnodejs.org/api/v1/topic/" +data
                )
                .then((res) => {
                    if (
                        (res.status >= 200 && res.status < 300) ||
                        res.status === 304
                    ) {
                        if (res.data.success) {
                            commit("haddes", res.data.data);
                            return res.data.data;
                        } else {
                            console.log('数据返回失败')
                        }
                    } else {
                        console.log('数据请求失败')
                    }
                });
        },
    },
    modules: {},
});
