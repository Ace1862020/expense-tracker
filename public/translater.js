function categoryTranslater(category) {
  // switch方法，對比(category)裡的值，是否符合與'case'相同的條件
  switch (category) {
    case 'living':
      return '家居物業'
    case 'traffic':
      return '交通出行'
    case 'entertainment':
      return '休閒娛樂'
    case 'foods':
      return '餐飲食品'
    case 'other':
      return '其他'
  }
}

module.exports = categoryTranslater