

const last = <T>(arr: T[]): T => arr[arr.length - 1];


type List = Array<string | List>;

export default function parse(list: string): any[] {
  const ret: List = [];

  for (const char of list.slice(1, -1)) {
    if (char === '(') {
      ret.push([]);
    } else if (char === ')') {
    } else if (char === ' ') {
    } else {
      let el = last(ret);
      if (typeof el === 'string') {
        ret[ret.length - 1] = el + char;
      } else {
        while (Array.isArray(last(el))) {

        }

      }



      while (Array.isArray(el)) el = last(el);

      el

    }
  }

  return ret;
}
