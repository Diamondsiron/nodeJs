// import "@babel/polyfill";
const arr = [new Promise(() => {}), new Promise(() => {})];

arr.map(item => {
  console.log(item);
});

//我们只转换了let const 箭头函数等一些基础的语法
// promise是个什么鬼？标准浏览器知道，低版本浏览器呢？

// 我们把新特性的语法引入，不就行了？低版本浏览器解析也就没问题了。
// 体积变大了，我只使用promise,所有的新特性都引进来了，能不大吗？
// 能不能按需加载？就是我使用到了promise这个特性，你只需要把promise对应的特性语法加载进来，其他的不要
// 体积是不是就变小了？

//? polyfill是以一种什么方式引入新特性呢？

//!直接挂在全局对象上的，window!造成的后果是不是会污染全局变量？
// polyfill方式不适合构建开源库 UI库

// //foo.js 经过webpack babel帮我处理es6,7新特性
// // 可以构建成cdn形式的，
// <script src="http://xxxx.cdn.com/foo"></script>
