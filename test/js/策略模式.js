const util = {
  rules: {
    // 姓名校验 由2-10位汉字组成
    username(str) { return /^[\u4e00-\u9fa5]{2,10}$/.test(str) },
    // 手机号校验 由以1开头的11位数字组成
    number(str) { return /^1\d{10}$/.test(str) },
    // 邮箱校验
    email(str) { return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str) }
  },
  validate(name, msg) {
    return function(value) {
      if (!util.rules[name](value)) {
        console.log(msg);
        return false
      }
      return true
    }
  }
}
function test(data, rules) {
  Object.keys(data).some(key => rules[key].some(e => !e.validator(data[key])))
}
let data = {
  username: '我我的',
  number: 188124678,
  email: '123@qq.com'
}
let rules = {
  username: [{
    validator: util.validate('username', '昵称2-10位汉字！')
  }],
  number: [{
    validator: util.validate('number', '请输入正确的手机号！')
  }],
  email: [{
    validator: util.validate('email', '邮箱不合法！')
  }],
}
test(data, rules)