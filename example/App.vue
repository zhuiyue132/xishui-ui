<template>
  <xs-shop :data="data" />
  <xs-shop :data="data" :src="data.shopUrl" :size="24"> 优衣库不卖电脑 </xs-shop>

  <div style="width: 240px">
    <xs-goods :data="goods" />
  </div>
</template>
<script setup>
  const data = {
    shopName: '薇爱旗舰店',
    shopLink: 'https://bosideng.tmall.com/',
    platform: 'tm',
    shopUrl:
      '//img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/6000000002514/O1CN01vL0doa1URSToG1P6R_!!6000000002514-0-shopmanager.jpg'
  };

  const goods = {
    gmv: '10041',
    fhGmv: '17079',
    sales: '100',
    lstGmv: [
      {
        code: 'ptGmv',
        name: '普通单',
        cost: '10041',
        roi: '--'
      }
    ],
    lstSales: [
      {
        code: 'ptSales',
        name: '普通单',
        cost: '100',
        roi: '--'
      }
    ],
    lstFhGmv: [
      {
        code: 'ptFhGmv',
        name: '普通单',
        cost: '17079',
        roi: '--'
      }
    ],
    hpCost: '5081',
    profit: '-199',
    adCost: '3505',
    adCosts: [
      {
        code: 'ztc',
        name: '直通车',
        cost: '3505',
        roi: '1.94'
      }
    ],
    profitRate: '-0.0198',
    lstHpCost: [
      {
        code: 'netHpCost',
        name: '净货品成本',
        cost: '4693',
        roi: '--'
      },
      {
        code: 'ptMRRefundHpCost',
        name: '退款货品成本',
        cost: '388',
        roi: '--'
      }
    ],
    gmvRatio: '0.1027',
    goodsId: '675447250296',
    goodsName: '化妆品收纳盒防尘透明桌面梳妆台口红护肤品高级感置物架亚克力箱',
    goodsUrl: 'https://img.alicdn.com/bao/uploaded/i4/2345882863/O1CN01qDRXTw1X1IiwKvgCo_!!0-item_pic.jpg',
    goodsLink: 'https://item.taobao.com/item.htm?id=675447250296',
    platform: 'TM',
    cateId: '50025922',
    cateName: '桌面收纳盒',
    catePathName: '收纳整理>家庭收纳用具>收纳盒>桌面收纳盒',
    onSaleTime: '2022/05/24 16:00:56',
    status: '1',
    shopId: '2345882863',
    shopName: '薇爱旗舰店',
    shopLink: 'https://store.taobao.com/shop/view_shop.htm?user_number_id=2345882863',
    leaders: [
      {
        fzrId: '2361',
        userName: '张灵芝',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0004.png',
        postName: '运营'
      },
      {
        fzrId: '2382',
        userName: '李伟',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0005.png',
        postName: 'test1'
      },
      {
        fzrId: '3462',
        userName: '程右',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0004.png',
        postName: null
      },
      {
        fzrId: '3301',
        userName: '谢丽',
        headerUrl: '//image.ecbis.cn/bilogo/1644544126343.png',
        postName: null
      },
      {
        fzrId: '3467',
        userName: '阮自强',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0003.png',
        postName: null
      },
      {
        fzrId: '3468',
        userName: '张延中',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0005.png',
        postName: null
      },
      {
        fzrId: '3762',
        userName: '龙霄',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0006.png',
        postName: null
      },
      {
        fzrId: '3464',
        userName: '喻泽恒',
        headerUrl: '//image.ecbis.cn/bilogo/1646725604350.png',
        postName: null
      },
      {
        fzrId: '3589',
        userName: '高英俊',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0004.png',
        postName: '运营'
      },
      {
        fzrId: '3989',
        userName: '张倩倩',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0002.png',
        postName: null
      },
      {
        fzrId: '3761',
        userName: '刘先霞',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0005.png',
        postName: null
      },
      {
        fzrId: '3991',
        userName: '梁鑫伟',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0007.png',
        postName: null
      },
      {
        fzrId: '4029',
        userName: '周华俊',
        headerUrl: '//image.ecbis.cn/biyhtx/yhtx_0007.png',
        postName: null
      }
    ],
    goodsFlag: null
  };
</script>
