<template>
  <div class="bookreader-container">
    <div ref="magazine" id="magazine">
      <div
        v-for="(item, index) in booklist"
        :key="index"
        :style="{background: 'url(' + item + ') center center #DADADA'}"
      ></div>
    </div>
    <div class="magazine-lastpage" @click="lastpage">
      <i class="el-icon-back"></i>
    </div>
    <div class="magazine-nextpage" @click="nextpage">
      <i class="el-icon-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data: () => ({
    booklist: [],
  }),

  methods: {
    preaprePic(data) {
      this.booklist = [];
      for (let i = 0; i < data.page_count; i++) {
        this.booklist.push(this.$myStore.base_url + "/HttpService/GetPage?book_id=" + data.book_id + "&page=" + i + "&width=500&height=400");
      }
      this.$nextTick(() => {
        this.createBook();
        this.$emit("func");
      });
      console.log(this.booklist);
    },

    lastpage() {
      $("#magazine").turn("previous");
    },

    nextpage() {
      $("#magazine").turn("next");
    },

    createBook() {
      $(window).ready(function() {
        $("#magazine").turn({
          width: 1000, //宽度
          height: 400, //高度
          display: "double",
          acceleration: true,
          gradients: !$.isTouch,
          elevation: 50,
          when: {
            turned: function(e, page) {
              console.log("Current view: ", $(this).turn("view"));
            }
          }
        });
      });

      $(window).bind("keydown", function(e) {
        if (e.keyCode == 37) {
          $("#magazine").turn("previous");
        } else if (e.keyCode == 39) {
          $("#magazine").turn("next");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
body {
  background: #ccc;
}

.bookreader-container {
  position: relative;

  #magazine {
    // width 1000px;
    // height 400px;
    min-height: 400px;
    // overflow: hidden;
    margin: 0 auto;
  }

  #magazine .turn-page {
    background-color: #ccc;
    background-size: 100% 100%;
  }

  .magazine-lastpage {
    position: absolute;
    top: 50%;
    left: calc(50% - 560px);
    font-size: 25px;
    cursor: pointer;
  }

  .magazine-nextpage {
    position: absolute;
    top: 50%;
    right: calc(50% - 560px);
    font-size: 25px;
    cursor: pointer;
  }
}
</style>
