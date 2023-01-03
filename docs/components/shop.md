# Shop 店铺

## 基础用法

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-goods :data="goods" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        goods: {
          goodsId: '675447250296',
          goodsName: '化妆品收纳盒防尘透明桌面梳妆台口红护肤品高级感置物架亚克力箱',
          goodsUrl: 'https://img.alicdn.com/bao/uploaded/i4/2345882863/O1CN01qDRXTw1X1IiwKvgCo_!!0-item_pic.jpg',
          goodsLink: 'https://item.taobao.com/item.htm?id=675447250296',
          platform: 'TM',
          status: '1',
          shopId: '2345882863',
          shopName: '薇爱旗舰店',
          shopLink: 'https://store.taobao.com/shop/view_shop.htm?user_number_id=2345882863',
          goodsFlag: null
        }
      };
    }
  };
</script>
```

:::

## 调整图片尺寸和行数

:::demo

```vue
<template>
  <div style="width: 240px">
    <xs-goods :data="goods" :size="40" :rows="2" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        goods: {
          goodsId: '675447250296',
          goodsName: '化妆品收纳盒防尘透明桌面梳妆台口红护肤品高级感置物架亚克力箱',
          goodsUrl: 'https://img.alicdn.com/bao/uploaded/i4/2345882863/O1CN01qDRXTw1X1IiwKvgCo_!!0-item_pic.jpg',
          goodsLink: 'https://item.taobao.com/item.htm?id=675447250296',
          platform: 'TM',
          status: '1',
          shopId: '2345882863',
          shopName: '薇爱旗舰店',
          shopLink: 'https://store.taobao.com/shop/view_shop.htm?user_number_id=2345882863',
          goodsFlag: null
        }
      };
    }
  };
</script>
```

:::

## 没有商品链接时

:::demo

```vue
<template>
  <div style="width: 240px">
    <xs-goods :data="goods" :size="40" :rows="2" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        goods: {
          goodsId: '675447250296',
          goodsName: '化妆品收纳盒防尘透明桌面梳妆台口红护肤品高级感置物架亚克力箱',
          goodsUrl: 'https://img.alicdn.com/bao/uploaded/i4/2345882863/O1CN01qDRXTw1X1IiwKvgCo_!!0-item_pic.jpg',
          platform: 'TM',
          status: '1',
          shopId: '2345882863',
          shopName: '薇爱旗舰店',
          shopLink: 'https://store.taobao.com/shop/view_shop.htm?user_number_id=2345882863',
          goodsFlag: null
        }
      };
    }
  };
</script>
```

:::

## API

### 属性

| 参数 | 说明     | 类型   | 可选值             | 默认值                                                      |
| ---- | -------- | ------ | ------------------ | ----------------------------------------------------------- |
| data | 商品数据 | Object |                    |                                                             |
| prop | 字段绑定 | Object | 当字段不匹配时使用 | `{ name: 'goodsName', link: 'goodsLink', url: 'goodsUrl' }` |
| size | 图片尺寸 | Number |                    | 24                                                          |
| rows | 文案行数 | Number |                    | 1                                                           |

### 插槽

| 插槽    | 说明         |
| ------- | ------------ |
| image   | 商品图片区域 |
| default | 商品链接区域 |
