<template>
  <div class="businesses-index">
    <h1>Search a Destination:</h1>
    Term:
    <input type="text" v-model="term" />
    <br />
    Location:
    <input type="text" v-model="location" />
    <button v-on:click="runSearch()">Search</button>
    <p>{{ businesses }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      businesses: [],
      term: "",
      location: "",
    };
  },
  methods: {
    runSearch: function () {
      var params = {
        term: "",
        location: "",
      };
      axios.get("/businesses/", params).then((response) => {
        console.log("Businesses array", response.data);
        this.businesses = response.data;
      });
    },
  },
};
</script>
