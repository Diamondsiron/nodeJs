class CopyRightWebpackPlugin {
    constructor(options) {
      console.log(options);
    }
  
    apply(compiler) {
      //webpack对象 包含了整个构建周期
      compiler.hooks.emit.tapAsync(
        "CopyRightWebpackPlugin",
        (compilation, cb) => {
          compilation.assets["test.txt"] = {
            source: function() {
              return "hello txt";
            },
            size: function() {
              return 20;
            }
          };
          cb();
        }
      );
      compiler.hooks.compile.tap("CopyRightWebpackPlugin", compilation => {
        console.log("你想干什么");
      });
    }
  }
  
  module.exports = CopyRightWebpackPlugin;
  