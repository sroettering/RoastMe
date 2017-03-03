export const ScrollHandler = {
  scrollPosition: 0,
  handleScrollEvent(event) {
    const curScrollPos = Math.max(event.srcElement.body.scrollTop, 0);
    document.getElementsByClassName('header')[0].classList.toggle('fixed', curScrollPos > this.scrollPosition);
    this.scrollPosition = curScrollPos;
  },
  resetScrollPosition() {
    console.log('reset scroll position');
    this.scrollPosition = 0;
    document.body.scrollTop = 0;
  },
  infScrollHandler: null,
  infiniteScroll(handler) {
    this.infScrollHandler = handler;
    $(window).scroll(this.infScrollHandler);
  },
  disableInfiniteScroll() {
    $(window).unbind("scroll", this.infScrollHandler);
  }
};

/*
Use this on each page component to reset the scroll position
componentDidMount() {
  ScrollHandler.resetScrollPosition();
}
*/
