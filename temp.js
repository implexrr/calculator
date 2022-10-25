checkDuplicateDot (e, input) {
  if (e.target.textContent == ".") {
    if (this[input + "DotPresent"] == true) return true;
    else this[input + "DotPresent"] = true;
    return false;
  }
}