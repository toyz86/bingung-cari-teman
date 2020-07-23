<template>
  <section class="container">
    <loader v-if="onLoading" />
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
       
        <button class="pagination-button" v-for=" item in rowOnPage" 
          :class="{ 'active': item === currentPage }" 
          :key="item" @click="setPagination(item)">{{ item }}
        </button>

        <button class="pagination-button" @click="next()">&#8250;</button>
        <button class="pagination-button" @click="onLastPage()">Last</button>
      </div>
      <!-- debug: sortTable={{curSort}}, dir={{curSortDir}} -->
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th v-for="col in columns" 
              :key="col" 
              @click="sortTable(col)">{{col}}
            </th>           
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in pagination()" :key="comment.key" class="data-table">
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
import Loader from '~/components/loader.vue'

const perPageOptions = [10, 25, 50, 100]

export default {
  components: {
    Loader
  },
  data () {
    return {
      perPageOptions,
      comments: [],
      currentPage: 1,
      perPage: 10,
      pageRange: 5,
      keyword: '',
      columns: ['Id', 'Name', 'Email', 'About'],
      curSort:'ID',
      curSortDir:'asce',
      sortElm: 'id',
    }
  },

  methods: {
    sortTable (clickCol) {
      // console.log('sort', clickCol);
      this.curSort = clickCol;
      
      var sortElm;
      switch(clickCol) {
        case "Name":
          this.sortElm = "name";
          // console.log('ini', this.sortElm)
          break;
        case "Email":
          this.sortElm = "email";
          // console.log('ini', this.sortElm)
          break;
        case "About":
          this.sortElm = "body";
          // console.log('ini', this.sortElm)
          break;                  
        default:
          this.sortElm = "id";
          // console.log('ini', this.sortElm)
      }
      this.curSortDir = this.curSortDir === 'asce'? 'desc':'asce';
      this.comments.sort((a, b) => {
        let dir = 1;
        if (this.curSortDir === 'desc') dir = -1
        if (a[this.sortElm] < b[this.sortElm]) return -1 * dir;
        if (a[this.sortElm] > b[this.sortElm]) return 1 * dir;
        return 0;
      })
    },
    setPagination(item){
      this.currentPage = item
    },
    refreshData () {
      window.location.reload();
    },
    getData () {
      axios.get("https://jsonplaceholder.typicode.com/comments")
      .then(response => {
        this.comments = response.data;
      })
      .catch((err) => { 
        console.log(err);
        error({ statusCode: 404, message: 'Data tidak ditemukan' })
      })
    },
  
    pagination (comments) {
      let range = Math.ceil(this.pageRange / 2);
      console.log('range', range);
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
      if (this.currentPage < this.rowOnPage) {
        this.currentPage++;
      }
    },
  },

  created () {
    this.getData();
  },

  watch: {
    keyword() {
      if (this.currentPage > this.numberOfPages)
        this.currentPage = this.numberOfPages
    },
    rowOnPage () {
      this.currentPage = 1;
    }
  },

  computed: {
    onLoading() {
      return (this.comments.length <= 0)
    },
    searchFilter () {
      return this.comments.filter(comment => {
        const searchByName = comment.name.toString().toLowerCase().match(this.keyword.toLowerCase());
        const searchByEmail = comment.email.toString().toLowerCase().match(this.keyword.toLowerCase());

        if (searchByName) {
          return searchByName;
        }
        if (searchByEmail) {
          return searchByEmail;
        }
      })
    },
    rowOnPage () {
      return Math.ceil(this.comments.length / this.perPage);
    },
  },
}
</script>
