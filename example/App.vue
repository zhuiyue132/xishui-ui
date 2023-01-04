<template>
  <xs-empty icon="group" description="暂未设置自定义分组" />
  <xs-button text @click="open">Click to open the Message Box</xs-button>
</template>
<script setup>
  import { XsMessageBox as MessageBox } from '@xishui-ui/components/message-box';

  const open = () => {
    // XsMessageBox.alert('This is a message', 'Title', {
    //   // if you want to disable its autofocus
    //   // autofocus: false,
    //   confirmButtonText: 'OK',
    //   callback: action => {
    //     console.log(action);
    //   }
    // });
    MessageBox.confirm('This is a message', '标题', {
      // if you want to disable its autofocus
      // autofocus: false,
      // confirmButtonText: '确定',
      // cancelButtonText: '取消',
      // icon: 'danger',
      // icon: 'warn',
      icon: 'success',
      icon: 'info'
    })
      .then(action => {
        console.log(action);
      })
      .catch(action => {
        console.log(action);
      });
    // MessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
    //   dangerouslyUseHTMLString: true
    // });
  };
</script>
