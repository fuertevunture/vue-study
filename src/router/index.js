import Home from "@/views/Home.vue";
import {createRouter, createWebHistory} from "vue-router";
import TodoList from "@/views/TodoList.vue";
import Weather from "@/views/Weather.vue";
import Test from "@/views/Test.vue";
import Clock from "@/views/Clock.vue";
const routes  = [
    {
        path:'/home',
        component:Home,
        name:"Home"
    },
    {
        path: "/test",
        component: Test,
        name: "Test"
    },
    {
        path: '/todoList',
        component: TodoList,
        name: "TodoList"
    },
    {
        path: '/weather',
        component: Weather,
        name: "Weather"
    },
    {
        path: '/clock',
        component: Clock,
        name:"Clock"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export {routes};
export default router;
