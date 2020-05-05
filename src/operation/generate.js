export const genConfigDetail = `query {
  generatorConfig {
    id
    author
    basePackage
    entityPackage
    mapperPackage
    mapperXmlPackage
    servicePackage
    serviceImplPackage
    controllerPackage
    isTrim
    trimValue
    javaPath
    resourcesPath
    date
    tableName
    tableComment
    className
  }
}`

export const tablesInfo = `query tablesInfo($tableName: String, $dataBase: String, $page: QueryRequest) {
  tablesInfo(tableName: $tableName, dataBase: $dataBase, page: $page) {
    data {
      name
      remark
      dataRows
      createTime
      updateTime
    }
    total
  }
}`

export const updateGenConfig = `mutation updateGenConfig($condition:GeneratorConfigCondition){
  updateGeneratorConfig(condition: $condition){
    id
    author
    basePackage
    entityPackage
    mapperPackage
    mapperXmlPackage
    servicePackage
    serviceImplPackage
    controllerPackage
    isTrim
    trimValue
    javaPath
    resourcesPath
    date
    tableName
    tableComment
    className
  }
}`

export const generate = `mutation generate($database: String, $name: String, $remark: String) {
  generate(database: $database, name: $name, remark: $remark)
}`
