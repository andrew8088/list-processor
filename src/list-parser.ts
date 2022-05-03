type List = Array<string | List>;

const last = <T>(arr: T[]): T => arr[arr.length - 1];

export default function parse(list: string): any[] {
  const chars = list.trim().split('');
  const [_, ret] = parseList(chars, []);

  return ret;
}

function parseList(chars: string[], list: List): [string[], List] {
  while(chars.length > 0) {
    let char = chars.pop();

    if (!char) throw new Error("char not a char");

    if (char === '(') {
      const [newChars, newList] = parseList(chars, []);
      chars = newChars;
      list.push(newList);
    } else if (char === ')') {
      return [chars, list];
    } else if (char === ' ') {
      list.push('');
    } else {
      if (list.length > 0) {
        list[list.length - 1] = list[list.length  - 1] + char;
      } else {
        list.push(char);
      }
    }
  }
  return  [chars, list];
}
