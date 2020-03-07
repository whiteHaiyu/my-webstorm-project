const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({ file }) => {
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: 37.5,
        propList: ['*'],
        minPixelValue: 2
      })
    ]
  }
}