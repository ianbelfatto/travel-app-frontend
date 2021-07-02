<template>
  <div class="businesses-show">
    <h2>{{ business.name }}</h2>
    <p>Open Now?: {{ business.open }}</p>
    <p>Rating: {{ business.rating }} / 5</p>
    <p>Location: {{ business.location[0] + "," + " " + business.location[1] }}</p>
    <router-link tag="button" to="/businesses/">Back to Search</router-link>
    <br />
    <br />
    <h3>Trips</h3>
    <div v-for="trip in trips" v-bind:key="trip.id">
      <p>{{ trip.name }}</p>
      <p>{{ trip.id }}</p>
      <button @click="addBusinessToTrip(trip)">Add</button>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      business: {},
      trips: [],
    };
  },
  created: function () {
    axios.all([
      axios.get(`/businesses/${this.$route.params.yelp_business_id}`).then((response) => {
        console.log("business object", response.data);
        this.business = response.data;
      }),
      axios.get("/trips").then((response) => {
        console.log("Trips array", response.data);
        this.trips = response.data;
      }),
    ]);
  },
  methods: {
    addBusinessToTrip: function (trip) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_business_id", this.business.id);
      axios
        .post("/tripbusiness", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/trips/mytrips");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
