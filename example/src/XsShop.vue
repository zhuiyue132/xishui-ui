<template>
  <xs-shop :data="data" />
  <xs-shop :data="data" :src="data.shopUrl" :size="24"> 优衣库不卖电脑 </xs-shop>
</template>
<script setup>
  const data = {
    shopName: '薇爱旗舰店',
    shopLink: 'https://bosideng.tmall.com/',
    platform: 'tm',
    shopUrl:
      '//img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/6000000002514/O1CN01vL0doa1URSToG1P6R_!!6000000002514-0-shopmanager.jpg'
  };
</script>
