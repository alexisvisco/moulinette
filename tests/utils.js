module.exports = {
  captureOutput(f) {
    origin = console.log

    let str = ""

    console.log = (...n) => {
      str += n.join(" ")
      str += "\n"
    }

    f()

    console.log = origin

    return str
  }
}
