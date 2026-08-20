/* =========================================================
   MÉXICO — REVISTA DIGITAL
   StPageFlip ENGINE v0.6
========================================================= */


/* =========================================================
   DOM
========================================================= */

const bookElement =
    document.getElementById(
        "book"
    );

const prevButton =
    document.getElementById(
        "prevButton"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const coverButton =
    document.getElementById(
        "coverButton"
    );

const fullscreenButton =
    document.getElementById(
        "fullscreenButton"
    );

const pageCounter =
    document.getElementById(
        "pageCounter"
    );

const totalCounter =
    document.getElementById(
        "totalCounter"
    );


/* =========================================================
   VALIDATE LIBRARY
========================================================= */

if (
    typeof St === "undefined" ||
    !St.PageFlip
) {

    console.error(
        "StPageFlip no cargó correctamente."
    );

    throw new Error(
        "No se pudo iniciar StPageFlip."
    );

}


/* =========================================================
   PAGE FLIP INSTANCE
========================================================= */

const pageFlip =
    new St.PageFlip(
        bookElement,
        {

            /*
             * Proporción aproximada
             * de revista editorial.
             */

            width: 560,

            height: 740,


            /*
             * Responsive.
             */

            size: "stretch",


            minWidth: 300,

            maxWidth: 720,


            minHeight: 400,

            maxHeight: 950,


            /*
             * Portada cerrada.
             */

            showCover: true,


            /*
             * Permite modo vertical
             * cuando no caben dos páginas.
             */

            usePortrait: true,


            /*
             * Evita que el navegador
             * convierta el swipe en scroll.
             */

            mobileScrollSupport: false,


            /*
             * Tiempo del giro.
             *
             * No demasiado rápido:
             * queremos percibir la hoja.
             */

            flippingTime: 1150,


            /*
             * Sombra calculada por el motor.
             */

            drawShadow: true,


            maxShadowOpacity: 0.58,


            /*
             * Mostrar esquina interactiva.
             */

            showPageCorners: true,


            /*
             * Permitir interacción
             * con mouse/touch.
             */

            disableFlipByClick: false,


            /*
             * Inicial.
             */

            startPage: 0

        }
    );


/* =========================================================
   LOAD HTML PAGES
========================================================= */

pageFlip.loadFromHTML(

    document.querySelectorAll(
        "#book .page"
    )

);


/* =========================================================
   TOTAL PAGES
========================================================= */

const totalPages =
    pageFlip.getPageCount();


totalCounter.textContent =
    String(
        totalPages
    ).padStart(
        2,
        "0"
    );


/* =========================================================
   UPDATE COUNTER
========================================================= */

function updateCounter(
    pageIndex
) {

    const number =
        pageIndex + 1;


    pageCounter.textContent =
        String(
            number
        ).padStart(
            2,
            "0"
        );

}


/* =========================================================
   EVENTS FROM STPAGEFLIP
========================================================= */

pageFlip.on(
    "flip",
    event => {

        updateCounter(
            event.data
        );

    }
);


/*
 * Útil para depuración.
 *
 * Estados habituales:
 *
 * read
 * flipping
 * user_fold
 * fold_corner
 */

pageFlip.on(
    "changeState",
    event => {

        document.body.dataset.bookState =
            event.data;

    }
);


/*
 * El motor emite cambios de orientación
 * al entrar/salir de portrait.
 */

pageFlip.on(
    "changeOrientation",
    event => {

        document.body.dataset.orientation =
            event.data;

    }
);


/* =========================================================
   NEXT
========================================================= */

function nextPage() {

    pageFlip.flipNext();

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousPage() {

    pageFlip.flipPrev();

}


/* =========================================================
   COVER
========================================================= */

function goToCover() {

    pageFlip.flip(
        0,
        "top"
    );

}


/* =========================================================
   FULLSCREEN
========================================================= */

async function toggleFullscreen() {

    try {

        if (
            !document.fullscreenElement
        ) {

            await document
                .documentElement
                .requestFullscreen();

        }

        else {

            await document
                .exitFullscreen();

        }

    }

    catch (error) {

        console.warn(
            "Fullscreen no disponible:",
            error
        );

    }

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
    "click",
    previousPage
);


coverButton.addEventListener(
    "click",
    goToCover
);


fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(

    "keydown",

    event => {

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousPage();

        }


        if (
            event.key ===
            "Home"
        ) {

            goToCover();

        }

    }

);


/* =========================================================
   INITIAL COUNTER
========================================================= */

updateCounter(
    pageFlip.getCurrentPageIndex()
);
