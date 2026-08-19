const sheets = [
    ...document.querySelectorAll(".sheet")
];

const prevButton =
    document.getElementById("prevPage");

const nextButton =
    document.getElementById("nextPage");

const firstPageButton =
    document.getElementById("firstPage");

const fullscreenButton =
    document.getElementById("fullscreenButton");

const currentPageDisplay =
    document.getElementById("currentPage");

const book =
    document.getElementById("book");


let currentSheet = 0;


/* =========================================
   UPDATE BOOK
========================================= */

function updateBook() {

    sheets.forEach((sheet, index) => {

        if (index < currentSheet) {

            sheet.classList.add("flipped");

        } else {

            sheet.classList.remove("flipped");

        }

    });


    /*
     * Cambio sutil de posición.
     *
     * Al abrir la revista desplazamos
     * ligeramente el objeto para aumentar
     * la ilusión de volumen.
     */

    if (currentSheet === 0) {

        book.style.transform =
            "rotateX(2deg) rotateY(-2deg) translateX(0)";

    } else {

        book.style.transform =
            "rotateX(1deg) rotateY(0deg) translateX(48%)";

    }


    updatePageIndicator();
}


/* =========================================
   NEXT
========================================= */

function nextPage() {

    if (currentSheet >= sheets.length) {
        return;
    }

    currentSheet++;

    updateBook();
}


/* =========================================
   PREVIOUS
========================================= */

function previousPage() {

    if (currentSheet <= 0) {
        return;
    }

    currentSheet--;

    updateBook();
}


/* =========================================
   PAGE INDICATOR
========================================= */

function updatePageIndicator() {

    let visiblePage;

    if (currentSheet === 0) {

        visiblePage = 1;

    } else {

        visiblePage =
            Math.min(
                currentSheet * 2,
                sheets.length * 2
            );

    }

    currentPageDisplay.textContent =
        String(visiblePage).padStart(2, "0");
}


/* =========================================
   FIRST PAGE
========================================= */

function goToCover() {

    currentSheet = 0;

    updateBook();
}


/* =========================================
   FULLSCREEN
========================================= */

async function toggleFullscreen() {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement
                .requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (error) {

        console.warn(
            "Fullscreen no disponible:",
            error
        );

    }
}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

        if (event.key === "Escape") {

            goToCover();

        }

    }
);


/* =========================================
   TOUCH / SWIPE
========================================= */

let touchStartX = 0;
let touchEndX = 0;


book.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


book.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference > 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* =========================================
   EVENTS
========================================= */

nextButton.addEventListener(
    "click",
    nextPage
);

prevButton.addEventListener(
    "click",
    previousPage
);

firstPageButton.addEventListener(
    "click",
    goToCover
);

fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
);


/* =========================================
   INITIALIZE
========================================= */

updateBook();