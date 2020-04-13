import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/main.vue";
import NewAnimePage from "../components/NewAnimePage.vue";
import AllAnimePage from "../components/AllAnimePage.vue";

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
      },
      {
        path: "/Animations",
        name: "AllAnimePage",
        component: AllAnimePage
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
