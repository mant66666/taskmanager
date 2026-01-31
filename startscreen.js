document.addEventListener("DOMContentLoaded", () => {
    let projects=["Самолет","2","3","4"];
    const sliderList = Array.from(document.querySelectorAll(".start-screen__footer_projects-slider_slide"));
    let currentSliderIndex=0;
    let headerSlider=document.getElementById("jsSliderStart-screen");
    let currentSlide=sliderList[currentSliderIndex];
    let currentSlider=document.querySelector(".start-screen__footer_projects");
    currentSlider.querySelectorAll(".start-screen__footer_projects-slider_slide-nav_right").forEach(btn => {
        btn.addEventListener("click", ()=>{
            currentSlide.classList.add("hidden");
            if (currentSliderIndex<sliderList.length-1){
                currentSliderIndex++;
                headerSlider.textContent=projects[currentSliderIndex];
            }
            else{
                currentSliderIndex=0;
                headerSlider.textContent=projects[currentSliderIndex];
            }
            currentSlide=sliderList[currentSliderIndex];
            currentSlide.classList.remove("hidden");
    })
    });
    currentSlider.querySelectorAll(".start-screen__footer_projects-slider_slide-nav_left").forEach(btn => {
        btn.addEventListener("click", ()=>{
            if (currentSliderIndex==0){
                currentSliderIndex=sliderList.length-1;
                headerSlider.value=projects[currentSlide];
            }
            else{
                currentSliderIndex--;
                headerSlider.value=projects[currentSlide];
            }
            currentSlide.classList.add("hidden");
            currentSlide=sliderList[currentSliderIndex];
            currentSlide.classList.remove("hidden");
    })
    });
})