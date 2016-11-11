export const ScrollHandler = {
  scrollPosition: 0,
  handleScrollEvent(event) {
    const curScrollPos = event.srcElement.body.scrollTop;
    document.getElementsByClassName('header')[0].classList.toggle('fixed', curScrollPos > this.scrollPosition);
    this.scrollPosition = curScrollPos;
  },
  resetScrollPosition() {
    this.scrollPosition = 0;
    document.body.scrollTop = 0;
  },
};

/*
Use this on each page component to reset the scroll position
componentDidMount() {
  ScrollHandler.resetScrollPosition();
}
*/
