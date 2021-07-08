<template>
  <div class="events-index">
    <h1>Search for Events:</h1>
    <br />
    Location:
    <input type="text" v-model="location" />
    <br />
    <button v-on:click="runSearch()">Search</button>
    <br />
    <br />
    <div v-for="event in events" v-bind:key="event.id">
      <h1>{{ event.name }}</h1>
      <br />
      <img :src="event.image_url" alt="" />
      <p>{{ event.location.display_address[0] + "," + " " + event.location.display_address[1] }}</p>
      <p>{{ event.time_start | formatDate }}</p>
      <p>$ - {{ event.cost || "Free/No Price Listed" }}</p>
      <p>{{ event.description }}</p>
      <p>
        <a :href="`${event.event_site_url}`">Event Site</a>
      </p>
      <h3>My Trips</h3>
      <div v-for="trip in trips" v-bind:key="trip.id">
        <i>{{ trip.name }}</i>
        <br />
        <button @click="addEventToTrip(trip, event)">Add to This Trip</button>
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
      events: [],
      currentEvent: {},
      location: "",
    };
  },
  created: function () {
    axios.all([
      // axios.get(`/events/${this.$route.params.yelp_event_id}`).then((response) => {
      //   console.log("event object", response.data);
      //   this.event = response.data;
      // }),
      axios.get("/trips").then((response) => {
        console.log("Trips array", response.data);
        this.trips = response.data;
      }),
    ]);
  },
  methods: {
    runSearch: function () {
      axios.get(`/events?location=${this.location}`).then((response) => {
        console.log("Events array", response.data);
        this.events = response.data;
      });
    },
    addEventToTrip: function (trip, event) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_event_id", event.id);
      axios
        .post("/tripevent", formData)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Event has been added to the trip!" });
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            text: "Something went wrong...Event already exists in this trip.",
            title: error,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
