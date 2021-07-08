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
      <img :src="business.image_url" alt="" />
      <p>Open: {{ business.is_closed }}</p>
      <p>Rating: {{ business.rating }} / 5</p>
      <p>Review Count: {{ business.review_count }}</p>
      <p>Cost: {{ business.price }}</p>
      <p>Phone Number: {{ business.display_phone || "None Listed" }}</p>
      <i>{{ business.location.display_address[0] + "," + " " + business.location.display_address[1] }}</i>
      <br />
      <h3>My Trips</h3>
      <div v-for="trip in trips" v-bind:key="trip.id">
        <i>{{ trip.name }}</i>
        <br />
        <button @click="addBusinessToTrip(trip, business)">Add to This Trip</button>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      businesses: [],
      currentBusiness: {},
      term: "",
      location: "",
    };
  },
  created: function () {
    axios.all([
      // axios.get(`/businesses/${this.$route.params.yelp_business_id}`).then((response) => {
      //   console.log("business object", response.data);
      //   this.business = response.data;
      // }),
      axios.get("/trips").then((response) => {
        console.log("Trips array", response.data);
        this.trips = response.data;
      }),
    ]);
  },
  methods: {
    runSearch: function () {
      axios.get(`/businesses?terms=${this.term}&location=${this.location}`).then((response) => {
        console.log("Businesses array", response.data);
        this.businesses = response.data;
      });
    },
    addBusinessToTrip: function (trip, business) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_business_id", business.id);
      axios
        .post("/tripbusiness", formData)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Business has been added to the trip!" });
          // setTimeout(() => {
          //   this.$router.push(`/trips/${trip.id}`);
          // }, 2000);
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            text: "Something went wrong...Business already exists in this trip.",
            title: error,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
