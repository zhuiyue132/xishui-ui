import { makeInstaller } from './installer';
import * as Components from '@xishui-ui/components';

export default makeInstaller([...Object.keys(Components).map(key => Components[key])]);
