import { componentSizes } from '@xishui-ui/config';

export const isValidComponentSize = val => ['', ...componentSizes].includes(val);
