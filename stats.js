const correct = []

const createArr = () => {
  const number = Math.floor(Math.random() * 3)
  let arr = [false, false, false]
  arr[number] = true

  return arr
}

const getUnselectedIndex = (arr, selectionArr) => {
  if (arr[0] == false && selectionArr[0] == false)
    return 0
    if (arr[1] == false && selectionArr[1] == false)
    return 1
    if (arr[2] == false && selectionArr[2] == false)
    return 2
}

const removeWrongOption = (arr, selectionArr, unselectedIndex) => {
  arr.splice(unselectedIndex, 1)
  selectionArr.splice(unselectedIndex, 1)
}

const run = () => {
  const arr = createArr()
  let selectionArr = createArr()
  let unselectedIndex = getUnselectedIndex(arr, selectionArr)
  removeWrongOption(arr, selectionArr, unselectedIndex)
  selectionArr[0] = !selectionArr[0]
  selectionArr[1] = !selectionArr[1]

  if (arr[0]) {
    correct.push(selectionArr[0])
  } else {
    correct.push(selectionArr[1])
  }
}

for (let i = 0; i < 1000000; i++) {
  run()
}

const trueCount = correct.reduce((count, currentValue) => count + (currentValue === true ? 1 : 0), 0);
const percentage = (trueCount / correct.length) * 100;
console.log(percentage)