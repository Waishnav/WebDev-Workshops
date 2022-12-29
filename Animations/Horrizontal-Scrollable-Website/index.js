handleOnScroll = (e) => {
}

handleDown = (e) => {
    const div = document.getElementById("scrollable-div")
    div.dataset.initialX = e.clientX
}

handleMove = (e) => {
    const div = document.getElementById("scrollable-div")
    if (div.dataset.initialX === "0") return;
    
    const delta = e.clientX - parseFloat(div.dataset.initialX);

    // console.log(mouseDelta )
    // const percetage = (mouseDelta/ maxDelta) * 100

    let startTime;
    let endTime = Date.now() + 80; // End time is 1200 milliseconds (1.2 seconds) from now
    let startX = div.scrollLeft;
    let endX = div.scrollLeft + 2 * delta;
    let progress;

    function animateScroll() {
        const div = document.getElementById("scrollable-div")
        startTime = Date.now();

        progress = (startTime - endTime) / 1000; // Calculate the progress as a value between 0 and 1
        div.scrollLeft = startX + (endX - startX) * progress; // Update the scrollLeft property

        if (startTime < endTime) { // If the animation is not complete, request another frame
        requestAnimationFrame(animateScroll);
        }
    }
    animateScroll();

    // div.scrollTo({
    //     left: div.scrollLeft - 2 * delta,
    //     top: div.scrollTop,
    //     behavior: "smooth",
    // });
    
}

handleUp = (e) => {
    const div = document.getElementById("scrollable-div")
    div.dataset.initialX = "0"
}

// on scroll effect with smoothness I mean there should be no any lag b/w user's scroll input using wheel
window.onmousedown = (e) => {handleDown(e)}

window.onmousemove = (e) => {handleMove(e)}

window.onmouseup = (e) => {handleUp(e)}

window.ontouchstart = e => handleDown(e.touches[0]);
window.ontouchend = e => handleUp(e.touches[0]);
window.ontouchmove = e => handleMove(e.touches[0]);

window.onwheel = (e) => {
    const div = document.getElementById("scrollable-div")
    if (e.ctrlKey) {
        console.log("user zooming");
    }
    else {
        console.log("wheel event fired")
        div.scrollTo({
            left: div.scrollLeft + 10 * e.deltaY,
            top: div.scrollTop,
            behavior: "smooth",
        });
    }
}