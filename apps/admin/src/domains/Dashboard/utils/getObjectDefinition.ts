import pluralize from 'pluralize'

const getObjectDefinition = (qcmsData: Record<string, any>, objectName: string) => {
  return qcmsData?.schema[pluralize.singular(objectName)]
}

export default getObjectDefinition
