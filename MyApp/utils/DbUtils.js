var mysql = require('mysql')
var http = require('http')
let UUID = require('node-uuid')
let Utils = require('./Utils')
let moment = require("moment")
// EQ 就是 EQUAL等于
// NE就是 NOT EQUAL不等于
// GT 就是 GREATER THAN大于
// LT 就是 LESS THAN小于
// GE 就是 GREATER THAN OR EQUAL 大于等于
// LE 就是 LESS THAN OR EQUAL 小于等于
const SEARCH_OPERATOR = {
	eq: "=",
	ne: "!=",
	gt: ">",
	lt: "<",
	ge: ">=",
	le: "<=",
	like: "like"
}

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'recorder',
	port: 3306
})

class DbUtils {
	constructor(tableName) {
		this.tableName = tableName
	}

	replaceWenHao(sql, params){
		let i = 0
		// let params = ["d818acf06c0a11eaa60bcb95426e4e52","h6u77d",7,"6hgy",7,7,"2020-03-22 15:37:55","d818acf06c0a11eaa60bcb95426e4e52"];
		let result = sql.replace(/\?/g,(item,index,c,d,e)=>{
			let arg = params[i++]
			if(isNaN(arg)){
				arg = '"'+arg+'"'
			}
			return arg
		})
		return result;
	}

	query(sql, params) {
		console.log('sql:' + sql)
		console.log('params:' + params)
		console.log("result---",this.replaceWenHao(sql, params))

		return new Promise(function (resolve, reject) {
			pool.getConnection(function (err, conn) {
				if (err) {
					reject(err)
				} else {
					conn.query(sql, params, function (qerr, vals, fields) {
						//释放连接
						conn.release()
						//事件驱动回调
						// callback(qerr, vals, fields)
						if (qerr == null) {
							resolve(vals, fields)
						} else {
							console.error(qerr)
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
		if (dataObj.id == '' || dataObj.id == undefined) {
			dataObj.id = UUID.v1().replace(/-/g, '')
		}
		if (!dataObj.createTime) {
			dataObj.createTime = moment().format("YYYY-MM-DD HH:mm:ss")
		}
		if(this.curUser){
			dataObj.createUser = this.curUser.username
		}
		for (let key in dataObj) {
			if (dataObj[key] || dataObj[key] === 0) {
				keys.push(key)
				values.push('?')
				params.push(dataObj[key])
			}
		}
		sql = sql.replace('{{keys}}', keys.join(','))
		sql = sql.replace('{{values}}', values.join(','))
		return this.query(sql, params).then(res=>({
			result: res,
			dataObj:dataObj
		}))
	}

	update(dataObj, updateParams, tableName) {
		let sql = `update ${tableName || this.tableName} set {{updateSql}} where 1=1 {{whereSql}}`
		let params = []
		let updateSql = []
		let whereSql = ''

		if (!dataObj.updateTime) {
			dataObj.updateTime = moment().format("YYYY-MM-DD HH:mm:ss")
		}
		if(this.curUser){
			dataObj.createUser = this.curUser.username
		}
		for (let key in dataObj) {
			if (dataObj[key] || dataObj[key] === 0) {
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
		return this.query(sql, params)
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

	queryList(queryParams, tableName) {
		let whereMap = queryParams.whereMap;
		let params = [];
		let whereMapSql = this.generateWhereSql(whereMap, params);
		let sql = `select * from ${tableName || this.tableName} where 1=1 `;
		sql += whereMapSql;
		return this.query(sql, params);
	}

	queryPage(queryParams, tableName) {
		let whereMap = queryParams.whereMap,
			sort = queryParams.sort,
			params = [],
			currentPage = queryParams.currentPage,
			pageSize = queryParams.pageSize

		let sql = `select * from ${tableName || this.tableName} where 1=1 `
		let whereMapSql,
			sortSql = '',
			limitSql = ''

		whereMapSql = this.generateWhereSql(whereMap, params);

		if (sort && sort.value) {
			sortSql += ` order by ${sort.key} ${Utils.sortable[sort.value]}`
		}
		if (!sortSql) {
			sortSql += ` order by createTime desc  `
		}

		if (pageSize) {
			let startIndex = (currentPage - 1) * pageSize
			limitSql = ` limit ${startIndex},${pageSize}`
		}

		let contentFn = this.query(sql + whereMapSql + sortSql + limitSql, params)
		let pageFn = this.query(`select count(*) total from (${sql + whereMapSql}) allRecord`, params)
		return Promise.all([contentFn, pageFn])
			.then(result => {
				return {resultObject: result[0], totalRecord: result[1][0]['total']}
			})
			.catch(reason => {
				return reason
			})
	}

	generateWhereSql(whereMap, params) {
		let whereMapSql = ""
		for (let key in whereMap) {
			let op = "="
			let tmpArr = key.split("_");
			let newKey = key;

			if (tmpArr.length > 1) {
				op = SEARCH_OPERATOR[key.substr(key.indexOf("_") + 1)]
				newKey = tmpArr[0]
			}

			if (whereMap[key]) {
				if (op === "like") {
					whereMapSql += ` and ${newKey} like concat('%',?,'%') `
				} else {
					whereMapSql += ` and ${newKey} ${op} ?`
				}
				params.push(whereMap[key])
			}
		}
		return whereMapSql;
	}

	queryObj(params, tableName) {
		let sql = `select * from ${tableName || this.tableName} where 1=1 `,
			whereMapSql = '',
			queryParams = []
		for (let key in params) {
			whereMapSql += ` and ${key} = ?`
			queryParams.push(params[key])
		}
		return this.query(sql + whereMapSql, queryParams)
			.then(result => {
				let responseResult = {}
				if (result.length > 0) {
					responseResult = result[0]
				} else {
					responseResult = Promise.reject("没有符合条件的数据")
				}
				return responseResult
			})
			.catch(reason => {
				return reason
			})
	}

	/**
	 * @param data	需要修改的数据
	 * @param whereMap 条件	{prop1: 3}
	 * @param tableName	表格名
	 */
	increase(data, whereMap, tableName){
		let querySql = `select * from ${tableName || this.tableName} where 1=1 `
		let updateSql = `update ${tableName || this.tableName} set {{update}} where 1=1 `
		let whereMapSql = ""
		let updateData = [];
		let params = [];
		for (let key in data) {
			updateData.push(` ${key} = ${key} + ?`)
			params.push(data[key])
		}
		whereMapSql = this.generateWhereSql(whereMap, params)
		updateSql += whereMapSql;
		updateSql = updateSql.replace("{{update}}",updateData.join(","))
		return this.query(updateSql, params)
	}
}

module.exports = DbUtils
