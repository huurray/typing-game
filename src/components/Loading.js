export default class Loading {
  constructor() {
    const $loading = document.querySelector('.loading-container');
    this.$loading = $loading;
  }

  close() {
    this.$loading.style.display = 'none';
  }

  open() {
    this.$loading.style.display = 'flex';
  }
}
