document.addEventListener("DOMContentLoaded", () => {
    const sliderList = Array.from(document.querySelectorAll(".start-screen__footer_projects-slider_slide"));
    let currentSliderIndex=0;
    let currentSlide=sliderList[currentSliderIndex];
    let currentSlider=document.querySelector(".start-screen__footer_projects");

    currentSlider.querySelector(".start-screen__footer_projects-slider-nav_right").addEventListener("click", ()=>{
            
            if (currentSliderIndex<sliderList.length-1){
                currentSliderIndex++;
            }
            else{
                currentSliderIndex=0;
            }
            currentAnimation=currentSlide.animate([
                { opacity:1},
                { opacity:0},
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'linear'
                });
            currentAnimation.onfinish = () => {
                currentSlide.classList.add("hidden");
                currentSlide=sliderList[currentSliderIndex];
                currentSlide.style.opacity= 0.5;
                currentSlide.classList.remove("hidden");
                currentSlide.animate([
                { opacity:0.5},
                { opacity:1},
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'linear'
                });
            }
    })


        currentSlider.querySelector(".start-screen__footer_projects-slider-nav_left").addEventListener("click", ()=>{
            if (currentSliderIndex==0){
                currentSliderIndex=sliderList.length-1;
            }
            else{
                currentSliderIndex--;
            }
            currentAnimation=currentSlide.animate([
                { opacity:1},
                { opacity:0},
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'linear'
                });
            currentAnimation.onfinish = () => {
                currentSlide.classList.add("hidden");
                currentSlide=sliderList[currentSliderIndex];
                currentSlide.style.opacity= 0.5;
                currentSlide.classList.remove("hidden");
                currentSlide.animate([
                { opacity:0},
                { opacity:1},
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'linear'
                });
            }
    })

})