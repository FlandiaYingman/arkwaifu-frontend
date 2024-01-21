export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

export function getSizeFitInBox(width: number, height: number, boxWidth: number, boxHeight: number) {
  const ratio = Math.min(boxWidth / width, boxHeight / height)
  return {
    width: width * ratio,
    height: height * ratio,
  }
}
