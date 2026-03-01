export default function cases(){
    const icons = Array.from(document.querySelectorAll(".cases__icons_part"));
    const list = Array.from(document.querySelectorAll(".cases__screen_main"));
    const modalWindow = document.querySelector(".cases__screen");
    
    let currentIndex = 0;
    let currentSlide = list[currentIndex];
    let autoPlayInterval = null;
    let currentCasesNavAnimation = null;
    let isPaused = false;

    function AddFillMode() {
        list.forEach(slide => {
            slide.querySelectorAll(".cases__screen_main_storis-nav_part").forEach(span => {
                span.style.background = '';
                span.getAnimations().forEach(anim => anim.cancel());
            });
        });

        const currentSpans = currentSlide.querySelectorAll(".cases__screen_main_storis-nav_part");
        const currentSpan = currentSpans[currentIndex]; 

        if (currentSpan) {
            const spanWidth = currentSpan.offsetWidth;
            currentSpan.style.backgroundImage = 'url(assets/img/startscreen/whitebcg.jpeg)'; 
            currentSpan.style.backgroundRepeat = 'no-repeat';
            currentSpan.style.backgroundSize = 'cover';
            currentSpan.style.backgroundPosition = `-${spanWidth}px 0`;

            currentCasesNavAnimation = currentSpan.animate([
                { backgroundPosition: `-${spanWidth}px 0`, offset: 0 },
                { backgroundPosition: '0 0', offset: 0.99 },
                { backgroundPosition: `-${spanWidth}px 0`, offset: 1 }
            ], {
                duration: 3000,
                fill: 'none',
                easing: 'linear'
            });

            currentCasesNavAnimation.onfinish = () => {
                 if (!isPaused) rightButtonClick();
            };
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        if (currentCasesNavAnimation) currentCasesNavAnimation.cancel();
    }

    function updateButtonsState() {
        const leftBtn = currentSlide.querySelector(".leftButton");
        if (leftBtn) {
            if (currentIndex === 0) {
                leftBtn.style.opacity = "0.1";
                leftBtn.style.pointerEvents = "none"; 
            } else {
                leftBtn.style.opacity = "1";
                leftBtn.style.pointerEvents = "auto";
            }
        }
    }
   function switchSlide(newIndex,direction) {
    stopAutoPlay();
    if (direction==="right"){
        currentSlide.style.transform = "translateX(20vw)";
        let currentCasesNavAnimation1 = currentSlide.animate([
            { transform: "scaleX(1) translateX(20vw)", opacity: 1, offset: 0},
            { transform: "scaleX(0.3) translateX(50vw)", opacity: 0, offset: 1}
        ], {
            duration: 400,
            fill: 'none',
            easing: 'linear'
        });
        
        let nextSlide = list[newIndex];
        nextSlide.style.display = "flex"; 
        nextSlide.style.transform = "scaleX(0.5) translateX(0vw)";
        nextSlide.style.opacity = "0";
        let nextAnimation = nextSlide.animate([
            { transform: "scaleX(0.5) translateX(0vw)", opacity: 0},
            { transform: "scaleX(1) translateX(-25vw)", opacity: 1},
        ], {
            duration: 400,
            fill: 'none',
            easing: 'linear'
        });
        Promise.all([currentCasesNavAnimation1.finished, nextAnimation.finished]).then(() => {
            currentSlide.style.display = "none";
            currentSlide.style.transform = "translateX(0vw)";
            nextSlide.style.transform = "scaleX(1) translateX(0)";
            nextSlide.style.opacity = "1";
            currentIndex = newIndex;
            currentSlide = nextSlide;
            updateButtonsState();
            AddFillMode();
        });
    }
    if (direction==="left"){
        currentSlide.style.transform = "translateX(-20vw)";
        let currentCasesNavAnimation1 = currentSlide.animate([
            { transform: "scaleX(1) translateX(-20vw)", opacity: 1, offset: 0},
            { transform: "scaleX(0.3) translateX(-50vw)", opacity: 0, offset: 1}
        ], {
            duration: 400,
            fill: 'none',
            easing: 'linear'
        });
        
        let nextSlide = list[newIndex];
        nextSlide.style.display = "flex"; 
        nextSlide.style.transform = "scaleX(0.5) translateX(0vw)";
        nextSlide.style.opacity = "0";
        let nextAnimation = nextSlide.animate([
            { transform: "scaleX(0.5) translateX(0vw)", opacity: 0},
            { transform: "scaleX(1) translateX(25vw)", opacity: 1},
        ], {
            duration: 400,
            fill: 'none',
            easing: 'linear'
        });
        Promise.all([currentCasesNavAnimation1.finished, nextAnimation.finished]).then(() => {
            currentSlide.style.display = "none";
            currentSlide.style.transform = "translateX(0vw)";
            nextSlide.style.transform = "scaleX(1) translateX(0)";
            nextSlide.style.opacity = "1";
            currentIndex = newIndex;
            currentSlide = nextSlide;
            updateButtonsState();
            AddFillMode();
        });
    }
}
    function leftButtonClick() {
        if (currentIndex > 0) {
            switchSlide(currentIndex - 1,"left");
        }
    }

    function rightButtonClick() {
        if (currentIndex < list.length - 1) {
            switchSlide(currentIndex + 1,"right");
        } else {
            closeModal(); 
        }
    }

    function closeModal() {
        stopAutoPlay();
        modalWindow.style.display = "none";
        currentSlide.style.display = "none";
        document.body.style.overflow = "auto";
    }

    modalWindow.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.leftButton')) {
            leftButtonClick();
            return;
        }

        if (target.closest('.rightButton')) {
            rightButtonClick();
            return;
        }
        if (target.closest('.cases__screen_closeButton')) {
            closeModal();
            return;
        }
    });

    let dragStart = false;
    let dragCoord = [0, 0];
    modalWindow.addEventListener('mousedown', e => {
        dragStart = true;
        dragCoord[0] = e.pageX;
    })

    modalWindow.addEventListener('mouseup', e => {
        dragStart = false;
        dragCoord[1] = e.pageX;
        if(Math.abs((dragCoord[0] - dragCoord[1])) > 100) {
            if(dragCoord[0] < dragCoord[1]) {
               
                
                leftButtonClick();
            } else {
                
                rightButtonClick();
            }
        }
    })

    icons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            currentIndex = index; 
            list.forEach(slide => slide.style.display = 'none');
            currentSlide = list[currentIndex];       
            modalWindow.style.display = "flex";
            currentSlide.style.display = "flex";
            document.body.style.overflow = "hidden";
            updateButtonsState();
            AddFillMode();
        });
    });
}


