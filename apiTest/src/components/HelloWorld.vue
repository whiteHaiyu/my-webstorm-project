<template>
    <div>
      <div class="container">
        <input type="file" accept="image/*" @change="changeImg($event)" class="input">
      </div>

      <input type="button" @click="show">
    </div>
</template>

<script>

export default{
  data() {
    return{
      img:'',
      imgData:'',
      imgArr:[],
      imgSrc:'',
    }
  },

  methods: {
    show() {
      console.log(this.imgData)
      console.log(this.imgArr)
      console.log(this.imgSrc)
    },

    changeImg: function (e) {
        console.log(e)
      var imgLimit = 1024;
      var files = e.target.files;
      var image = new Image();
      if (files.length > 0) {
        var dd = 0;

          if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
            return false;
          }

          if (files.item(dd).size > imgLimit * 102400) {
            //to do sth
          } else {
            image.src = window.URL.createObjectURL(files.item(dd));
            image.onload = function () {
              // 默认按比例压缩
              var w = image.width,
                h = image.height,
                scale = w / h;
              w = 200;
              h = w / scale;
              // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
              var quality = 0.7;
              //生成canvas
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              // 创建属性节点
              var anw = document.createAttribute("width");
              anw.nodeValue = w;
              var anh = document.createAttribute("height");
              anh.nodeValue = h;
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh);
              ctx.drawImage(image, 0, 0, w, h);
              var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
              var base64 = canvas.toDataURL("image/" + ext, quality);
              // 回调函数返回base64的值
              console.log(base64)
            }
          }


      }
    },

  }

}
</script>

<style scoped>
  .container{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
  }
  .input{
    opacity: 0;
    width: 100px;
    height: 100px;

  }
</style>
