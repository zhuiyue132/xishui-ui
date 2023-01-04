import { h, render, watch, isVNode } from 'vue';
import { isClient } from '@vueuse/core';
import { isUndefined, hasOwn, isObject, isString } from '@xishui-ui/utils';
import MessageBoxConstructor from './message-box.vue';

// component default merge props & data

const messageInstance = new Map();

const initInstance = (props, container, appContext = null) => {
  //创建node
  const vnode = h(MessageBoxConstructor, props);
  //注入context
  vnode.appContext = appContext;
  render(vnode, container);
  //挂载
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement('div');
};

const showMessage = (options, appContext) => {
  const container = genContainer();
  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container);
    messageInstance.delete(vm); // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  };

  // close cancel ok handler
  options.onAction = action => {
    const currentMsg = messageInstance.get(vm);
    let resolve;
    if (options.showInput) {
      resolve = { value: vm.inputValue, action };
    } else {
      resolve = action;
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy);
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close');
        } else {
          currentMsg.reject('cancel');
        }
      } else {
        currentMsg.resolve(resolve);
      }
    }
  };

  //创建实例
  const instance = initInstance(options, container, appContext);

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy;

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop] = options[prop];
    }
  }

  watch(
    () => vm.message,
    (newVal, oldVal) => {
      if (isVNode(newVal)) {
        // Override slots since message is vnode type.
        instance.slots.default = () => [newVal];
      } else if (isVNode(oldVal) && !isVNode(newVal)) {
        delete instance.slots.default;
      }
    },
    {
      immediate: true
    }
  );

  // change visibility after everything is settled
  vm.visible = true;
  return vm;
};

async function MessageBox(options, appContext) {
  if (!isClient) return Promise.reject();
  let callback;
  if (isString(options) || isVNode(options)) {
    // eslint-disable-next-line no-param-reassign
    options = {
      message: options
    };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    //创建message 实例 并保存到map中
    const vm = showMessage(options, appContext ?? MessageBox._context);
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject
    });
  });
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'];
const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true, icon: 'warn' },
  prompt: { showCancelButton: true, showInput: true }
};

MESSAGE_BOX_VARIANTS.forEach(boxType => {
  MessageBox[boxType] = messageBoxFactory(boxType);
});

function messageBoxFactory(boxType) {
  return (message, titleOrOpts, options, appContext) => {
    let title;
    if (isObject(titleOrOpts)) {
      // eslint-disable-next-line no-param-reassign
      options = titleOrOpts;
      title = '';
    } else if (isUndefined(titleOrOpts)) {
      title = '';
    } else {
      title = titleOrOpts;
    }

    return MessageBox(
      Object.assign(
        {
          title,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
        },
        options,
        {
          boxType
        }
      ),
      appContext
    );
  };
}

MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });

  messageInstance.clear();
};

MessageBox._context = null;

export default MessageBox;
