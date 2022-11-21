import * as components from "./components";
import { version } from "./package.json";

const install = function (app) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value);
  });
};


export default {
    install,
    version
}