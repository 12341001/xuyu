<template>
    <div class="home">
        <ul class="home-tabs">
            <li
                @click="handleTab(item.tab)"
                class="home-tabs-item" :class="{actived: $route.query.tab? item.tab === $route.query.tab: item.tab === 'all',}" v-for="item in tabs" :key="item.id"
            >
                {{ item.label }}
            </li>
        </ul>
        <ul class="uls">
            <li class="lis" v-for="item in $store.state.lists" :key="item.id" @click="topic(item.id)">
                <img :src="item.author.avatar_url" alt="" />
                <div>
                    <p>{{ item.title }}</p>
                    <p >{{ item.last_reply_at | relativeTime }}</p>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Home",
    components: {},
    data() {
        return {
            //tabs
            tabs: [
                {
                    label: "全部",
                    tab: "all",
                    id: 0,
                },
                {
                    label: "精华",
                    tab: "good",
                    id: 1,
                },
                {
                    label: "分享",
                    tab: "share",
                    id: 2,
                },
                {
                    label: "问答",
                    tab: "ask",
                    id: 3,
                },
                {
                    label: "招聘",
                    tab: "job",
                    id: 4,
                },
            ],
            lists: [],
        };
    },
    methods: {
        //点击tab切换
        handleTab(tab) {
            this.$router.push({
                name: "Home",
                query: {
                    tab: tab,
                },
            });
            this.$store.dispatch("getTopics", this.$route);
        },
        topic(id){
            this.$router.push({
                name: "Topic",
                query: {
                    id: id,
                },
            });
            this.$store.dispatch("getdes", id);
        }
    },
    mounted() {
        //调用主题列表方法
        this.$store.dispatch("getTopics", this.$route);
    },
};
</script>
<style lang="scss" scoped>
.home {
    font-size: 0.14rem;
    .home-tabs {
        padding: 0.1rem;
        background-color: #f6f6f6;
        border-radius: 0.03rem 0.03rem 0 0;
        display: flex;
        .home-tabs-item {
            margin-right: 0.3rem;
            padding: 0.05rem;
        }
        .actived {
            background-color: goldenrod;
            color: #fff;
            border-radius: 0.03rem;
        }
    }
    .uls{
        width: 100%;
        height: auto;
        background: #fff;
        .lis {
            width: 100%;
            height: 0.6rem;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            img{
                height: 100%;
            }
            div{
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    }
}
</style>
