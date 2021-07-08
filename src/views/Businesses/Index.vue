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
      <i>{{ business.location.display_address[0] + "," + " " + business.location.display_address[1] }}</i>
      <br />
      <br />
      <button v-on:click="showBusiness(business)" name="modal">More Info</button>
      <dialog id="business-details">
        <form method="dialog">
          <h1>{{ currentBusiness.name }}</h1>
          <img :src="currentBusiness.image_url" alt="" />
          <p>Open: {{ currentBusiness.is_closed }}</p>
          <p>Rating: {{ currentBusiness.rating }} / 5</p>
          <p>Review Count: {{ currentBusiness.review_count }}</p>
          <p>Cost: {{ currentBusiness.price }}</p>
          <p>Phone Number: {{ currentBusiness.display_phone || "None Listed" }}</p>
          <!-- <p>
            {{ currentBusiness.location.display_address[0] + "," + " " + currentBusiness.location.display_address[1] }}
          </p> -->
          <br />
          <br />
          <h3>My Trips</h3>
          <div v-for="trip in trips" v-bind:key="trip.id">
            <i>{{ trip.name }}</i>
            <br />
            <button @click="addBusinessToTrip(trip)">Add to This Trip</button>
            <br />
            <br />
          </div>
          <button>Close</button>
        </form>
      </dialog>
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
    showBusiness: function (business) {
      console.log("current business", business);
      this.currentBusiness = business;
      document.querySelector("#business-details").showModal();
    },
    addBusinessToTrip: function (trip) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_business_id", this.currentBusiness.id);
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
