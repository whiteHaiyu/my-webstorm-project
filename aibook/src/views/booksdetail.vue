<template>
  <div class='container'>
    <div class="booksdetail-title">Preview your personalized book for <span>{{booksdetail.character_name}}</span></div>
    <!-- <button @click="getPages">GetPage</button> -->
    <div class="book-reader" v-loading="loading">
      <book-reader class="book-reader" ref="reader" @func='closeLoading' v-if="refresh"></book-reader>
    </div>
    <div class="booksdetail-parameter">
      <el-input style="width:200px" v-model="user"></el-input>
      <el-button style="margin-left:15px" type="primary" @click="refreshBook">submit</el-button>
    </div>
  </div>
  <!-- http://3.137.32.201:8010/HttpService/GetPage?book_id=5c96bc2fd51e8ae6d773f8ff709765a8&page=1&width=1000&height=800 -->
</template>
<script>
import { GenBook, GetPage } from "@/api/book";
import bookReader from "../components/bookreader";
export default {
  name: "bookdetail",
  components: {
    bookReader
  },
  data: () => ({
    user: "koob.ai",
    loading:true,
    refresh:true,
    booksdetail: {
      // token: "",
      story_name: "lost_my_name",
      character_name: "koob.ai",
      character_id: "0",
      gender: "male"
    }
  }),
  mounted() {
    this.refreshBook()
  },
  methods: {
    refreshBook(){
      this.refresh = false
      if(this.user != ''){
        this.booksdetail.character_name = this.user
      }else{
        this.booksdetail.character_name = 'koob.ai'
      }
      this.loading = true
      this.$nextTick(() => {
        this.refresh = true
        this.getBook();
      })
    },

    getBook() {
      if (this.$getToken()) {
        this.booksdetail.token = this.$getToken();
      }
      GenBook(this.booksdetail)
        .then(res => {
          console.log(res);
          this.$store.commit("SET_BOOKID", res.book_id);
          let bookInfo = {
            book_id: res.book_id,
            page_count: res.page_count
          };
          this.$refs.reader.preaprePic(bookInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },

    closeLoading(){
      this.loading = false
    }

  }
};
</script>

<style lang='stylus' scoped>
.booksdetail-title
  margin:30px
  text-align:center
  font-size:20px
  span
    font-size 24px
    font-weight 800
.book-reader
  margin 30px
.booksdetail-parameter
  text-align center
</style>