var express = require('express')
var router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_user')
const ACCOUNT_TABLE_NAME = 't_user_account'
let userInfo = {
  id: '',
  name: '',
  sex: '',
  avatar: ''
}
router.all('/*', function (req, res, next) {
  DbUtils.req = req
  Utils.copyValue(userInfo, req.body)
  next()
})


router.get('/logout', function (req, res, next) {
  delete req.session.curUser
  res.json(ResponseResult.success('logout'))
})


router.post('/list', async function (req, res, next) {
  let result = await DbUtils.queryPage(req.body)
  res.json(ResponseResult.success(result))
})

router.get('/:id', async function (req, res, next) {
  let result = await DbUtils.queryObj({ id: req.params.id })
  res.json(ResponseResult.success(result))
})

router.delete('/:id', async function (req, res) {
  await DbUtils.delete({ id: req.params.id })
  await DbUtils.delete({ userId: req.params.id }, ACCOUNT_TABLE_NAME)
  res.json(ResponseResult.success({}))
})

router.post('/', async function (req, res) {
  let result = await DbUtils.insert(userInfo)
  await DbUtils.insert({
    userId: result.dataObj.id,
    username: req.body.username,
    password: '000000',
    status: '0'
  }, ACCOUNT_TABLE_NAME)
  res.json(ResponseResult.success({}))
})

router.put('/', async function (req, res) {
  Utils.copyValue(userInfo, req.body)
  await DbUtils.update(userInfo, { id: userInfo.id })
  res.json(ResponseResult.success({}))
})


router.getUserInfo = async function (req, res, next) {

  if (req.session.curUser) {
    res.json(ResponseResult.success(req.session.curUser))
  } else {
    res.json({
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notice: [
        {
          id: 'xxx1',
          title: "Alipay",
          logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          description: '那是一种内在的东西，他们到达不了，也无法触及的',
          updatedAt: new Date(),
          member: '科学搬砖组',
          href: '',
          memberLink: '',
        },
        {
          id: 'xxx2',
          title: 'Angular',
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
          description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
          updatedAt: new Date('2017-07-24'),
          member: '全组都是吴彦祖',
          href: '',
          memberLink: '',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    })
  }
}

router.login = async function (req, res, next) {
  let queryParams = {
    username: req.body.username,
    password: req.body.password
  }
  let accountInfo = await DbUtils.queryObj(queryParams, 't_user_account')
  if (accountInfo.id) {
    const roles = accountInfo.roles
    let permissions = new Set()
    if (roles && (typeof roles === "string")) {
      const roleList = roles.split(",");
      for (let i = 0; i < roleList.length; i++) {
        const role = await DbUtils.queryObj({ code: roleList[i] }, "t_role")
        role.permissions && role.permissions.split(",").map(item => {
          permissions.add(item);
        })
      }
    }
    let userInfo = await DbUtils.queryObj({ id: accountInfo.userId })
    permissions = Array.from(permissions);
    req.session.curUser = {
      id: accountInfo.id,
      userId: userInfo.id,
      username: accountInfo.username,
      name: userInfo.name,
      sex: userInfo.sex,
      avatar: userInfo.avatar,
      permissions
    }
    console.log(req.session.curUser)
    res.json(ResponseResult.success(userInfo))
  } else {
    res.json(ResponseResult.fail(accountInfo))
  }
}

// module.exports = router
module.exports = router
