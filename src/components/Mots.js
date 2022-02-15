var Mots = [
    "eren",
    "mikasa",
    "armin",
    "jean",
    "sasha",
    "connie",
    "Livai",
    "erwin",
  "sieg"
]

function randomMots() {
  return Mots[Math.floor(Math.random() * Mots.length)]
}

export { randomMots }