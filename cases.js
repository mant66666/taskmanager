document.addEventListener("DOMContentLoaded", () => {
    const list = Array.from(document.querySelectorAll(".cases__icons_part"));
    const storisWrapper = document.getElementById("cases__screen");
    const imgList = [
        "img/startscreen/actualCases/icons/samolet.svg",
        "img/startscreen/actualCases/icons/prime.svg",
        "img/startscreen/actualCases/icons/vkvideo.svg",
        "img/startscreen/actualCases/icons/gismeteo.svg",
        "img/startscreen/actualCases/icons/dodopizza.svg",
        "img/startscreen/actualCases/icons/AAG.svg"
    ];
    let currentIndex = 0;
    let autoPlayInterval = null;
    let currentAnimation = null;
    let isPaused = false; 

    let leftBtn = null;
    let rightBtn = null;

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (rightBtn) rightButtonClick(); 
        }, 3000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    function AddFillMode() {
        document.querySelectorAll(".cases__screen_main_storis-nav_part").forEach(span => {
            span.style.background = '';
            span.getAnimations().forEach(anim => anim.cancel());
        });

        const currentSpan = Array.from(document.querySelectorAll(".cases__screen_main_storis-nav_part"))[currentIndex];
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
        }
    }

    function leftButtonClick() {
        if (currentAnimation) currentAnimation.cancel();
        stopAutoPlay();
        startAutoPlay();

        if (currentIndex !== 0) {
            currentIndex -= 1;
            AddFillMode();
        }

        let newSrc = imgList[currentIndex];
        const screenMain = document.querySelector(".cases__screen_main");
        if (screenMain) {
            screenMain.style.backgroundImage = `url('${newSrc}')`;
        }
        
        setTimeout(() => {
            isPaused = false;
        }, 1);

        if (leftBtn) {
            if (currentIndex === 0) {
                leftBtn.style.opacity = "0.1";
                AddFillMode();
            } else {
                leftBtn.style.opacity = "1";
                leftBtn.style.cursor = "pointer";
            }
        }
    }

    function rightButtonClick() {
        if (currentAnimation) currentAnimation.cancel();
        stopAutoPlay();
        startAutoPlay();

        if (currentIndex < imgList.length - 1) {
            currentIndex += 1;
            if (leftBtn) leftBtn.style.opacity = "1";
            AddFillMode();
        } else {
            currentIndex = 0;
            if (leftBtn) leftBtn.style.opacity = "0.1";
            AddFillMode();
        }

        let newSrc = imgList[currentIndex];
        const screenMain = document.querySelector(".cases__screen_main");
        if (screenMain) {
            screenMain.style.backgroundImage = `url('${newSrc}')`;
        }
    }
    list.forEach((k) => {
        k.addEventListener("click", () => {
            currentIndex = list.indexOf(k);
            document.querySelector("body").style.overflow="hidden";
            storisWrapper.classList.add("cases__screen");

            storisWrapper.innerHTML = `
                <div class="cases__screen_main" style="background-image: url('${imgList[currentIndex]}');">
                    <div class="cases__screen_main">
                    <div class="cases__screen_main_storis-nav">
                        <span class="cases__screen_main_storis-nav_part"></span>
                        <span class="cases__screen_main_storis-nav_part"></span>
                        <span class="cases__screen_main_storis-nav_part"></span>
                        <span class="cases__screen_main_storis-nav_part"></span>
                        <span class="cases__screen_main_storis-nav_part"></span>
                        <span class="cases__screen_main_storis-nav_part"></span>
                    </div>
                    <img class="close-btn-storis" src="img/startscreen/close.svg">
                    <div class="cases__screen_main_buttons">
                        <button class="cases__screen_main_buttons_part" id="leftButton">
                            <img src="img/startscreen/arrow.svg" alt="<" style="transform: rotate(180deg);" class="cases__screen_main_buttons_part_img">
                        </button>
                        <button class="cases__screen_main_buttons_part" id="rightButton">
                            <img src="img/startscreen/arrow.svg" alt=">" class="cases__screen_main_buttons_part_img">
                        </button>
                    </div>
                    <button class="open-btn-storis" id="openCase">Перейти</button>
                </div>
                </div>
            `;

            leftBtn = document.getElementById("leftButton");
            rightBtn = document.getElementById("rightButton");
            const btnClose = storisWrapper.querySelector(".close-btn-storis");

            if (leftBtn) {
                if (currentIndex === 0) {
                    leftBtn.style.opacity = "0.1";
                } else {
                    leftBtn.style.opacity = "1";
                }
                leftBtn.addEventListener("click", leftButtonClick);
            }

            if (rightBtn) {
                rightBtn.addEventListener("click", rightButtonClick);
            }

            startAutoPlay();
            AddFillMode();

            storisWrapper.style.display = "block";

            if (btnClose) {
                btnClose.addEventListener("click", () => {
                    if (currentAnimation) currentAnimation.cancel();
                    stopAutoPlay();  
                    storisWrapper.innerHTML = "";
                    storisWrapper.classList.remove("cases__screen");
                    storisWrapper.style.display = "none";
                    document.querySelector("body").style.overflow="auto";
                    leftBtn = null;
                    rightBtn = null;
                });
            }
        });
    });
});
