<template>
  <div class="events-index">
    <section class="pt-md-10 sec-pb-70 pb-6 bg-light">
      <div class="section-title pt-md-8">
        <h1>Search for Events:</h1>
        <div class="form-group">
          Location:
          <form v-on:submit.prevent="runSearch()">
            <input
              type="text"
              v-model="location"
              class="form-control"
              placeholder="Enter a city and state (ex: Manhattan, NY)"
            />
            <br />
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="bg-light py-5">
      <div class="container">
        <div class="search-result-bar mb-0">
          <div class="ml-md-auto d-flex align-items-center justify-content-between">
            <!-- <div class="select-bg-transparent select-border">
              <select class="select-location">
                <option>Popular</option>
                <option>Nearest</option>
                <option>Recent</option>
              </select>
            </div> -->
            <!-- <div class="icons">
              <a class="mr-2" href="listing-grid-fullwidth.html">
                <i class="fa fa-th" aria-hidden="true"></i>
              </a>
              <a class="active" href="listing-list-fullwidth.html">
                <i class="fa fa-th-list" aria-hidden="true"></i>
              </a>
            </div> -->
          </div>
        </div>
        <div v-for="event in events" v-bind:key="event.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <img class="listing-img" :src="event.image_url" alt="" />
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <p>{{ event.name }}</p>
                    </h3>
                    <button
                      class="btn-like px-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favourite this listing"
                    ></button>
                  </div>
                </div>
                <span class="d-block mb-4 listing-address">
                  {{ event.location.display_address[0] }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <a :href="`${event.event_site_url}`" target="_blank">Event Link</a>
                </span>
                <span class="d-block mb-4 listing-address">
                  <b>Start:</b>
                  {{ event.time_start | formatDate }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <b>End:</b>
                  {{ event.time_end | formatDate }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <b>$ -</b>
                  {{ event.cost || "Free/No Price Listed" }}
                </span>
                <span class="d-block mb-4 listing-address">
                  {{ event.description }}
                </span>
                <div class="text-right">
                  <select v-model="selectedTripId" id="">
                    <option v-for="trip in trips" v-bind:key="trip.id" :value="trip.id">{{ trip.name }}</option>
                  </select>
                  <button @click="addEventToTrip(selectedTripId, event)" class="btn btn-warning btn-sm">
                    Add to This Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      selectedTripId: "",
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
    addEventToTrip: function (tripId, event) {
      const formData = new FormData();
      formData.append("trip_id", tripId);
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
            text: "Something went wrong...Event already exists in this trip OR trip not selected.",
            title: error,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
