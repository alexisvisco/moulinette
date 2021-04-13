module.exports = {
  printAllDigitsNTimes(n) {
    let start = 48
    let end = 57

    if (n === 0) {
      return
    }


    let chars = ''
    for (let i = 0; i < n; i++) {
      for (let i = start; i <= end; i++) {
        chars += String.fromCharCode(i)
      }
      if (i !== n -1) {
        chars += '\n'
      }
    }

    console.log(chars)
  }
}
