import { describe, it } from 'node:test';
import { SupportedPrimitive } from './types';

export function assertAllPrimitiveCandidatesAreMergeable(
  primitives: SupportedPrimitive[],
  areTwoPrimitivesEqual: (a: SupportedPrimitive, b: SupportedPrimitive) => boolean
) {
  for(let i = 0; i < primitives.length - 1; i++) {
    for(let j = i + 1; j < primitives.length; j++) {
      if(!areTwoPrimitivesEqual(primitives[i], primitives[j]))
        throw new Error(
          `Failed to merge primitives ${primitives[i]} and ${primitives[j]}`
        );
    }
  }
}

describe('assertAllPrimitiveCandidatesAreMergeable function', () => {
  const compare = (a, b) => a === b
  it('doesn\'t fail with an empty array', () => {
    assertAllPrimitiveCandidatesAreMergeable([], compare)
  })
  it('doesn\'t fail with array of 1 value', () => {
    assertAllPrimitiveCandidatesAreMergeable([12], compare)
  })
  it('doesn\'t fail with array of 2 equal values', () => {
    assertAllPrimitiveCandidatesAreMergeable([12, 12], compare)
  })
  it('doesn\'t fail with array of 3 equal values', () => {
    assertAllPrimitiveCandidatesAreMergeable([12, 12, 12], compare)
  })
  it('fails with array of 2 non equal values', () => {
    try {
      assertAllPrimitiveCandidatesAreMergeable([12, 13], compare)
    } catch (error) {
      // TODO: assert instanceof specific error
      return;
    }
    throw new Error('Should\'ve failed')
  })
})
