<template>
  <div>
    <div class="homepage_banner container_center">
      <p class="homepage_banner_title">Sale! Get the year’s best-loved personalized books</p>
      <a class="homepage_banner_button">Start</a>
    </div>

    <div class="homepage_createbook_container container">
      <div
        class="homepage_createbook_item"
        v-for="(item, index) in createBookList"
        :key="index"
        :style="{background: 'url(' + item.background + ') center center'}"
      >
        <div class="homepage_createbook_item_describe">{{ item.describe }}</div>
        <div class="homepage_createbook_item_title">{{ item.name }}</div>
        <el-button type="success" class="homepage_createbook_item_button hide_ipad">Create Your Book</el-button>
      </div>
    </div>

    <div class="homepage_describebook_container container">
      <div
        class="homepage_describebook_item"
        v-for="(item, index) in describeBookList"
        :key="index"
      >
        <img :src="item.icon_src" />
        <p class="homepage_describebook_item_title">{{ item.title }}</p>
        <p class="homepage_describebook_item_detail">{{ item.detail }}</p>
      </div>
    </div>

    <div class="homepage_booklist_separate container">
      <p>We support the love of reading across all ages</p>
    </div>

    <div class="homepage_createbook_container container">
      <div
        class="homepage_createbook_item"
        v-for="(item, index) in orderByAgeBookList"
        :key="index"
        :style="{background: 'url(' + item.background + ') center center'}"
      >
        <div class="homepage_createbook_item_describe">{{ item.name }}</div>
        <div class="homepage_createbook_item_title">{{ item.describe }}</div>
        <el-button type="success" class="homepage_createbook_item_button hide_ipad">Explore range</el-button>
      </div>
    </div>

    <div class="homepage_story container">
      <div class="homepage_story_img"></div>
      <div class="homepage_story_container">
        <div
          class="homepage_story_container_title"
        >Stories to raise confident, imaginative, book-loving kids</div>
        <div
          class="homepage_story_container_detail"
        >Turn a child into the hero of their own story—and nurture their imagination, confidence, and love of reading, for life.</div>
        <div class="homepage_story_container_button">Read our story</div>
      </div>
    </div>

    <div class="homepage_booklist_separate container">
      <p>More best-selling personalized books</p>
    </div>

    <div class="homepage_bestselling_container container">
      <div
        class="homepage_bestselling_item"
        v-for="(item, index) in createBookList"
        :key="index"
      >
        <div class="homepage_bestselling_background" :style="{background: 'url(' + item.background + ') center center'}"></div>
        <div class="homepage_bestselling_content">
            <div class="homepage_bestselling_item_describe">{{ item.describe }}</div>
            <div class="homepage_bestselling_item_title">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- <div class="homepage_booklist_separate container">
      <p>What our marvelous customers say about us</p>
    </div>

    <div class="homepage_booklist_separate container">
      <p>Give a gift they'll treasure forever</p>
    </div> -->

    <div class="homepage_booklist_separate container">
      <p>Get more clever ideas and swashbuckling updates</p>
      <div class="homepage_email">
        <input type="email" v-model="userEmail"  name="email" placeholder="Enter your email address"><label for="email" @click="submitEmail">Sign me up</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data() {
    return {
      userEmail:'',
      createBookList: [
        {
          name: "Where Are You...",
          describe: "Hours of fun",
          background: require("../assets/homepage/homepage_booklist1.jpg")
        },
        {
          name: "Lost My Name",
          describe: "Worldwide Bestseller",
          background: require("../assets/homepage/homepage_booklist2.jpg")
        },
        {
          name: "Bedtime For You",
          describe: "Profect For Bedtimes",
          background: require("../assets/homepage/homepage_booklist3.jpg")
        }
      ],
      describeBookList: [
        {
          title: "Rated 5 stars",
          detail: "Trustpilot have rated us as excellent. Hooray!",
          icon_src: require("../assets/homepage/homepage_icon1.png")
        },
        {
          title: "Free dedication",
          detail: "Make it extra personal, with a loving message",
          icon_src: require("../assets/homepage/homepage_icon2.png")
        },
        {
          title: "5 million sold",
          detail: "Our books have delighted oodles of children",
          icon_src: require("../assets/homepage/homepage_icon3.png")
        },
        {
          title: "97% satisfaction",
          detail: "Our customers think we're pretty special!",
          icon_src: require("../assets/homepage/homepage_icon4.png")
        }
      ],
      orderByAgeBookList: [
        {
          name: "0-3 years old",
          describe: "Early years",
          background: require("../assets/homepage/homepage_booklist4.jpg")
        },
        {
          name: "3-6 years old",
          describe: "Starting school",
          background: require("../assets/homepage/homepage_booklist5.jpg")
        },
        {
          name: "6+ years old",
          describe: "Growing readers",
          background: require("../assets/homepage/homepage_booklist6.jpg")
        }
      ]
    };
  },
  created(){
    console.log(this.$store.state.user.uuid)
  },

  methods: {
    submitEmail(){
      console.log(this.userEmail)
    }
  }
};
</script>

<style scoped>
@import "../styles/homepage.css";

.homepage_email{
  font-size: 20px;
  font-weight: normal;
  width: 100%;
  margin: 15px auto;
}
.homepage_email > input{
  min-width: 300px;
  padding: 10px;
  border: 1px solid #808080;
}
.homepage_email > label{
  border: 2px solid #808080;
  margin: 25px;
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
}

</style>