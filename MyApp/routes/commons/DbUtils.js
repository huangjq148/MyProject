var mysql = require('mysql')
var http = require('http')
let UUID = require('node-uuid')
let Utils = require('./Utils')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myweb',
    port: 3306
})

class DbUtils {
    constructor(tableName) {
        this.tableName = tableName
    }

    query(sql, params) {
        console.log('sql:' + sql)
        console.log('params:' + params)
        return new Promise(function(resolve, reject) {
            pool.getConnection(function(err, conn) {
                if (err) {
                    reject(err)
                } else {
                    conn.query(sql, params, function(qerr, vals, fields) {
                        //释放连接
                        conn.release()
                        //事件驱动回调
                        // callback(qerr, vals, fields)
                        if (qerr == null) {
                            resolve(vals, fields)
                        } else {
                            reject(qerr)
                        }
                    })
                }
            })
        })
    }

    insert(dataObj, tableName) {
        let sql = `insert into ${tableName || this.tableName}({{keys}}) values({{values}})`
        let params = []
        let keys = []
        let values = []
        if (dataObj.id == '') {
            dataObj.id = UUID.v1().replace(/-/g, '')
        }
        if (dataObj.createTime == '') {
            dataObj.createTime = new Date()
        }
        for (let key in dataObj) {
            if (dataObj[key]) {
                keys.push(key)
                values.push('?')
                params.push(dataObj[key])
            }
        }
        sql = sql.replace('{{keys}}', keys.join(','))
        sql = sql.replace('{{values}}', values.join(','))
        return this.query(sql, params)
    }

    update(dataObj, updateParams) {
        let sql = `update ${this.tableName} set {{updateSql}} where 1=1 {{whereSql}}`
        let params = []
        let updateSql = []
        let whereSql = ''
        for (let key in dataObj) {
            if (dataObj[key]) {
                updateSql.push(` ${key}=?`)
                params.push(dataObj[key])
            }
        }
        for (let key in updateParams) {
            if (updateParams[key]) {
                whereSql += ` and ${key}=?`
                params.push(updateParams[key])
            }
        }
        sql = sql.replace('{{updateSql}}', updateSql)
        sql = sql.replace('{{whereSql}}', whereSql)
        return this.query(sql, params).catch(err => {
            console.log(err)
            return err
        })
    }

    delete(paramsObj, tableName) {
        let sql = `delete from ${tableName || this.tableName} where 1=1 `
        let params = []
        for (let key in paramsObj) {
            if (paramsObj[key]) {
                sql += ` and ${key}=?`
                params.push(paramsObj[key])
            }
        }
        return this.query(sql, params)
    }

    queryList(reqBody, tableName) {
        let condition = reqBody.condition,
            sort = reqBody.sort,
            page = reqBody.page,
            params = []

        let sql = `select * from ${tableName || this.tableName} where 1=1 `
        let conditionSql = '',
            sortSql = '',
            limitSql = ''

        for (let key in condition) {
            if (condition[key]) {
                conditionSql += ` and ${key} like concat('%',?,'%') `
                params.push(condition[key])
            }
        }

        if (sort && sort.value) {
            sortSql += ` order by ${sort.key} ${Utils.sortable[sort.value]}`
        }

        if (page) {
            let pageSize = page.size
            let startIndex = (page.number - 1) * pageSize
            limitSql = ` limit ${startIndex},${pageSize}`
        }

        let contentFn = this.query(sql + conditionSql + sortSql + limitSql, params)
        let pageFn = this.query(`select count(*) total from (${sql + conditionSql}) allRecord`, params)
        return Promise.all([contentFn, pageFn])
            .then(result => {
                return { list: result[0], total: result[1][0]['total'] }
            })
            .catch(reason => {
                return reason
            })
    }

    queryObj(params, tableName) {
        let sql = `select * from ${tableName || this.tableName} where 1=1 `,
            conditionSql = '',
            queryParams = []
        for (let key in params) {
            conditionSql += ` and ${key} = ?`
            queryParams.push(params[key])
        }
        return this.query(sql + conditionSql, queryParams)
            .then(result => {
                return result[0]
            })
            .catch(reason => {
                return reason
            })
    }
}

module.exports = DbUtils
