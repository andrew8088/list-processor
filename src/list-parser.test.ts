import fc from 'fast-check';
import parse from './list-parser';

const hasWhitespace = (s: string) => /\s/.test(s);
const hasOpen = (s: string) => s.includes('(');
const hasClose = (s: string) => s.includes(')');

const str = fc.string({ minLength: 1})
  .filter(str => !hasWhitespace(str) && !hasOpen(str) && !(hasClose(str)));

describe('list-parser', () => {
  it('parses lists', () => {
    fc.assert(fc.property(str, str, str, (a,b,c) => {
        const listStr = `(${a} ${b} ${c})`;
        expect(parse(listStr)).toEqual([a, b, c]);
      }
    ));
  });

  it('1, parses nested lists', () => {
      const [a, b, c, d, e] = "abcde".split('');
      const listStr = `(${a} ${b} (${c} ${d}) ${e})`;
      expect(parse(listStr)).toEqual([a, b, [c, d], e]);
  });

  it('parses nested lists', () => {
    fc.assert(fc.property(str, str, str, str, str, (a,b,c, d, e) => {
        const listStr = `(${a} ${b} (${c} ${d}) ${e})`;
        expect(parse(listStr)).toEqual([a, b, [c, d], e]);
      }
    ));
  });
});
