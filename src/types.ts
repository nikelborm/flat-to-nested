export type FieldParsingInstructions =
  // | RecordParsingInstruction
  | PrimitiveParsingInstruction
  | ArrayParsingInstruction;

export type FieldNameOfRecord = string;

export type NameOfSupportedPrimitive = 'string' | 'number' | 'boolean';

export type SupportedPrimitive = string | number | boolean;

export type RecordParsingInstruction = {
  'record-with-following-body': Record<
    FieldNameOfRecord,
    FieldParsingInstructions
  >,
  // to be continued???
}

export type PrimitiveParsingInstruction = {
  'primitive-of-type': NameOfSupportedPrimitive,
  sqlColumnName: string,
  nullable: boolean
}

export type ArrayParsingInstruction = {
  'array-of': FieldParsingInstructions,
  fieldsToGroupByRelativelyToParent: string[]
}
