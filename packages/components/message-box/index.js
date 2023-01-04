import MessageBox from './src/message-box';

MessageBox.install = app => {
  MessageBox._context = app._context;
  app.config.globalProperties.$msgbox = MessageBox;
  app.config.globalProperties.$messageBox = MessageBox;
  app.config.globalProperties.$alert = MessageBox.alert;
  app.config.globalProperties.$confirm = MessageBox.confirm;
  app.config.globalProperties.$prompt = MessageBox.prompt;
};
export default MessageBox;
export const XsMessageBox = MessageBox;
