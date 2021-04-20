// ui
import Loading from "./components/Loading.js";
import Button from "./components/Button.js";

export default class App {
  $target = null;
  data = null;

  constructor($target) {
    this.$target = $target;

    const $loading = new Loading($target);
    new Button($target);
  }

  setState(nextData) {
    this.data = nextData;
  }
}
