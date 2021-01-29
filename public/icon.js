function generateIcon(category) {
  // switch方法，對比(category)裡的值，是否符合與'case'相同的條件
  switch (category) {
    case 'living':
      return 'fas fa-home'

    case 'traffic':
      return 'fas fa-shuttle-van'

    case 'entertainment':
      return 'fas fa-grin-beam'

    case 'foods':
      return 'fas fa-utensils'

    case 'other':
      return 'fas fa-pen'
  }
}

module.exports = generateIcon