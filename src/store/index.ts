import { inject, provide, readonly, ref } from "vue";

class ScrollLock {
  private _isScrollLock = ref(false);
  private _scrollY = ref(0);
  public get value() {
    return readonly(this._isScrollLock);
  }
  public get scrollY() {
    return readonly(this._scrollY);
  }
  public lock = () => {
    this._scrollY.value = window.scrollY;
    this._isScrollLock.value = true;
  };
  public unlock = () => {
    setTimeout(() => {
      window.scrollTo({
        top: this._scrollY.value,
        behavior: "auto"
      });
    });
    this._isScrollLock.value = false;
  };
}

const isScrollLock = Symbol("scrollLock");
const createIsScrollLock = () => {
  const isScrollLock = new ScrollLock();
  return { isScrollLock };
};
const useIsScrollLock = () => inject(isScrollLock, createIsScrollLock());
const provideIsScrollLock = () => provide(isScrollLock, createIsScrollLock());

export default {
  useIsScrollLock,
  provideIsScrollLock
};
