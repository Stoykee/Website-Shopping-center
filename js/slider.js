const carousel1 = document.querySelector('.carousel1'),
firstImg = carousel1.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, prevPageX, prevScrollLeft;

const showHideIcons = () => {
    let scrollWidth = carousel1.scrollWidth - carousel1.clientWidth;
    arrowIcons[0].style.display = carousel1.scrollLeft == 0 ? "none" : "block"; 
    arrowIcons[1].style.display = carousel1.scrollLeft == scrollWidth ? "none" : "block"; 
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel1.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const dragStart = (e) => {
    isDragStart =true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel1.scrollLeft;
}

const dragging = (e) => {
    // pomeranje slika na levo u odnosu na kursor
    if (!isDragStart) return;
    e.preventDefault();
    carousel1.classList.add( 'dragging' );
    let positionDiff = e.pageX -prevPageX;
   carousel1.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel1.classList.remove("dragging");
}

carousel1.addEventListener("mousedown", dragStart);
carousel1.addEventListener("mousemove", dragging);
carousel1.addEventListener("mouseup", dragStop);
carousel1.addEventListener("mouseleave", dragStop);