import { describe, it } from 'node:test';
import { FieldParsingInstructions, SupportedPrimitive } from './types';

export function assertAllSqlColumnNamesPresent(
  schema: FieldParsingInstructions,
  flatArray: Record<string, SupportedPrimitive>[]
) {

}

describe('assertAllSqlColumnNamesPresent function', () => {
  const compare = (a, b) => a === b
  it('doesn\'t fail with an empty array', () => {
    assertAllSqlColumnNamesPresent([], compare)
  })
  it('doesn\'t fail with array of 1 value', () => {
    assertAllSqlColumnNamesPresent([12], compare)
  })
  it('doesn\'t fail with array of 2 equal values', () => {
    assertAllSqlColumnNamesPresent([12, 12], compare)
  })
  it('doesn\'t fail with array of 3 equal values', () => {
    assertAllSqlColumnNamesPresent([12, 12, 12], compare)
  })
  it('fails with array of 2 non equal values', () => {
    try {
      assertAllSqlColumnNamesPresent([12, 13], compare)
    } catch (error) {
      // TODO: assert instanceof specific error
      return;
    }
    throw new Error('Should\'ve failed')
  })
})
