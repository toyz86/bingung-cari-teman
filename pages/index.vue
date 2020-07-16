<template>
  <div class="container">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">About</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" v-bind:key="comment.key" class="data-table">
          <td scope="row">{{ comment.id }}</td>
          <td scope="row">{{ comment.name }}</td>
          <td scope="row">{{ comment.email }}</td>
          <td scope="row">{{ comment.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      comments: []
    }
  },
  mounted () {
    axios.get("https://jsonplaceholder.typicode.com/comments")
    .then(response => (this.comments = response.data))
  }
}
</script>

<style>
.container {
  margin: 50px auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

td {
  text-align: left;
  color: #343a40;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
