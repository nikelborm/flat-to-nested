import {
  FieldParsingInstructions,
  SupportedPrimitive,
  assertAllPrimitiveCandidatesAreMergeable,
  groupByKey
} from './src';
import { describe, it, test } from 'node:test';
import assert from 'node:assert';

// const config2 = {
//   schema: {
//     'array-of': {
//       'record-with-following-body': {
//         asd1: {
//           "primitive-of-type": 'string',
//           sqlColumnName: '',
//           nullable: false
//         },
//         asd2: {
//           "array-of": {
//             "primitive-of-type": 'boolean',
//             nullable: true,
//             sqlColumnName: ''
//           },
//           fieldsToGroupByRelativelyToParent: ['asd2']
//         },
//         asd3: {
//           "array-of": {
//             "record-with-following-body": {
//             }
//           },
//           fieldsToGroupByRelativelyToParent: ['asd2']
//         }
//       }
//     },
//     fieldsToGroupByRelativelyToParent: ['id']
//   },
//   areTwoPrimitivesEqual: (a, b) => a === b,
//   flatArray: [],
// } as const satisfies Parameters<typeof flatToNested>[0];

function flatToNested({ schema, areTwoPrimitivesEqual, flatArray }: {
  schema: FieldParsingInstructions,
  flatArray: Record<string, SupportedPrimitive>[],
  areTwoPrimitivesEqual: (a: any, b: any) => boolean
}) {
  // TODO: lookup through all sqlColumnName to be present (means no
  // undefined's) in initial flatArray
  // TODO: validate all objects in flatArray have the same set of keys

  // if ('record-with-following-body' in schema) {
  //   const accumulator = Object.create(null);
  //   for (
  //     const [ fieldName, fieldSchema ]
  //     of Object.entries(schema["record-with-following-body"])
  //   ) {
  //     const somehowReducedArray = [] as any[]; // ????
  //     accumulator[fieldName] = flatToNested({
  //       schema: fieldSchema,
  //       areTwoPrimitivesEqual,
  //       flatArray: somehowReducedArray
  //     })
  //   }
  //   return accumulator;
  // }
  if ('array-of' in schema) {
    schema['array-of']
    groupByKey(flatArray, schema.fieldsToGroupByRelativelyToParent[0])
    return []
  }
  if ('primitive-of-type' in schema) {
    const primitiveCandidates = flatArray.map((e) => e[schema.sqlColumnName]);
    assertAllPrimitiveCandidatesAreMergeable(
      primitiveCandidates,
      areTwoPrimitivesEqual
    );
    // ? How to handle the situation when there is either no value
    // ? or null value. Like for example when we expect no nullable
    // ? primitive and we get empty array
    return primitiveCandidates[0];
  }
  throw new Error('Schema type discriminator was\'t found')
}

function delegateToSpecificHandler() {

}

function turnArrayToPrimitive() {}

function turnArrayToRecord() {}

function turnArrayToArrayOfPrimitive() {}

function turnArrayToArrayOfRecord() {}

describe.skip('rendering of just single primitive value', () => {
  it('works fine with array of one value', () => {
    const result = flatToNested({
      schema: {
        "primitive-of-type": 'number',
        sqlColumnName: 'column1',
        nullable: false,
      },
      areTwoPrimitivesEqual: (a, b) => a === b,
      flatArray: [
        { id: 1, column1: 125 },
      ]
    })
    assert.deepStrictEqual(result, 125);
  })
  it('works fine with empty array of values', () => {
    const result = flatToNested({
      schema: {
        "primitive-of-type": 'number',
        sqlColumnName: 'column1',
        nullable: false,
      },
      areTwoPrimitivesEqual: (a, b) => a === b,
      flatArray: []
    })
    assert.deepStrictEqual(result, 125);
  })
})

test.skip('', () => {
  const result = flatToNested({
    schema: {
      "primitive-of-type": 'boolean',
      sqlColumnName: 'column1',
      nullable: false,
    },
    areTwoPrimitivesEqual: (a, b) => a === b,
    flatArray: [
      { id: 1, column1: 125 },
      { id: 2, column1: 124 },
      { id: 3, column1: 123 },
    ]
  })
  assert.deepStrictEqual(result, [125, 124, 123]);
})
