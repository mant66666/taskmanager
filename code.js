document.addEventListener("DOMContentLoaded", () => {
    const list = Array.from(document.querySelectorAll(".cases__icons_part"));

    const imgList = [
        "img/startscreen/actualCases/icons/samolet.svg",
        "img/startscreen/actualCases/icons/prime.svg",
        "img/startscreen/actualCases/icons/vkvideo.svg",
        "img/startscreen/actualCases/icons/gismeteo.svg",
        "img/startscreen/actualCases/icons/dodopizza.svg",
        "img/startscreen/actualCases/icons/AAG.svg"
    ];
    
    const storisWrapper = document.getElementById("cases__screen");

    list.forEach((k) => {
        k.addEventListener("click", () => {
            let currentIndex = list.indexOf(k);
            let imagePath = imgList[currentIndex];
            
            storisWrapper.classList.add("cases__screen");
            
            storisWrapper.innerHTML = `
                <div class="cases__screen_main" style="background-image: url('${imagePath}');">
                    <img class="close-btn-storis" src="img/startscreen/close.svg">
                    <div class="cases__screen_main_buttons">
                        <!-- Исправил опечатки в id и классах -->
                        <button class="cases__screen_main_buttons_part" id="leftButton">
                            <img src="img/startscreen/arrow.svg" alt="<" style="transform: rotate(180deg);" class="cases__screen_main_buttons_part_img">
                        </button>
                        <button class="cases__screen_main_buttons_part" id="rightButton">
                            <img src="img/startscreen/arrow.svg" alt=">" class="cases__screen_main_buttons_part_img">
                        </button>
                    </div>
                    <button class="open-btn-storis">Перейти</button>
                </div>
            `;
            const btnClose = storisWrapper.querySelector(".close-btn-storis");
            if (btnClose) {
                btnClose.addEventListener("click", () => {
                    storisWrapper.innerHTML = "";
                    storisWrapper.classList.remove("cases__screen");
                    storisWrapper.style.display = "none"; 
                });
            }
            const rightBtn = document.getElementById("rightButton");
            if (rightBtn) {
                rightBtn.addEventListener("click", () => {
                    if (currentIndex < imgList.length - 1) {
                        currentIndex += 1;
                    } else {
                        currentIndex = 0; 
                        rightBtn.style.opacity=0.5;
                    }
                    let newSrc = imgList[currentIndex];
                    document.querySelector(".cases__screen_main").style.backgroundImage = `url('${newSrc}')`;
                });
            }
            
            const leftBtn = document.getElementById("leftButton");
            if (leftBtn) {
                leftBtn.addEventListener("click", () => {
                    if (currentIndex > 0) {
                        currentIndex -= 1;
                    } else {
                        currentIndex = imgList.length - 1;
                    }
                    let newSrc = imgList[currentIndex];
                    document.querySelector(".cases__screen_main").style.backgroundImage = `url('${newSrc}')`;
                });
            }

            storisWrapper.style.display = "block"; 
        });
    });
});
