document.addEventListener("DOMContentLoaded", () => {
    const icons = Array.from(document.querySelectorAll(".cases__icons_part"));
    const list = Array.from(document.querySelectorAll(".cases__screen_main"));
    const modalWindow = document.querySelector(".cases__screen");
    
    let currentIndex = 0;
    let currentSlide = list[currentIndex];
    let autoPlayInterval = null;
    let currentAnimation = null;
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
            currentSpan.style.backgroundImage = 'url(img/startscreen/whitebcg.jpeg)'; 
            currentSpan.style.backgroundRepeat = 'no-repeat';
            currentSpan.style.backgroundSize = 'cover';
            currentSpan.style.backgroundPosition = `-${spanWidth}px 0`;

            currentAnimation = currentSpan.animate([
                { backgroundPosition: `-${spanWidth}px 0`, offset: 0 },
                { backgroundPosition: '0 0', offset: 0.99 },
                { backgroundPosition: `-${spanWidth}px 0`, offset: 1 }
            ], {
                duration: 3000,
                fill: 'none',
                easing: 'linear'
            });

            currentAnimation.onfinish = () => {
                 if (!isPaused) rightButtonClick();
            };
        }
    }

  

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        if (currentAnimation) currentAnimation.cancel();
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
    function switchSlide(newIndex) {
        stopAutoPlay();
        currentSlide.style.display = "none";
        currentIndex = newIndex;
        currentSlide = list[currentIndex];
        currentSlide.style.opacity=0;
        currentSlide.style.display = "flex";
        currentSlide.animate([
            { opacity:0},
            { opacity:1},
            ], {
                duration: 300,
                fill: 'forwards',
                easing: 'linear'
            });
        updateButtonsState();
        AddFillMode();
    }
    function leftButtonClick() {
        if (currentIndex > 0) {
            switchSlide(currentIndex - 1);
        }
    }

    function rightButtonClick() {
        if (currentIndex < list.length - 1) {
            switchSlide(currentIndex + 1);
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
        if (target.closest('.cases__screen_main_closeButton')) {
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
});
