const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
// const routeHandler = require( './routeHandle.js' );
// server.use( jsonServer.rewriter( routeHandler( db ) ) )
// const router = jsonServer.router( db )
server.use(middlewares)

server.get('/isoc/api/v1/big_screen/get_data', (req, res) => {
  console.log(req.query);
  const type = req.query.type;
  let result = {}
  if (type === 'abnormal_flow') {
    result = {
      data: {
        total: 26,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        time: ["2022-03-16 00:00", "2022-03-16 00:09", "2022-03-16 00:18", "2022-03-16 00:27", "2022-03-16 00:36"]
      },
      status: 200
    }
  }
  if (type === 'special_event') {
    result = {
      data: {
        total: 0,
        data: [{ 挖矿样本: 0 }, { 勒索软件: 0 }, { 广告软件: 0 }, { 僵尸网络: 0 }, { 木马: 0 }]
      },
      status: 200
    }
  }
  if (type === 'network_invade') {
    result = {
      data: {
        total: 130,
        data: [{ count: 24, name: "注入型攻击" },
        { count: 23, name: "通用网络攻击" },
        { count: 19, name: "webshell攻击" },
        { count: 17, name: "反序列化攻击" },
        { count: 15, name: "拒绝服务攻击" },
        { count: 32, name: "其他" }]
      },
      status: 200
    }
  }
  if (type === 'analysis_method') {
    result = {
      data: {
        total: 502,
        data: [{ count: 361, name: "告警分析" }, { count: 130, name: "多源关联分析规则" }, { count: 11, name: "失陷资产类事件" }]
      },
      status: 200
    }
  }
  if (type === 'inner_attacker_type') {
    result = {
      data: {
        total: 502,
        data: [{ count: 16, type: "通用网络攻击" },
        { count: 8, type: "注入型攻击" },
        { count: 5, type: "反序列化攻击" },
        { count: 4, type: "webshell攻击" },
        { count: 4, type: "疑似失陷资产事件" }]
      },
      status: 200
    }
  }
  if (type === 'outer_attacker') {
    result = {
      data: {
        total: 502,
        data: [{ count: 4, ip: "192.168.12.2", percent: "36.36%", country_code: "", country: "" },
        { count: 2, ip: "2.2.2.2", percent: "18.18%", country_code: "FR", country: "法国" },
        { count: 2, ip: "10.253.130.73", percent: "18.18%", country_code: "", country: "" },
        { count: 2, ip: "192.168.80.6", percent: "18.18%", country_code: "", country: "" },
        { count: 1, ip: "20.20.20.20", percent: "9.09%", country_code: "US", country: "美国" }]
      },
      status: 200
    }
  }
  if (type === 'network_security') {
    result = {
      data: {
        total: 502,
        data: [{ count: 15, name: "拒绝服务攻击" },
        { count: 8, name: "注入型攻击" },
        { count: 6, name: "账号暴力破解" },
        { count: 5, name: "疑似失陷资产事件" },
        { count: 4, name: "webshell攻击" }]
      },
      status: 200
    }
  }
  if (type === 'apt_attacker_organization') {
    result = {
      data: [{ name: '1234', count: 1236 }, { name: '52454', count: 55858 }],
      status: 200
    }
  }

  if (type === 'asset_risk') {
    result = {
      data: {vul_index: 10, status_index: 5, risk_index: 5, status_desc: "中", risk_desc: "中", threat_index: 0},
      status: 200
    }
  }

  if (type === 'run_status') {
    result = {
      data: {offline_device: 8,
        online_device: 12,
        run_time: "24天",
        system_bug: 97,
        total_asset: 45,
        total_device: 20,
        total_event: 0,
        total_log: 0,
        total_nti: 225610,
        web_bug: 6},
      status: 200
    }
  }

  if (type === 'kill_chain_stage') {
    result = {
      data: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, '-1': 0},
      status: 200
    }
  }

  if (type === 'special_rectify') {
    result = {
      data: {scence_id: 4, 挖矿: 0, 僵木蠕: 0, 勒索: 0, 弱口令: 0},
      status: 200
    }
  }

  res.send(result)
})

