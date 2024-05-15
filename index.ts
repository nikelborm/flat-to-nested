type FieldParsingInstructions =
  | RecordParsingInstruction
  | LiteralParsingInstruction
  | ArrayParsingInstruction;

type FieldNameOfRecord = string;

type RecordParsingInstruction = {
  'record-with-following-body': Record<FieldNameOfRecord, FieldParsingInstructions>,
  // to be continued???
}

type LiteralParsingInstruction = {
  'literal-of-type': 'string' | 'number' | 'boolean',
  sqlColumnName: string,
  nullable: boolean
}

type ArrayParsingInstruction = {
  'array-of': FieldParsingInstructions,
  fieldsToGroupByRelativelyToParent: string[]
}


const config = {
  schema: {
    'array-of': {
      'record-with-following-body': {
        asd1: {
          "literal-of-type": 'string',
          sqlColumnName: '',
          nullable: false
        },
        asd2: {
          "array-of": {
            "literal-of-type": 'boolean',
            nullable: true,
            sqlColumnName: ''
          },
          fieldsToGroupByRelativelyToParent: ['asd2']
        },
        asd3: {
          "array-of": {
            "record-with-following-body": {
            }
          },
          fieldsToGroupByRelativelyToParent: ['asd2']
        }
      }
    },
    fieldsToGroupByRelativelyToParent: ['id']
  },
  areTwoLiteralsEqual: (a, b) => a === b
} as const satisfies Config;

type Config = {
  schema: FieldParsingInstructions,
  areTwoLiteralsEqual: (a: any, b: any) => boolean
}
