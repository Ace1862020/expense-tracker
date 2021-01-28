function generateIcon(category) {
  // switch 對比 category 裡的值，是否符合 case 條件
  switch (category) {
    case '家居物業':
      return 'fas fa-home'
      break;
    case '交通出行':
      return 'fas fa - shuttle - van'
      break;
    case '休閒娛樂':
      return 'fas fa - grin - beam'
      break;
    case '餐飲食品':
      return 'fas fa-utensils'
      break;
    case '其他':
      return 'fas fa-pen'
      break;
  }
}

module.exports = generateIcon