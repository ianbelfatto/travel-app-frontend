<template>
  <div class="businesses-index">
    <h1>Search a Destination:</h1>
    Term:
    <input type="text" v-model="term" />
    <br />
    Location:
    <input type="text" v-model="location" />
    <br />
    <button v-on:click="runSearch()">Search</button>
    <br />
    <br />
    <div v-for="business in businesses" v-bind:key="business.id">
      <b>{{ business.name }}</b>
      <br />
      <i>{{ business.location.display_address[0] + business.location.display_address[1] }}</i>
      <br />
      <br />
      <router-link tag="button" :to="`/businesses/${business.id}`">More Info</router-link>
      <br />
      <br />
    </div>
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
      axios.get(`/businesses?terms=${this.term}&location=${this.location}`).then((response) => {
        console.log("Businesses array", response.data);
        this.businesses = response.data;
      });
    },
  },
};
</script>
