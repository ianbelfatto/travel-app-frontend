<template>
  <div class="trips-new">
    <!-- NEW TRIP   -->
    <section class="py-7 py-md-10 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card">
              <div class="bg-primary text-center py-4">
                <h2 class="text-white mb-0 h4">New Trip</h2>
              </div>
              <div class="card-body px-7 pt-7 pb-0">
                <form v-on:submit.prevent="createTrip()">
                  <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                  </ul>
                  <div class="form-group mb-7">
                    <label for="exampleInputText">Name*</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="emailHelp"
                      required
                      v-model="newTripParams.name"
                    />
                    <em>Enter a name for this trip.</em>
                  </div>
                  <div class="form-group mb-7">
                    <label for="exampleInputPassword1">City</label>
                    <input type="text" class="form-control" v-model="newTripParams.city" />
                    <em>Enter a city for this trip.</em>
                  </div>
                  <div class="form-group mb-7">
                    <label for="exampleInputPassword1">State</label>
                    <input type="text" class="form-control" v-model="newTripParams.state" />
                    <em>Enter a state for this trip.</em>
                  </div>
                  <div class="form-group mb-7">
                    <label for="exampleInputPassword1">Cover Image</label>
                    <input type="text" class="form-control" v-model="newTripParams.image_url" />
                    <em>Enter a Cover Image URL for this trip.</em>
                  </div>
                  <div class="form-group d-flex justify-content-between align-items-center mb-7">
                    <router-link :to="`/trips/mytrips`" class="btn btn-secondary">Back to My Trips</router-link>
                    &nbsp;
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>
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
      newTripParams: {},
      errors: [],
    };
  },
  methods: {
    createTrip: function () {
      axios
        .post("/trips", this.newTripParams)
        .then((response) => {
          console.log(response.data);
          this.$notify({ type: "success", text: "Successfully created a Trip!" });
          this.$router.push("/trips/mytrips");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.$notify({ type: "error", text: "Something went wrong...", title: error });
        });
    },
  },
};
</script>
