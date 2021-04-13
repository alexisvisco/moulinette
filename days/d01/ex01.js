module.exports = {
  printAlphabet(capitalized) {
    let start = 97
    let end = 122

    if (capitalized) {
      start = 65
      end = 90
    }


    let chars = ""
    for (let i = start; i <= end; i++) {
      chars += String.fromCharCode(i)
    }

    console.log(chars)
  }
}
