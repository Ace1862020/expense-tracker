function dateGroup(data) {
  let dates = []
  data.forEach(element => {
    return dates.push(element.date)
  });

  const filterDate = dates.filter((element, index, arr) => {
    return arr.indexOf(element) === index
  })

  let dateGroups = []
  filterDate.map((array) => {
    dateGroups.push({ 'date': array })
  })
  return dateGroups
}

module.exports = dateGroup