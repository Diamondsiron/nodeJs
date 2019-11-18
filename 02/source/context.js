module.exports = {
    get url() {
        return this.request.url
    },
    get body() {
        return this.response.body
    },
    set body(val) {
        this.response.body = val
    },
    get method() {
        return this.request.method
    }
}
//修改动态变量用proxy,definprototy, 修改静态变量修改get set方法即可