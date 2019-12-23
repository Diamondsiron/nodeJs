module.exports = function(source) {
    //! 不能是箭头函数
  
    console.log(this.query, source);
    //! 必须要有返回值
    //   return source.replace("webpack", this.query.name);
    //! 如何返回多个信息
    //   const content = source.replace("webpack", this.query.name);
    //   this.callback(null, content);
    //! 有异步操作咋整 this.async
  
    const callback = this.async();
    setTimeout(() => {
      const content = source.replace("webpack", "world");
      callback(null, content);
    }, 0);
  };
  