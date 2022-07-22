function queryEmail (queryString) {
  const emailList = [
    { value: '@qq.com' },
    { value: '@163.com' },
    { value: '@gmail.com' },
    { value: '@foxmail.com' },
    { value: '@sina.com' },
    { value: '@126.com' },
    { value: '@sohu.com' },
    { value: '@yahoo.com.cn' },
    { value: '@msn.com' },
    { value: '@hotmail.com' },
    { value: '@ask.com' }
  ]
  let results = []
  const queryList = []
  // 提取出所有邮箱
  emailList.map((item) => {
    return queryList.push({ value: queryString.split('@')[0] + item.value })
  })
  // 邮箱填写过滤
  function createFilter (query) {
    return query.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
  results = queryString
    ? queryList.filter(createFilter)
    : queryList
  return results
}

export default queryEmail
