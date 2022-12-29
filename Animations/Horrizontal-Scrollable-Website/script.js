function scrollEvent() {
  document.addEventListener("wheel", (e) => {
    const container = document.getElementById("scrollable-div");
    e.preventDefault();
      if (e.ctrlKey) {
      // do nothing
      console.log("user zooming");
    } else {
      container.scrollTo({
        left: container.scrollLeft + 10 * e.deltaY,
        top: container.scrollTop,
        behavior: "smooth",
      });
    }
  });
}

function touchScroll() {
  const container = document.getElementById("scrollable-div");
  let scrollDistance = 0;
  let initialX = 0;
  container.addEventListener("touchstart", function (event) {
    initialX = event.touches[0].pageX;
  })
  container.addEventListener("touchmove", function (event) {
    // Calculate the distance to scroll based on the mouse position
    scrollDistance = Number(event.touches[0].pageX) - Number(container.offsetLeft);
    scrollDistance = 1.5*scrollDistance;
    const finalX = event.touches[0].pageX;
    if (initialX < finalX) {
      scrollDistance = -scrollDistance;
    }

    // console.log(event.touches[0]);
    container.scrollTo({
      left: container.scrollLeft + scrollDistance,
      top: container.scrollTop,
      behavior: "smooth",
    });
  });
}
function mouseScroll() {
  const container = document.getElementById("scrollable-div");
  let scrollDistance = 0;
  let initialX = 0;
  container.addEventListener("mousedown", function (event) {
    initialX = event.pageX;
    // console.log(initialX)
  })
  container.addEventListener("mouseup", function (event) {
    // Calculate the distance to scroll based on the mouse position
    scrollDistance = Number(event.pageX) - Number(container.offsetLeft);
    scrollDistance = 1.5*scrollDistance;
    const finalX = event.pageX;
    console.log(finalX, initialX)
    if (initialX < finalX) {
      scrollDistance = -scrollDistance;
    }

    // console.log(event.touches[0]);
    container.scrollTo({
      left: container.scrollLeft + scrollDistance,
      top: container.scrollTop,
      behavior: "smooth",
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  touchScroll();
  mouseScroll();
  scrollEvent();

});
