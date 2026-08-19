/* =========================================================
   MÉXICO — REVISTA DIGITAL
   BOOK ENGINE v0.4
========================================================= */


/* =========================================================
   DOM
========================================================= */

const leftSlot =
    document.getElementById(
        "leftSlot"
    );

const rightSlot =
    document.getElementById(
        "rightSlot"
    );

const turningSheet =
    document.getElementById(
        "turningSheet"
    );

const turnFront =
    document.getElementById(
        "turnFront"
    );

const turnBack =
    document.getElementById(
        "turnBack"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const prevButton =
    document.getElementById(
        "prevButton"
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
   PAGE DATA
========================================================= */

const pages = [

    {
        number: 1,

        html: `
            <div class="page-content page-cover">

                <div class="cover-copy">

                    <span class="eyebrow">
                        EDICIÓN 01 · MÉXICO ESENCIAL
                    </span>

                    <h1>
                        MÉXICO
                    </h1>

                    <h2>
                        Tierra que se vive
                    </h2>

                    <p>
                        Cultura · Destinos · Gastronomía ·
                        Historias · Naturaleza · Arquitectura
                    </p>

                </div>

                <span class="page-number light">
                    01
                </span>

            </div>
        `
    },


    {
        number: 2,

        html: `
            <div class="page-content page-editorial">

                <span class="eyebrow">
                    MÉXICO ESENCIAL
                </span>

                <h2>
                    Un país.<br>
                    Miles de historias.
                </h2>

                <p>
                    México no se descubre únicamente
                    recorriendo kilómetros.
                </p>

                <p>
                    Se descubre entrando en mercados,
                    escuchando plazas, siguiendo caminos,
                    probando sabores y entendiendo
                    la memoria de cada región.
                </p>

                <span class="page-number">
                    02
                </span>

            </div>
        `
    },


    {
        number: 3,

        html: `
            <div class="page-content page-destination">

                <div class="destination-overlay"></div>

                <div class="destination-copy">

                    <span class="eyebrow">
                        DESTINOS
                    </span>

                    <h2>
                        Oaxaca
                    </h2>

                    <h3>
                        Donde la tierra tiene memoria
                    </h3>

                    <p>
                        Montañas, mercados, arquitectura
                        y siglos de historia.
                    </p>

                </div>

                <span class="page-number light">
                    03
                </span>

            </div>
        `
    },


    {
        number: 4,

        html: `
            <div class="page-content page-editorial">

                <span class="eyebrow">
                    HISTORIAS DE MÉXICO
                </span>

                <h2>
                    El arte de detener el tiempo
                </h2>

                <p>
                    Hay lugares que no necesitan
                    explicarse demasiado.
                </p>

                <p>
                    Basta caminar sus calles,
                    escuchar sus mercados
                    y observar cómo cambia la luz
                    sobre sus fachadas.
                </p>

                <span class="page-number">
                    04
                </span>

            </div>
        `
    },


    {
        number: 5,

        html: `
            <div class="page-content page-food">

                <span class="eyebrow">
                    GASTRONOMÍA
                </span>

                <h2>
                    Sabores que cuentan historias
                </h2>

                <p>
                    Ingredientes, técnicas y tradiciones
                    que convierten la cocina mexicana
                    en una forma de identidad.
                </p>

                <div class="food-circle">
                    MÉXICO
                </div>

                <span class="page-number">
                    05
                </span>

            </div>
        `
    },


    {
        number: 6,

        html: `
            <div class="page-content page-editorial">

                <span class="eyebrow">
                    MÉXICO ANCESTRAL
                </span>

                <h2>
                    La memoria sigue viva
                </h2>

                <p>
                    México conserva culturas,
                    lenguas, técnicas y tradiciones
                    que sobreviven al paso de los siglos.
                </p>

                <span class="page-number">
                    06
                </span>

            </div>
        `
    },


    {
        number: 7,

        html: `
            <div class="page-content page-final">

                <span class="eyebrow">
                    PRÓXIMA PARADA
                </span>

                <h2>
                    México<br>
                    comienza aquí.
                </h2>

                <span class="page-number light">
                    07
                </span>

            </div>
        `
    },


    {
        number: 8,

        html: `
            <div class="page-content page-cover">

                <div class="cover-copy">

                    <span class="eyebrow">
                        FIN DE EDICIÓN
                    </span>

                    <h1>
                        MÉXICO
                    </h1>

                    <h2>
                        Nos vemos en la próxima ruta.
                    </h2>

                </div>

                <span class="page-number light">
                    08
                </span>

            </div>
        `
    }

];


/* =========================================================
   STATE
========================================================= */

let currentSpread = 0;

let isAnimating = false;


/* =========================================================
   HELPERS
========================================================= */

function getPage(index) {

    if (
        index < 0 ||
        index >= pages.length
    ) {

        return `
            <div class="
                page-content
                page-empty
            ">
            </div>
        `;

    }

    return pages[index].html;

}


/* =========================================================
   SPREAD LOGIC
========================================================= */

function getSpreadPages() {

    /*
     * Spread 0:
     *
     * izquierda vacía
     * derecha portada
     */

    if (
        currentSpread === 0
    ) {

        return {

            left: -1,

            right: 0

        };

    }


    /*
     * Spread 1:
     *
     * página 2
     * página 3
     *
     * Spread 2:
     *
     * página 4
     * página 5
     */

    const leftIndex =
        currentSpread * 2 - 1;

    const rightIndex =
        currentSpread * 2;


    return {

        left:
            leftIndex,

        right:
            rightIndex

    };

}


/* =========================================================
   RENDER
========================================================= */

function renderSpread() {

    const spread =
        getSpreadPages();


    leftSlot.innerHTML =
        getPage(
            spread.left
        );


    rightSlot.innerHTML =
        getPage(
            spread.right
        );


    updateCounter();

}


/* =========================================================
   COUNTER
========================================================= */

function updateCounter() {

    const spread =
        getSpreadPages();


    let visiblePage =
        spread.right + 1;


    if (
        currentSpread > 0
    ) {

        visiblePage =
            spread.left + 1;

    }


    pageCounter.textContent =
        String(
            Math.max(
                visiblePage,
                1
            )
        ).padStart(
            2,
            "0"
        );


    totalCounter.textContent =
        String(
            pages.length
        ).padStart(
            2,
            "0"
        );

}


/* =========================================================
   ANIMATE FORWARD
========================================================= */

function nextSpread() {

    if (isAnimating) {
        return;
    }


    const maxSpread =
        Math.ceil(
            pages.length / 2
        );


    if (
        currentSpread >=
        maxSpread
    ) {
        return;
    }


    const current =
        getSpreadPages();


    const nextSpreadIndex =
        currentSpread + 1;


    const nextLeft =
        nextSpreadIndex * 2 - 1;


    const nextRight =
        nextSpreadIndex * 2;


    /*
     * La página que vemos a la derecha
     * será el frente de la hoja.
     */

    turnFront.innerHTML =
        getPage(
            current.right
        );


    /*
     * El reverso será la página que
     * aparecerá a la izquierda después.
     */

    turnBack.innerHTML =
        getPage(
            nextLeft
        );


    /*
     * Debajo ya ponemos la página
     * que quedará visible a la derecha.
     */

    rightSlot.innerHTML =
        getPage(
            nextRight
        );


    turningSheet.classList.add(
        "active"
    );


    turningSheet.style.transform =
        `
        rotateY(0deg)
        translateZ(0)
        `;


    isAnimating = true;


    const duration =
        850;


    const start =
        performance.now();


    function frame(now) {

        const progress =
            Math.min(
                (
                    now -
                    start
                ) /
                duration,
                1
            );


        const eased =
            progress < .5

                ? 4 *
                  progress *
                  progress *
                  progress

                : 1 -
                  Math.pow(
                      -2 *
                      progress +
                      2,
                      3
                  ) /
                  2;


        const angle =
            -180 *
            eased;


        const bend =
            Math.sin(
                eased *
                Math.PI
            );


        turningSheet.style.transform =
            `
            rotateY(${angle}deg)
            translateZ(${bend * 30}px)
            `;


        turningSheet.style.setProperty(
            "--turn-shadow",
            bend * .75
        );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                frame
            );

        }

        else {

            currentSpread++;


            turningSheet.classList.remove(
                "active"
            );


            turningSheet.style.transform =
                "rotateY(0deg)";


            isAnimating = false;


            renderSpread();

        }

    }


    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   ANIMATE BACKWARD
========================================================= */

function previousSpread() {

    if (
        isAnimating ||
        currentSpread <= 0
    ) {
        return;
    }


    const current =
        getSpreadPages();


    const previousSpreadIndex =
        currentSpread - 1;


    let previousLeft;
    let previousRight;


    if (
        previousSpreadIndex === 0
    ) {

        previousLeft = -1;
        previousRight = 0;

    }

    else {

        previousLeft =
            previousSpreadIndex * 2 - 1;

        previousRight =
            previousSpreadIndex * 2;

    }


    /*
     * La hoja arranca del lado izquierdo.
     */

    turningSheet.style.left =
        "0";


    turningSheet.style.transformOrigin =
        "right center";


    turnFront.innerHTML =
        getPage(
            current.left
        );


    turnBack.innerHTML =
        getPage(
            previousRight
        );


    leftSlot.innerHTML =
        getPage(
            previousLeft
        );


    turningSheet.classList.add(
        "active"
    );


    turningSheet.style.transform =
        `
        rotateY(0deg)
        translateZ(0)
        `;


    isAnimating = true;


    const duration =
        850;


    const start =
        performance.now();


    function frame(now) {

        const progress =
            Math.min(
                (
                    now -
                    start
                ) /
                duration,
                1
            );


        const eased =
            progress < .5

                ? 4 *
                  progress *
                  progress *
                  progress

                : 1 -
                  Math.pow(
                      -2 *
                      progress +
                      2,
                      3
                  ) /
                  2;


        const angle =
            180 *
            eased;


        const bend =
            Math.sin(
                eased *
                Math.PI
            );


        turningSheet.style.transform =
            `
            rotateY(${angle}deg)
            translateZ(${bend * 30}px)
            `;


        turningSheet.style.setProperty(
            "--turn-shadow",
            bend * .75
        );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                frame
            );

        }

        else {

            currentSpread--;


            turningSheet.classList.remove(
                "active"
            );


            turningSheet.style.left =
                "50%";


            turningSheet.style.transformOrigin =
                "left center";


            turningSheet.style.transform =
                "rotateY(0deg)";


            isAnimating = false;


            renderSpread();

        }

    }


    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   COVER
========================================================= */

function goToCover() {

    if (isAnimating) {
        return;
    }


    currentSpread = 0;


    renderSpread();

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
            error
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

nextButton.addEventListener(
    "click",
    nextSpread
);


prevButton.addEventListener(
    "click",
    previousSpread
);


coverButton.addEventListener(
    "click",
    goToCover
);


fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSpread();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousSpread();

        }

    }
);


/* =========================================================
   INITIAL
========================================================= */

renderSpread();
