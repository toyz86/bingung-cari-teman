<template>
  <section class="container">
    <div class="main-page">
      <form>
        <input type="text" v-model="keyword" placeholder="Cari">
          <span class="ml-4">Show Per:</span>

          <span class="navPerPage"
            :class="perPage === onPerPages && 'active'"
            v-for="(onPerPages, index) in perPageOptions"
            :key="index"
            @click="setPerPage(onPerPages)"
          >{{onPerPages}}</span>
      </form>

      <div class="pagination">
        <button class="pagination-button" @click="onFirstPage()">First</button>
        <button class="pagination-button" @click="prev()">&#8249;</button>
       
        <button class="pagination-button" v-for=" item in pages.slice(currentPage-1, currentPage+2)" 
          :class="{ 'active': item === currentPage }" 
          :key="item" @click="setPagination(item)">{{ item }}
        </button>

        <button class="pagination-button" @click="next()">&#8250;</button>
        <button class="pagination-button" @click="onLastPage()">Last</button>

      </div>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th v-for="column in columns" 
              :key="column" 
              @click="sortTable()">{{column}}
            </th>           
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in showData" v-bind:key="comment" class="data-table">
            <td scope="row">{{ comment.id }}</td>
            <td scope="row">{{ comment.name }}</td>
            <td scope="row">{{ comment.email }}</td>
            <td scope="row">{{ comment.body }}</td>
          </tr>
        </tbody>
      </table>

    <button @click="refreshData()">Refresh Data</button>
    </div>
  </section>
</template>

<script>

import axios from 'axios'

const perPageOptions = [10, 25, 50, 100]

export default {
  data () {
    return {
      perPageOptions,
      comments: [],
      currentPage: 1,
      perPage: 10,
      keyword: '',
      pages: [],
      columns: ['Id', 'Name', 'Email', 'About'],
    }
  },

  methods: {
    sortTable () {
      this.comments.sort()
    },
    setPagination(item){
      this.currentPage = item
    },
    refreshData () {
      window.location.reload();
    },
    getData () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
          axios.get("https://jsonplaceholder.typicode.com/comments")
          .then(response => {
            setTimeout(() => this.$nuxt.$loading.finish(), 500)
            this.comments = response.data;
          })
          .catch((err) => {
            this.$nuxt.$loading.finish()
            console.log(err);
            error({ statusCode: 404, message: 'Data tidak ditemukan' })
          })
      })
    },

    setPages () {
      let numberOfPages = Math.ceil(this.comments.length / this.perPage);
      console.log("total halaman", numberOfPages);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    updateCurrent() {
      this.currentPage = i;
    },
    updatePagination() {
      this.currentPage = 1;
      this.pages = Math.ceil(document.querySelectorAll('tbody tr').length / this.onPerPages)
    },        
    pagination (comments) {
      let page = this.currentPage;
      // console.log('page', page)
      let perPage = this.perPage;
      // console.log('per page', perPage)
      let from = (page * perPage) - perPage;
      // console.log('from', from);
      let to = (page * perPage);
      // console.log('to', to);
      return this.searchFilter.slice(from, to);
    },
    setPerPage(onPerPages) {
      this.perPage = onPerPages;
    },
    onFirstPage() {
      this.currentPage = 1;
    },
    onLastPage() {
      this.currentPage = this.rowOnPage;
    },
    prev() {
      if (this.currentPage != 1) {
        this.currentPage--;
      }
    },
    next() {
      if (this.currentPage < this.pages.length) {
        this.currentPage++;
      }
    },
  },

  created () {
    this.getData();
  },

  watch: {
    comments () {
      this.setPages();
    },
    keyword() {
      if (this.currentPage > this.rowOnPage)
        this.currentPage = this.rowOnPage
    }
  },

  computed: {
    searchFilter () {
      return this.comments.filter(comment => {
        const searchByName = comment.name.toString().toLowerCase().includes(this.keyword.toLowerCase());
        const searchByEmail = comment.email.toString().toLowerCase().includes(this.keyword.toLowerCase());

        if (searchByName) {
          return searchByName;
        }
        if (searchByEmail) {
          return searchByEmail;
        }
      })
    },
    showData () {
      return this.pagination(this.comments)
    },
    rowOnPage () {
      return Math.ceil(this.comments.length / this.perPage);
    },
  },
}
</script>
