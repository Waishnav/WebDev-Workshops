const track = document.getElementById("track");
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  // console.log(percentage)
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 2000, fill: "forwards" });
  
  for(const image of track.getElementsByTagName("div")) {
    image.animate({
      backgroundPosition: `${100 + nextPercentage}% 50%`
    }, { duration: 2000, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */


window.onwheel = e => handleOnMove(e);
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

window.onwheel = e => {
  const delta =  -e.deltaY;
  
  const percentage = (delta),
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  console.log(nextPercentage)

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1000, fill: "forwards" });
  
  for(const image of track.getElementsByTagName("div")) {
    image.animate({
      backgroundPosition: `${100 + nextPercentage}% 50%`
    }, { duration: 1000, fill: "forwards" });
  }
  
}

// window.onclick = e => {
//   const track = document.getElementById("track");
//   const thumbnailImages = track.querySelectorAll('img');
//   const images = Array.from(thumbnailImages)
//   delete thumbnailImages
//   const clickedElement = e.target;
//   console.log(images)
//   if (clickedElement in images) {
//     clickedElement.style.width = `100vw`
//     clickedElement.style.height = `100vh`
//   }
  
// }

// thumbnailImages.forEach(thumbnail => {
//   thumbnail.addEventListener('click', () => {
//     thumbnail.style.width = `100vw`
//     thumbnail.style.height = `100vh`
//     // track.animate({
//     //   left: `0%`
//     // },{ duration: 1200, fill: "forwards" })
    
//   });
// });

const images = document.querySelectorAll('div');

images.forEach(image => {
  image.addEventListener('click', function(e) {
    const track = document.getElementById("track");
    track.style.left = `0%`
    const clickedImage = this
    console.log(clickedImage)
    const otherImage = (clickedImage === images[0]) ? images[1] : images[0];
    const clickedImagePos = clickedImage.offsetLeft;
    const otherImagePos = otherImage.offsetLeft;

    // if (clickedImagePos < otherImagePos) {
    //   otherImage.style.left = '110%';
    // } else {
    //   otherImage.style.left = '-110%';
    // }

    
    clickedImage.style.width = `${window.innerWidth}`;
    clickedImage.style.height = `${window.innerHeight}`;
    clickedImage.style.objectPosition = `100% 100%`;
  });
});
