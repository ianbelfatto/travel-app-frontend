import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/Users/Show.vue";
import TripsIndex from "../views/Trips/Index.vue";
import TripsShow from "../views/Trips/Show.vue";
import TripsNew from "../views/Trips/New.vue";
import TripsEdit from "../views/Trips/Edit.vue";
import BusinessesIndex from "../views/Businesses/Index.vue";
import BusinessesShow from "../views/Businesses/Show.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/about",
    name: "About", // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/:id", name: "users-show", component: UsersShow },

  { path: "/trips/mytrips", name: "trips-index", component: TripsIndex },
  { path: "/trips/:id", name: "trips-show", component: TripsShow },
  { path: "/trips", name: "trips-new", component: TripsNew },
  { path: "/trips/:id/edit", name: "trips-edit", component: TripsEdit },

  { path: "/businesses", name: "businesses-index", component: BusinessesIndex },
  { path: "/businesses/:yelp_business_id", name: "businesses-show", component: BusinessesShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
