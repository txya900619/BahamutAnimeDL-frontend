import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/main.vue";
import NewAnimePage from "../components/NewAnimePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "NewAnimePage",
        component: NewAnimePage
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
