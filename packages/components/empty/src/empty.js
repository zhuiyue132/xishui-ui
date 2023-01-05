import _404 from '../svg/404.svg';
import App from '../svg/app.svg';
import Bar from '../svg/bar.svg';
import Box from '../svg/box.svg';
import Basket from '../svg/basket.svg';
import Calculator from '../svg/calculator.svg';
import Car from '../svg/car.svg';
import Folder from '../svg/folder.svg';
import Group from '../svg/group.svg';
import Lock from '../svg/lock.svg';
import LockSmall from '../svg/lock-small.svg';
import NoData from '../svg/no-data.svg';
import NoDataSmall from '../svg/no-data-small.svg';
import NoMessageSmall from '../svg/no-message-small.svg';
import NoMessage from '../svg/no-message.svg';
import NoWifi from '../svg/no-wifi.svg';
import NoWifiSmall from '../svg/no-wifi-small.svg';
import Pie from '../svg/pie.svg';
import Question from '../svg/question.svg';
import QuestionSmall from '../svg/question-small.svg';

export const emptyProps = {
  image: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 360
  },
  description: {
    type: String,
    default: '暂无数据'
  },
  icon: {
    type: String,
    default: ''
  }
};

export const svgs = {
  404: _404,
  app: App,
  bar: Bar,
  box: Box,
  basket: Basket,
  calculator: Calculator,
  car: Car,
  folder: Folder,
  group: Group,
  lock: Lock,
  'lock-small': LockSmall,
  'no-data': NoData,
  'no-data-small': NoDataSmall,
  'no-message': NoMessage,
  'no-message-small': NoMessageSmall,
  'no-wifi': NoWifi,
  'no-wifi-small': NoWifiSmall,
  pie: Pie,
  question: Question,
  'question-small': QuestionSmall
};