server.get('/asset/assetTopo/topoInfo', (req, res) => {
  let result = {
    data: {
      topoNum: 1, topoList: [{
        id: 1,
        isDefault: false,
        metadata: "{\"data\": {\"locked\": 0, \"lineName\": \"line\", \"pens\": [{\"lastImage\": \"assets/image/topo/web.png\", \"borderRadius\": 0, \"iconRect\": {\"center\": {\"y\": 162, \"x\": 293}, \"height\": 42, \"width\": 50, \"ey\": 183, \"ex\": 318, \"y\": 141, \"x\": 268}, \"image\": \"assets/image/topo/web.png\", \"animateType\": \"\", \"fillStyle\": \"\", \"dash\": 0, \"visible\": true, \"bkType\": 0, \"paddingBottomNum\": 0, \"imageAlign\": \"center\", \"paddingTopNum\": 0, \"font\": {\"fontStyle\": \"normal\", \"fontWeight\": \"normal\", \"color\": \"#fff\", \"fontFamily\": \"-apple-system,BlinkMacSystemFont,\\\"Segoe UI\\\",Roboto,\\\"Helvetica Neue\\\",Helvetica,\\\"PingFang SC\\\",\\\"Hiragino Sans GB\\\",\\\"Microsoft YaHei\\\",SimSun,sans-serif\", \"textBaseline\": \"middle\", \"lineHeight\": 1.5, \"fontSize\": 12, \"textAlign\": \"center\"}, \"id\": \"f3c51c66\", \"paddingLeftNum\": 0, \"strokeStyle\": \"#0099ff\", \"paddingBottom\": 0, \"img\": {\"__zone_symbol__loadfalse\": [{\"source\": \"HTMLImageElement.addEventListener:load\", \"state\": \"scheduled\", \"runCount\": 2, \"zone\": \"angular\", \"type\": \"eventTask\"}]}, \"globalAlpha\": 1, \"gradientRadius\": 0.01, \"paddingTop\": 0, \"imgNaturalWidth\": 650, \"animateFrames\": [], \"animateDuration\": 0, \"text\": \"\\u7f51\\u7ad9\\u8d44\\u4ea7\", \"zRotate\": 0, \"fullIconRect\": {\"center\": {\"y\": 173.5, \"x\": 293}, \"height\": 65, \"width\": 50, \"ey\": 206, \"ex\": 318, \"y\": 141, \"x\": 268}, \"offsetRotate\": 0, \"events\": [], \"textOffsetY\": 0, \"textOffsetX\": 0, \"anchors\": [{\"y\": 173.5, \"x\": 268, \"direction\": 4}, {\"y\": 141, \"x\": 293, \"direction\": 1}, {\"y\": 173.5, \"x\": 318, \"direction\": 2}, {\"y\": 206, \"x\": 293, \"direction\": 3}], \"scalenum\": 1, \"tags\": [], \"iconSize\": null, \"eventFns\": [\"link\", \"doAnimate\", \"doFn\", \"doWindowFn\"], \"elementRendered\": false, \"rotatedAnchors\": [{\"y\": 173.5, \"x\": 268, \"direction\": 4}, {\"y\": 141, \"x\": 293, \"direction\": 1}, {\"y\": 173.5, \"x\": 318, \"direction\": 2}, {\"y\": 206, \"x\": 293, \"direction\": 3}], \"animateCycleIndex\": 0, \"textRect\": {\"center\": {\"y\": 197, \"x\": 293}, \"height\": 18, \"width\": 50, \"ey\": 206, \"ex\": 318, \"y\": 188, \"x\": 268}, \"data\": {\"ip\": \"\", \"type\": \"\\u7f51\\u7ad9\\u8d44\\u4ea7\", \"name\": \"\\u7f51\\u7ad9\\u8d44\\u4ea7\"}, \"rect\": {\"center\": {\"y\": 173.5, \"x\": 293}, \"height\": 65, \"width\": 50, \"ey\": 206, \"ex\": 318, \"y\": 141, \"x\": 268}, \"paddingRight\": 0, \"lineDashOffset\": 0, \"rotate\": 0, \"name\": \"image\", \"type\": 0, \"paddingLeft\": 0, \"gradientAngle\": 0, \"TID\": \"7ef55c36\", \"imgNaturalHeight\": 857, \"paddingRightNum\": 0, \"fullTextRect\": {\"center\": {\"y\": 173.5, \"x\": 293}, \"height\": 65, \"width\": 50, \"ey\": 206, \"ex\": 318, \"y\": 141, \"x\": 268}, \"lineWidth\": 1.5}, {\"lastImage\": \"assets/image/topo/webs.png\", \"borderRadius\": 0, \"iconRect\": {\"center\": {\"y\": 156, \"x\": 480}, \"height\": 42, \"width\": 50, \"ey\": 177, \"ex\": 505, \"y\": 135, \"x\": 455}, \"image\": \"assets/image/topo/webs.png\", \"animateType\": \"\", \"fillStyle\": \"\", \"dash\": 0, \"visible\": true, \"bkType\": 0, \"paddingBottomNum\": 0, \"imageAlign\": \"center\", \"paddingTopNum\": 0, \"font\": {\"fontStyle\": \"normal\", \"fontWeight\": \"normal\", \"color\": \"#fff\", \"fontFamily\": \"-apple-system,BlinkMacSystemFont,\\\"Segoe UI\\\",Roboto,\\\"Helvetica Neue\\\",Helvetica,\\\"PingFang SC\\\",\\\"Hiragino Sans GB\\\",\\\"Microsoft YaHei\\\",SimSun,sans-serif\", \"textBaseline\": \"middle\", \"lineHeight\": 1.5, \"fontSize\": 12, \"textAlign\": \"center\"}, \"id\": \"14b6e72b\", \"paddingLeftNum\": 0, \"strokeStyle\": \"#0099ff\", \"paddingBottom\": 0, \"img\": {\"__zone_symbol__loadfalse\": [{\"source\": \"HTMLImageElement.addEventListener:load\", \"state\": \"scheduled\", \"runCount\": 2, \"zone\": \"angular\", \"type\": \"eventTask\"}]}, \"globalAlpha\": 1, \"gradientRadius\": 0.01, \"paddingTop\": 0, \"imgNaturalWidth\": 896, \"animateFrames\": [], \"animateDuration\": 0, \"text\": \"\\u7f51\\u6bb5\\u8d44\\u4ea7\", \"zRotate\": 0, \"fullIconRect\": {\"center\": {\"y\": 167.5, \"x\": 480}, \"height\": 65, \"width\": 50, \"ey\": 200, \"ex\": 505, \"y\": 135, \"x\": 455}, \"offsetRotate\": 0, \"events\": [], \"textOffsetY\": 0, \"textOffsetX\": 0, \"anchors\": [{\"y\": 167.5, \"x\": 455, \"direction\": 4}, {\"y\": 135, \"x\": 480, \"direction\": 1}, {\"y\": 167.5, \"x\": 505, \"direction\": 2}, {\"y\": 200, \"x\": 480, \"direction\": 3}], \"scalenum\": 1, \"tags\": [], \"iconSize\": null, \"eventFns\": [\"link\", \"doAnimate\", \"doFn\", \"doWindowFn\"], \"elementRendered\": false, \"rotatedAnchors\": [{\"y\": 167.5, \"x\": 455, \"direction\": 4}, {\"y\": 135, \"x\": 480, \"direction\": 1}, {\"y\": 167.5, \"x\": 505, \"direction\": 2}, {\"y\": 200, \"x\": 480, \"direction\": 3}], \"animateCycleIndex\": 0, \"textRect\": {\"center\": {\"y\": 191, \"x\": 480}, \"height\": 18, \"width\": 50, \"ey\": 200, \"ex\": 505, \"y\": 182, \"x\": 455}, \"data\": {\"ip\": \"\", \"type\": \"\\u7f51\\u6bb5\\u8d44\\u4ea7\", \"name\": \"\\u7f51\\u6bb5\\u8d44\\u4ea7\"}, \"rect\": {\"center\": {\"y\": 167.5, \"x\": 480}, \"height\": 65, \"width\": 50, \"ey\": 200, \"ex\": 505, \"y\": 135, \"x\": 455}, \"paddingRight\": 0, \"lineDashOffset\": 0, \"rotate\": 0, \"name\": \"image\", \"type\": 0, \"paddingLeft\": 0, \"gradientAngle\": 0, \"TID\": \"7ef55c36\", \"imgNaturalHeight\": 773, \"paddingRightNum\": 0, \"fullTextRect\": {\"center\": {\"y\": 167.5, \"x\": 480}, \"height\": 65, \"width\": 50, \"ey\": 200, \"ex\": 505, \"y\": 135, \"x\": 455}, \"lineWidth\": 1.5}, {\"animateDotSize\": 5, \"isAnimate\": false, \"animateCycleIndex\": 0, \"fillStyle\": \"\", \"dash\": 0, \"visible\": true, \"animatePos\": 0, \"TID\": \"7ef55c36\", \"font\": {\"fontStyle\": \"normal\", \"fontWeight\": \"normal\", \"color\": \"\", \"fontFamily\": \"-apple-system,BlinkMacSystemFont,\\\"Segoe UI\\\",Roboto,\\\"Helvetica Neue\\\",Helvetica,\\\"PingFang SC\\\",\\\"Hiragino Sans GB\\\",\\\"Microsoft YaHei\\\",SimSun,sans-serif\", \"textBaseline\": \"middle\", \"background\": \"#fff\", \"lineHeight\": 1.5, \"fontSize\": 12, \"textAlign\": \"center\"}, \"id\": \"4e8ebc64\", \"strokeStyle\": \"#00FFE4\", \"from\": {\"y\": 173.5, \"x\": 318, \"direction\": 2, \"id\": \"f3c51c66\", \"anchorIndex\": 2}, \"globalAlpha\": 1, \"to\": {\"y\": 167.5, \"x\": 455, \"direction\": 4, \"id\": \"14b6e72b\", \"anchorIndex\": 0}, \"fromArrowSize\": 5, \"eventFns\": [\"link\", \"doAnimate\", \"doFn\", \"doWindowFn\"], \"fromArrow\": \"\", \"offsetRotate\": 0, \"events\": [], \"textOffsetY\": 0, \"textOffsetX\": 0, \"toArrow\": \"\", \"animateToSize\": 0, \"tags\": [], \"animateColor\": \"\", \"animateSpan\": 3, \"textRect\": null, \"data\": \"\", \"rect\": {\"center\": {\"y\": 0, \"x\": 0}, \"height\": 0, \"width\": 0, \"ey\": 0, \"ex\": 0, \"y\": 0, \"x\": 0}, \"borderColor\": \"#000000\", \"lineDashOffset\": 0, \"toArrowSize\": 5, \"rotate\": 0, \"name\": \"line\", \"type\": 1, \"manualCps\": false, \"animateFromSize\": 0, \"borderWidth\": 0, \"lineWidth\": 1.5, \"controlPoints\": []}], \"scale\": 1, \"data\": \"\"}, \"thumbnail\": \"\"}",
        name: "fdsf",
        topotype: "json",
      }]
    },
    errCode: 0,
  }
  res.send(result)
})

