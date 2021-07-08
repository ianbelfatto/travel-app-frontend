import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Notifications from "vue-notification";
import moment from "moment";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm a");
  }
});

Vue.filter("yesno", function (value) {
  return value ? "Yes" : "No";
});

Vue.use(Notifications);

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
