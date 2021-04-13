module.exports = {
  printAlphabetReversed(capitalized, reverse) {
    let start = reverse ? 122 : 97
    let end = reverse ? 97 : 122

    if (capitalized) {
      start = reverse ? 90 : 65
      end = reverse ? 65 : 90
    }


    let chars = ""
    for (let i = start; reverse ? i >= end : i <= end; reverse ? i-- : i++) {
      chars += String.fromCharCode(i)
    }

    console.log(chars)
  }
}