server.get('/isoc/api/v1/perceived_environment/asset_risk_map', (req, res) => {
  let result = {
    code: 200,
    data: { low: 5, mid: 2, more_low: 36, hight: 0, more_high: 0 },
    msg: "查询成功",
  }
  res.send(result)
})

server.get('/asset/assetManage/assetAppStatistics', (req, res) => {
  let result = {
    data: [{ app_num: 1, app_name: "appweb" }, { app_num: 1, app_name: "jira" }],
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/asset/assetManage/assetDeviceTypeStatistics', (req, res) => {
  let result = {
    data: [{ device_num: 1, device_type: "服务器" }, { device_num: 1, device_type: "终端" }],
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/isoc/api/v1/perceived_environment/asset_risk_top', (req, res) => {
  let result = {
    "msg":
      "\u67e5\u8be2\u6210\u529f",
    "code": 200,
    "data":
      [
        { "asset_name": "136.5.22.172", "asset_risk_tag": [3, 3], "asset_uuid": "61d54a0c87b75180bf0c92e57df6ab1e", "asset_key": "136.5.22.172&&", "asset_event_count": 0 }, { "asset_name": "test1", "asset_risk_tag": [3, 3], "asset_uuid": "36acbeb7bfff5ac3af1162b081c9ddd1", "asset_key": "http://10.65.40.43/mg", "asset_event_count": 0 }, { "asset_name": "test_vul", "asset_risk_tag": [2, 3], "asset_uuid": "d16d82992a0b5fb3a60540128abd2415", "asset_key": "10.67.1.208&&", "asset_event_count": 0 }, { "asset_name": "L", "asset_risk_tag": [2, 3], "asset_uuid": "14251686ac595527b84f4c2a40df499c", "asset_key": "192.168.1.2&&", "asset_event_count": 7 }, { "asset_name": "M", "asset_risk_tag": [2, 3], "asset_uuid": "26dba55ff9f25af1a2e49723e0c83c88", "asset_key": "192.168.1.3&&", "asset_event_count": 14 }
      ]
  }
  res.send(result)
})

server.get('/asset/assetManage/assetFindStatistics', (req, res) => {
  let result = {
    data: { log_num: 0, flow_num: 9, scan_num: 14, agent_num: 1 },
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/asset/assetManage/assetStatusStatistics', (req, res) => {
  let result = {
    data: { website_num: 6, change_num: 1, add_num: 14, host_num: 35 },
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/isoc/api/v1/perceived_environment/suspected_fallen_asset_count', (req, res) => {
  let result = {
    code: 200,
    data: { count: 0 },
    msg: "查询成功",
  }
  res.send(result)
})

server.get('/isoc/api/v1/perceived_environment/asset_type_map', (req, res) => {
  let result = {
    code: 200,
    data: { fallen_count: 0, outreach_count: 0, abnormal_count: 0, weakness_count: 0 },
    msg: "查询成功",
  }
  res.send(result)
})

server.get('/asset/assetManage/assetUnusualDistribution', (req, res) => {
  let result = {
    data: { unusual_num: 2, risk_num: 9 },
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/asset/assetManage/assetPortDistribution', (req, res) => {
  let result = {
    data: [{port: 9008, asset_count: 2}, {port: 21, asset_count: 1}, {port: 3211, asset_count: 1}],
    errCode: 0,
    errMsg: "all right",
  }
  res.send(result)
})

server.get('/asset/assetCommon/assetPortrait/partAssetList', (req, res) => {
  let result = {"assetUuid":["61d54a0c87b75180bf0c92e57df6ab1e","36acbeb7bfff5ac3af1162b081c9ddd1","d16d82992a0b5fb3a60540128abd2415","14251686ac595527b84f4c2a40df499c","26dba55ff9f25af1a2e49723e0c83c88"]}
  res.send(result)
})

server.use(jsonServer.bodyParser);
server.use(router)

router.render = (req, res) => {
  res.jsonp({
    status: 200,
    data: {
      data: res.locals.data,
      total: res.locals.data.length
    }
  });
}
server.listen(3002, () => {
  console.log('JSON Server is running')
})