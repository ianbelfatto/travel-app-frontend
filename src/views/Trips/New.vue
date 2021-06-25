<template>
  <div class="trips-new">
    <form v-on:submit.prevent="createTrip()">
      <h1>New Trip</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="newTripParams.name" />
      </div>
      <div class="form-group">
        <label>City:</label>
        <input type="text" class="form-control" v-model="newTripParams.city" />
      </div>
      <div class="form-group">
        <label>State:</label>
        <input type="text" class="form-control" v-model="newTripParams.state" />
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    newTripParams: {{ newTripParams }}
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
          this.$router.push("/trips/mytrips");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
