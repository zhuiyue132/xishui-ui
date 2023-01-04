# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

因为演示组件原因，只能使用全局方法做 demo，实际开发中可以[按需引入](#按需引入)使用。

## 消息提示

用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

调用 `XsMessageBox.alert` 方法以打开 alert 框。 它模拟了系统的 alert，无法通过按下 ESC 或点击框外关闭。 此例中接收了两个参数，`message`和`title`。 值得一提的是，窗口被关闭后，它默认会返回一个`Promise`对象便于进行后续操作的处理。 若不确定浏览器是否支持 `Promise`，可自行引入第三方 polyfill 或像本例一样使用回调进行后续处理。

:::demo

```vue
<template>
  <xs-button text @click="open">打开对话框</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties.$msgbox.alert('有时间多看书', 'hello bro');
        }
      };
    }
  };
</script>
```

:::

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

调用 `XsMessageBox.confirm` 方法以打开 confirm 框。它模拟了系统的 confirm。 Message Box 组件也拥有极高的定制性，我们可以传入 `options` 作为第三个参数，它是一个字面量对象。 type 字段表明消息类型，可以为 **`success`**，**`danger`**，**`info`** 和 **`warn`**，无效的设置将会被忽略。 需要注意的是，第二个参数 `title` 必须定义为 `String` 类型，如果是 Object，会被当做为 options 使用。 在这里我们返回了一个 `Promise` 来处理后续响应。

:::demo

```vue
<template>
  <xs-button type="warning" @click="() => open('warn')">warn</xs-button>
  <xs-button type="info" @click="() => open('info')">info</xs-button>
  <xs-button type="success" @click="() => open('success')">success</xs-button>
  <xs-button type="danger" @click="() => open('danger')">danger</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: (icon = 'warn') => {
          vm.appContext.config.globalProperties.$msgbox
            .confirm('即将删除邮件，是否继续？', '警告', {
              confirmButtonText: '是的，我确认',
              cancelButtonText: '还没想好',
              icon
            })
            .then(action => {
              console.log(action);
            })
            .catch(action => {
              console.log(action);
            });
        }
      };
    }
  };
</script>
```

:::

## 提交内容

当需要用户输入内容时，可以使用 `Prompt` 类型的消息框。

调用 `XsMessageBox.prompt` 方法以打开 `prompt` 框。它模拟了系统的 prompt。 可以用 `inputPattern` 字段自己规定匹配模式， 使用 `inputValidator` 来指定验证方法，它应该返回 `Boolean` 或 `String`。 返回 `false` 或 `String` 表示验证失败， 返回的字符串将用作 `inputErrorMessage`，用来提示用户错误原因。 此外，可以用 `inputPlaceholder` 字段来定义输入框的占位符。

:::demo

```vue
<template>
  <xs-button type="primary" @click="open">打开输入框</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties.$msgbox
            .prompt('输入你自己的邮箱吧', '邮箱📮', {
              confirmButtonText: '保存',
              inputPattern:
                /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              inputErrorMessage: '你输入的邮箱不对啊'
            })
            .then(({ value }) => {
              alert(`你邮箱是${value}`);
            })
            .catch(() => {
              alert(`放弃输入`);
            });
        }
      };
    }
  };
</script>
```

:::

## 使用 VNode

`message` 可以是 VNode。

:::demo

```vue
<template>
  <xs-button type="primary" @click="open">VNode</xs-button>
  <xs-button type="primary" @click="open2">动态渲染原生input元素</xs-button>
</template>
<script>
  import { ref, getCurrentInstance, h } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties.$msgbox({
            title: 'VNode',
            message: h('p', null, [h('span', null, '消息内容可以是 '), h('i', { style: 'color: teal' }, 'VNode')])
          });
        },
        open2: () => {
          const str = ref('');
          vm.appContext.config.globalProperties
            .$msgbox({
              title: 'VNode',
              message: h('input', {
                value: str.value,
                style: {
                  border: '1px #ccc solid',
                  width: '100%',
                  padding: '0 8px'
                },
                placeholder: '过年吃什么',
                oninput(val) {
                  str.value = this.value;
                }
              })
            })
            .then(() => {
              console.log(str.value);
            });
        }
      };
    }
  };
</script>
```

:::

## 个性化

消息弹框可以被定制来展示各种内容。

上面提到的三个方法都是对 `XsMessageBox` 方法的二次包装。 本例直接调用 `XsMessageBox` 方法，使用了 `showCancelButton` 字段，用于显示取消按钮。 另外可使用 `cancelButtonClass` 为其添加自定义样式，使用 `cancelButtonText` 来自定义取消按钮文本（Confirm 按钮也具有相同的字段，在文末的 API 说明中有完整的字段列表）。 此例还使用了 `beforeClose` 属性， 当 `beforeClose` 被赋值且被赋值为一个回调函数时，在消息弹框被关闭之前将会被调用，并且可以通过该方法来阻止弹框被关闭。 它是一个接收三个参数：`action`、`instance` 和`done` 的方法。 使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加 `loading` 状态等；此时若需要关闭实例，可以调用 `done` 方法（若在 `beforeClose` 中没有调用 `done`，则弹框便不会关闭）。

:::demo

```vue
<template>
  <xs-button type="primary" @click="open">打开输入框</xs-button>
</template>
<script>
  import { ref, getCurrentInstance, h } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties
            .$msgbox({
              title: 'Message',
              message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
              showCancelButton: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = 'Loading...';
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 3000);
                } else {
                  done();
                }
              }
            })
            .then(action => {
              console.log(action);
            })
            .catch(() => {});
        }
      };
    }
  };
</script>
```

:::

## 使用 HTML 片段

`message` 支持传入 HTML 字符串来作为正文内容。

将 `dangerouslyUseHTMLString` 属性设置为 true，`message` 属性就会被当作 HTML 片段处理。

:::demo

```vue
<template>
  <xs-button text @click="open">打开对话框</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties.$msgbox.alert(
            '<strong>proxy is <i>HTML</i> string</strong>',
            'HTML String',
            {
              dangerouslyUseHTMLString: true
            }
          );
        }
      };
    }
  };
</script>
```

:::

## 区分取消操作与关闭操作

有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

默认情况下，当用户触发取消（点击取消按钮）和触发关闭（点击关闭按钮或遮罩层、按下 ESC 键）时，Promise 的 `reject` 回调和 `callback` 回调的参数均为 'cancel'。 如果将 distinguishCancelAndClose 属性设置为 true，则上述两种行为的参数分别为 'cancel' 和 'close'。

:::demo

```vue
<template>
  <xs-button @click="open">区分close与cancel</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: (icon = 'warn') => {
          vm.appContext.config.globalProperties.$msgbox
            .confirm('即将删除邮件，是否继续？', '警告', {
              confirmButtonText: '是的，我确认',
              cancelButtonText: '还没想好',
              distinguishCancelAndClose: true
            })
            .then(action => {
              console.log(action);
              alert(action);
            })
            .catch(action => {
              alert(action);
            });
        }
      };
    }
  };
</script>
```

:::

## 可拖拽

设置 `draggable`属性为`true`来开启拖拽弹窗能力。
:::demo

```vue
<template>
  <xs-button text @click="open">打开对话框</xs-button>
</template>
<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup() {
      const vm = getCurrentInstance();
      return {
        open: () => {
          vm.appContext.config.globalProperties.$msgbox.alert(
            '<strong>proxy is <i>HTML</i> string</strong>',
            'HTML String',
            {
              draggable: true,
              dangerouslyUseHTMLString: true
            }
          );
        }
      };
    }
  };
</script>
```

:::

## 全局方法

如果你完整引入了本组件库，它会为 `app.config.globalProperties` 添加如下全局方法：`$msgbox`、 `$alert`、 `$confirm` 和 `$prompt`。 因此在 Vue 实例中可以采用本页面中的方式来调用 MessageBox。 参数如下：

- `$msgbox(options)`
- `$alert(message, title, options)` 或 `$alert(message, options)`
- `$confirm(message, title, options)` 或 `$confirm(message, options)`
- `$prompt(message, title, options)` 或 `$prompt(message, options)`

## 按需引入

如果您需要按需引入 `MessageBox`：

```js
import { XsMessageBox } from 'xishui-ui';
```

那么对应于上述四个全局方法的调用方法依次为：`XsMessageBox`、`XsMessageBox.alert`、`XsMessageBox.confirm` 和 `XsMessageBox.prompt`。 参数同上所述。

## Options

| 属性                         | 描述                                                                                                                                                  | 类型                                                                                                                                                                      | 可选值                        | 默认值                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------ |
| title                        | 标题                                                                                                                                                  | string                                                                                                                                                                    | —                             | —                                    |
| message                      | 正文内容                                                                                                                                              | string / VNode                                                                                                                                                            | —                             | —                                    |
| dangerouslyUseHTMLString     | 是否将 message 作为 HTML 片段处理 string                                                                                                              | boolean                                                                                                                                                                   | —                             | false                                |
| icon                         | 确认框的 icon                                                                                                                                         | string                                                                                                                                                                    | [danger, info, success, warn] | warn                                 |
| custom-class                 | 自定义类名                                                                                                                                            | string                                                                                                                                                                    | —                             | —                                    |
| custom-style                 | 自定义内联样式                                                                                                                                        | CSSProperties                                                                                                                                                             | —                             | —                                    |
| callback                     | 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调                                                                                          | function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例， 可以通过它访问实例上的属性和方法                                     | —                             | —                                    |
| showClose                    | 是否显示右上角关闭按钮                                                                                                                                | boolean                                                                                                                                                                   | —                             | true                                 |
| before-close                 | 关闭前的回调，会暂停消息弹出框的关闭过程。                                                                                                            | function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例 | —                             | —                                    |
| distinguish-cancel-and-close | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分                                                                         | boolean                                                                                                                                                                   | —                             | false                                |
| lock-scroll                  | 是否在 MessageBox 出现时将 body 滚动锁定                                                                                                              | boolean                                                                                                                                                                   | —                             | true                                 |
| show-cancel-button           | 是否显示取消按钮                                                                                                                                      | boolean                                                                                                                                                                   | —                             | false（以 prompt 方式调用时为 true)  |
| show-confirm-button          | 是否显示确定按钮                                                                                                                                      | boolean                                                                                                                                                                   | —                             | true                                 |
| cancel-button-text           | 取消按钮的文本内容                                                                                                                                    | string                                                                                                                                                                    | —                             | Cancel                               |
| confirm-button-text          | 确定按钮的文本内容                                                                                                                                    | string                                                                                                                                                                    | —                             | OK                                   |
| cancel-button-class          | 取消按钮的自定义类名                                                                                                                                  | string                                                                                                                                                                    | —                             | —                                    |
| confirm-button-class         | 确定按钮的自定义类名                                                                                                                                  | string                                                                                                                                                                    | —                             | —                                    |
| close-on-click-modal         | 是否可通过点击遮罩层关闭 MessageBox                                                                                                                   | boolean                                                                                                                                                                   | —                             | true（以 alert 方式调用时为 false）  |
| close-on-press-escape        | 是否可通过按下 ESC 键关闭 MessageBox                                                                                                                  | boolean                                                                                                                                                                   | —                             | true（以 alert 方式调用时为 false）  |
| close-on-hash-change         | 是否在 hash 改变时关闭 MessageBox                                                                                                                     | boolean                                                                                                                                                                   | —                             | true                                 |
| show-input                   | 是否显示输入框                                                                                                                                        | boolean                                                                                                                                                                   | —                             | false（以 prompt 方式调用时为 true） |
| input-placeholder            | 输入框占位文本                                                                                                                                        | string                                                                                                                                                                    | —                             | —                                    |
| input-type                   | 输入框的类型                                                                                                                                          | string                                                                                                                                                                    | —                             | text                                 |
| input-value                  | 输入框的初始文本                                                                                                                                      | string                                                                                                                                                                    | —                             | —                                    |
| input-pattern                | 输入框的校验表达式                                                                                                                                    | regexp                                                                                                                                                                    | —                             | —                                    |
| input-validator              | 输入框的校验函数。 应该返回一个 boolean 或者 string， 如果返回的是一个 string 类型，那么该返回值会被赋值给 inputErrorMessage 用于向用户展示错误消息。 | function                                                                                                                                                                  | —                             | —                                    |
| input-error-message          | 校验未通过时的提示文本                                                                                                                                | string                                                                                                                                                                    | —                             | Illegal input                        |
|                              |
| draggable                    | MessageBox 是否可拖放                                                                                                                                 | boolean                                                                                                                                                                   | —                             | false                                |
| round-button                 | 是否使用圆角按钮                                                                                                                                      | boolean                                                                                                                                                                   | —                             | false                                |
| button-size                  | 自定义确认按钮及取消按钮的大小                                                                                                                        | string                                                                                                                                                                    | small / default / large       | default                              |
