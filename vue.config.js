
module.exports = ({
  // transpileDependencies: true,
  lintOnSave:false,  //关闭语法检查
})

 

module.exports = ({
  devServer:{
    proxy:{
      '/api':{
        target:"http://gmall-h5-api.atguigu.cn",
        // pathRewrite:{'^/api':''},
      }
    }
},
  transpileDependencies: true,
})




