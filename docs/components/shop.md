# Shop 店铺

## 基础用法

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-shop :data="data" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        data: {
          shopName: '薇爱旗舰店',
          shopLink: 'https://bosideng.tmall.com/',
          platform: 'tm',
          shopUrl:
            '//img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/6000000002514/O1CN01vL0doa1URSToG1P6R_!!6000000002514-0-shopmanager.jpg'
        }
      };
    }
  };
</script>
```

:::

## 显示店铺 LOGO 和自定义店铺内容

此外，还可以设置 logo 的尺寸。

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-shop :data="data" :src="data.shopUrl" :size="24"> 优衣库官方旗舰店 </xs-shop>
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        data: {
          shopName: '薇爱旗舰店',
          shopLink: 'https://bosideng.tmall.com/',
          platform: 'tm',
          shopUrl:
            '//img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/6000000002514/O1CN01vL0doa1URSToG1P6R_!!6000000002514-0-shopmanager.jpg'
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
| src  | 图片链接 | String |                    |                                                             |

### 插槽

| 插槽    | 说明         |
| ------- | ------------ |
| default | 商品链接区域 |
