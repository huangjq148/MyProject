var express = require('express')
var router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_code')
const config = require("../../config")
let dic = {
    codeId: "",
    tableName: "",
    codeName: "",
    valueName: ""
}


const queryDicPage = async function (req, res, next) {
    let result = await DbUtils.queryPage(req.body, "t_code_dic")
    res.json(ResponseResult.success(result))
}
const queryPage = async function (req, res, next) {
    let result = await DbUtils.queryPage(req.body)
    res.json(ResponseResult.success(result))
}

const code = async (req, res) => {
    const codeId = req.params.codeId;
    const codeInfo = await DbUtils.queryObj({ codeId }, "t_code_dic")

    if (codeInfo === "not found") {
        res.json(codeInfo)
    }
    let result = []
    if (codeInfo.tableName === "t_code") {
        result = await DbUtils.queryList({ codeId: codeId })
    } else {
        result = await DbUtils.queryList({}, codeInfo.tableName)
        result = result.map(item => ({ code: item[codeInfo.codeName], value: item[codeInfo.valueName] }))
    }
    res.json(ResponseResult.success(result))
}

const queryDatabaseTables = async function (req, res) {
    const database = config.dbInfo.database;
    const result = await DbUtils.query(`select table_name code,table_name value from information_schema.tables where table_schema='${database}'`)
    res.json(ResponseResult.success(result))
}

const updateDic = async (req, res) => {
    Utils.copyValue(dic, req.body)
    await DbUtils.update(dic, { codeId: dic.codeId }, "t_code_dic")
    res.json(ResponseResult.success("保存成功"))
}

module.exports = {
    code,
    queryPage,
    queryDicPage,
    queryDatabaseTables,
    updateDic
}
