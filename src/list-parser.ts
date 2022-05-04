type List = Array<string | List>;

export default function parse(list: string): string | List {
  const chars = list.trim().split('');
  const [_, [ret]] = parseList(chars, []);
  return ret;
}

function parseList(chars: string[], list: List): [string[], List] {
  let nextNew = true;
  while(chars.length > 0) {
    let char = chars.shift();
    if (!char) throw new Error("char not a char");

    if (char === '(') {
      const [newChars, newList] = parseList(chars, []);
      chars = newChars;
      list.push(newList);
    } else if (char === ')') {
      return [chars, list];
    } else if (char === ' ') {
      nextNew = true;
    } else if (nextNew) {
      list.push(char);
      nextNew = false;
    } else {
      list[list.length - 1] = list[list.length  - 1] + char;
    }
  }
  return  [chars, list];
}
