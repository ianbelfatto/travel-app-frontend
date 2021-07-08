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
      <b>{{ event.name }}</b>
      <p>{{ event.location.display_address[0] + "," + " " + event.location.display_address[1] }}</p>
      <br />
      <!-- Modal -->
      <button v-on:click="showEvent(event)" name="modal">More Info</button>
      <dialog id="event-details">
        <form method="dialog">
          <h1>{{ currentEvent.name }}</h1>
          <img :src="currentEvent.image_url" alt="" />
          <p>$ - {{ currentEvent.cost || "Free/No Price Listed" }}</p>
          <p>{{ currentEvent.description }}</p>
          <p>
            <a :href="`${currentEvent.event_site_url}`">Event Site</a>
          </p>
          <h3>My Trips</h3>
          <div v-for="trip in trips" v-bind:key="trip.id">
            <i>{{ trip.name }}</i>
            <br />
            <button @click="addEventToTrip(trip)">Add to This Trip</button>
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
    showEvent: function (event) {
      console.log("current event", event);
      this.currentEvent = event;
      document.querySelector("#event-details").showModal();
    },
    addEventToTrip: function (trip) {
      const formData = new FormData();
      formData.append("trip_id", trip.id);
      formData.append("yelp_event_id", this.currentEvent.id);
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
