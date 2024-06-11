export const generateRandomSlug = () => {
  const charsArray = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ]
  const { length } = charsArray
  let randomSlug = ''
  for (let index = 0; index < 6; index++) {
    let random = Math.random()
    randomSlug += charsArray[Math.floor(random * length)]
  }
  return randomSlug
}
