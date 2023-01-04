import { isValidComponentSize } from '@xishui-ui/utils';

export const Props = {
  confirmBtnType: {
    type: String,
    default: 'primary'
  },
  buttonSize: {
    type: String,
    default: '',
    validator: isValidComponentSize
  },
  modal: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false
  },
  closeOnHashChange: {
    type: Boolean,
    default: true
  },
  center: Boolean,
  draggable: Boolean,
  roundButton: {
    default: false,
    type: Boolean
  },
  container: {
    type: String, // default append to body
    default: 'body'
  },
  boxType: {
    type: String,
    default: ''
  }
};

export const Emits = ['vanish', 'action'];

export const Icons = import.meta.globEager('../svg/*.svg');
