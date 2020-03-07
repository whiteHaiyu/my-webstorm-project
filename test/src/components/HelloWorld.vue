<template>
  <div id="magazine">
    <div style="background-color:red">1</div>
    <div style="background-color:blue">2</div>
    <div style="background-color:green">3</div>
    <div style="background-color:yellow">4</div>
    <div style="background-color:pink">5</div>
    <div style="background-color:purple">6</div>
  </div>
</template>
<script>
export default {
  name: "test",
  data:() =>({
    booklist:[]
  }),
  created() {
    $(window).ready(function() {
      $("#magazine").turn({
        display: "double",
        acceleration: true,
        gradients: !$.isTouch,
        elevation: 50,
        when: {
          turned: function(e, page) {
            console.log('Current view: ', $(this).turn('view'));
          }
        }
      });
    });

    $(window).bind("keydown", function(e) {
      if (e.keyCode == 37) $("#magazine").turn("previous")
      else if (e.keyCode == 39) $("#magazine").turn("next")
    });
  },
  methods: {}
};
</script>

<style>
body {
  background: #ccc;
}
#magazine {
  width: 1152px;
  height: 752px;
}
#magazine .turn-page {
  background-color: #ccc;
  background-size: 100% 100%;
}
</style>
