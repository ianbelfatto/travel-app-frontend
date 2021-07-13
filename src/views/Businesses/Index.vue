<template>
  <div class="businesses-index">
    <section class="pt-md-10 sec-pb-70 pb-6 bg-light">
      <div class="section-title pt-md-8">
        <h1>Search for Businesses:</h1>
        <div class="form-group">
          Term:
          <form v-on:submit.prevent="runSearch()">
            <input
              type="text"
              v-model="term"
              class="form-control"
              placeholder="Enter a term or terms separated by commas (ex: coffee or bar, vegan)"
            />
            <br />
            Location:
            <input
              type="text"
              v-model="location"
              class="form-control"
              placeholder="Enter a location by city and state (ex: San Diego, CA)"
            />
            <br />
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
        <br />
      </div>
    </section>
    <!-- BUSINESS SEARCH RESULTS -->
    <section class="bg-light py-5">
      <div class="container">
        <div class="search-result-bar mb-0">
          <div class="ml-md-auto d-flex align-items-center justify-content-between"></div>
        </div>
        <div v-for="business in businesses" v-bind:key="business.id">
          <div class="card card-list card-listing" data-lat="-33.922125" data-lag="151.159277" data-id="1">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="card-list-img">
                  <img class="listing-img" :src="business.image_url" alt="" />
                </div>
              </div>

              <div class="col-md-8 col-xl-9">
                <div class="card-body p-0">
                  <p style="color: SteelBlue">
                    <b>
                      {{ business.rating }} / 5
                      <span style="color: gold">&#9733;</span>
                      's
                    </b>
                  </p>

                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h3 class="card-title listing-title mb-0">
                      <p>{{ business.name }}</p>
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
                  {{ business.location.display_address[0] + "," + " " + business.location.display_address[1] }}
                </span>
                <span class="d-block mb-4 listing-address">
                  <a :href="`${business.url}`" target="_blank">Business Link</a>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>
                    <b>Cost:</b>
                    {{ business.price || "No Cost" }}
                  </p>
                </span>
                <span class="d-block mb-4 listing-address">
                  <p>
                    <b>Phone:</b>
                    {{ business.display_phone || "No Number Listed" }}
                  </p>
                </span>
                <div align="right">
                  <div class="input-group mb-4 w-75">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Select Trip</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01" v-model="selectedTripId" data-width="50%">
                      <option v-for="trip in trips" v-bind:key="trip.id" :value="trip.id">{{ trip.name }}</option>
                    </select>
                    &nbsp;
                    <button @click="addBusinessToTrip(selectedTripId, business)" class="btn btn-info btn-sm">
                      Add to This Trip
                    </button>
                  </div>
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
      businesses: [],
      currentBusiness: {},
      term: "",
      location: "",
      selectedTripId: "",
    };
  },
  created: function () {
    axios.all([
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
    addBusinessToTrip: function (tripId, business) {
      const formData = new FormData();
      formData.append("trip_id", tripId);
      formData.append("yelp_business_id", business.id);
      axios
        .post("/tripbusiness", formData)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Business has been added to the trip!" });
        })
        .catch((error) => {
          this.$notify({
            type: "error",
            text: "Something went wrong...Business already exists in this trip OR trip not selected.",
            title: error,
          });
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
