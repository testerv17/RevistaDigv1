/* =========================================================
   MÉXICO — REVISTA DIGITAL
   BOOK ENGINE v0.5
========================================================= */


/* =========================================================
   DOM
========================================================= */

const magazine =
    document.getElementById(
        "magazine"
    );

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

const pageCastShadow =
    document.getElementById(
        "pageCastShadow"
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
   PAGES
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

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );

}


function easeInOutCubic(t) {

    return t < .5

        ? 4 * t * t * t

        : 1 -
        Math.pow(
            -2 * t + 2,
            3
        ) / 2;

}


function getPage(index) {

    if (
        index < 0 ||
        index >= pages.length
    ) {

        return `
            <div
                class="
                    page-content
                    page-empty
                ">
            </div>
        `;

    }


    return pages[
        index
    ].html;

}


/* =========================================================
   SPREAD
========================================================= */

function getSpreadPages() {

    if (
        currentSpread === 0
    ) {

        return {

            left: -1,
            right: 0

        };

    }


    return {

        left:
            currentSpread * 2 - 1,

        right:
            currentSpread * 2

    };

}


/* =========================================================
   BOOK MODE
========================================================= */

function updateBookMode() {

    magazine.classList.remove(
        "cover-mode",
        "open-mode",
        "opening"
    );


    if (
        currentSpread === 0
    ) {

        magazine.classList.add(
            "cover-mode"
        );

    }

    else {

        magazine.classList.add(
            "open-mode"
        );

    }

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


    updateBookMode();

    updateCounter();

}


/* =========================================================
   COUNTER
========================================================= */

function updateCounter() {

    const spread =
        getSpreadPages();


    let visiblePage;


    if (
        currentSpread === 0
    ) {

        visiblePage = 1;

    }

    else {

        visiblePage =
            spread.left + 1;

    }


    pageCounter.textContent =
        String(
            visiblePage
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
   PHYSICAL TURN
========================================================= */

function animatePhysicalTurn({

    sheet,

    direction,

    from,

    to,

    duration,

    onComplete

}) {

    isAnimating = true;


    sheet.classList.add(
        "active"
    );


    const start =
        performance.now();


    function frame(now) {

        const raw =
            clamp(
                (
                    now -
                    start
                ) /
                duration,
                0,
                1
            );


        const eased =
            easeInOutCubic(
                raw
            );


        const progress =
            from +
            (
                to - from
            ) *
            eased;


        const angle =
            direction ===
            "forward"

                ? -180 * progress

                : 180 * progress;


        /*
         * Bend:
         *
         * 0 al inicio
         * 1 cerca del centro
         * 0 al final
         */

        const bend =
            Math.sin(
                progress *
                Math.PI
            );


        /*
         * Arco vertical.
         */

        const rotateX =
            Math.sin(
                progress *
                Math.PI
            ) *
            -4.2;


        /*
         * Hace que el papel
         * pierda ligeramente anchura
         * cuando está de canto.
         */

        const scaleX =
            1 -
            bend *
            .055;


        /*
         * Elevamos la hoja.
         */

        const lift =
            bend *
            48;


        /*
         * Pequeña inclinación del borde.
         */

        const skew =
            bend *
            (
                direction ===
                "forward"

                    ? -1.5

                    : 1.5
            );


        sheet.style.transform =
            `
            rotateY(${angle}deg)
            rotateX(${rotateX}deg)
            skewY(${skew}deg)
            scaleX(${scaleX})
            translateZ(${lift}px)
            `;


        /*
         * Sombra de la hoja.
         */

        sheet.style.setProperty(
            "--turn-shadow",
            bend * .88
        );


        sheet.style.setProperty(
            "--shadow-power",
            bend * .92
        );


        sheet.style.setProperty(
            "--fold",
            bend
        );


        sheet.style.setProperty(
            "--fold-offset",
            progress * 120
        );


        /*
         * Sombra proyectada
         * sobre la hoja inferior.
         */

        if (
            direction ===
            "forward"
        ) {

            pageCastShadow.style.left =
                "50%";

            pageCastShadow.style.transformOrigin =
                "left center";

        }

        else {

            pageCastShadow.style.left =
                "0";

            pageCastShadow.style.transformOrigin =
                "right center";

        }


        pageCastShadow.style.opacity =
            bend * .65;


        pageCastShadow.style.transform =
            `
            scaleX(
                ${1 + bend * .35}
            )
            translateZ(
                ${bend * 8}px
            )
            `;


        /*
         * Lighting independiente
         * para anverso y reverso.
         */

        const frontBrightness =
            1 -
            bend * .18;


        const backBrightness =
            .84 +
            progress *
            .16;


        turnFront.style.filter =
            `
            brightness(
                ${frontBrightness}
            )
            `;


        turnBack.style.filter =
            `
            brightness(
                ${backBrightness}
            )
            `;


        if (
            raw < 1
        ) {

            requestAnimationFrame(
                frame
            );

        }

        else {

            sheet.classList.remove(
                "active"
            );


            pageCastShadow.style.opacity =
                "0";


            sheet.style.transform =
                "rotateY(0deg)";


            turnFront.style.filter =
                "";

            turnBack.style.filter =
                "";


            isAnimating = false;


            onComplete?.();

        }

    }


    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   OPEN COVER
========================================================= */

function openCover() {

    if (
        isAnimating ||
        currentSpread !== 0
    ) {
        return;
    }


    /*
     * Portada como frente.
     */

    turnFront.innerHTML =
        getPage(
            0
        );


    /*
     * Página 02
     * queda al reverso físico
     * de la portada.
     */

    turnBack.innerHTML =
        getPage(
            1
        );


    /*
     * Oaxaca ya espera debajo
     * en el lado derecho.
     */

    rightSlot.innerHTML =
        getPage(
            2
        );


    magazine.classList.add(
        "opening"
    );


    turningSheet.style.left =
        "0";


    turningSheet.style.width =
        "100%";


    turningSheet.style.transformOrigin =
        "left center";


    /*
     * Expandimos primero
     * la revista.
     */

    magazine.classList.remove(
        "cover-mode"
    );


    magazine.classList.add(
        "open-mode"
    );


    setTimeout(
        () => {

            /*
             * Ahora limitamos la hoja
             * a la página derecha física.
             */

            turningSheet.style.width =
                "50%";


            turningSheet.style.left =
                "50%";


            turningSheet.style.transformOrigin =
                "left center";


            leftSlot.innerHTML =
                getPage(
                    1
                );


            animatePhysicalTurn({

                sheet:
                    turningSheet,

                direction:
                    "forward",

                from:
                    0,

                to:
                    1,

                duration:
                    950,

                onComplete:
                    () => {

                        currentSpread = 1;

                        turningSheet.style.width =
                            "50%";

                        turningSheet.style.left =
                            "50%";

                        magazine.classList.remove(
                            "opening"
                        );

                        renderSpread();

                    }

            });

        },

        260
    );

}


/* =========================================================
   NEXT SPREAD
========================================================= */

function nextSpread() {

    if (isAnimating) {
        return;
    }


    /*
     * Si estamos en portada,
     * primero abrimos la revista.
     */

    if (
        currentSpread === 0
    ) {

        openCover();

        return;

    }


    const nextSpreadIndex =
        currentSpread + 1;


    const nextLeft =
        nextSpreadIndex * 2 - 1;


    const nextRight =
        nextSpreadIndex * 2;


    if (
        nextLeft >=
        pages.length
    ) {
        return;
    }


    const current =
        getSpreadPages();


    turnFront.innerHTML =
        getPage(
            current.right
        );


    turnBack.innerHTML =
        getPage(
            nextLeft
        );


    rightSlot.innerHTML =
        getPage(
            nextRight
        );


    turningSheet.style.width =
        "50%";


    turningSheet.style.left =
        "50%";


    turningSheet.style.transformOrigin =
        "left center";


    animatePhysicalTurn({

        sheet:
            turningSheet,

        direction:
            "forward",

        from:
            0,

        to:
            1,

        duration:
            900,

        onComplete:
            () => {

                currentSpread++;

                renderSpread();

            }

    });

}


/* =========================================================
   PREVIOUS SPREAD
========================================================= */

function previousSpread() {

    if (
        isAnimating ||
        currentSpread <= 0
    ) {
        return;
    }


    /*
     * Volvemos de spread 1
     * a portada.
     */

    if (
        currentSpread === 1
    ) {

        closeToCover();

        return;

    }


    const current =
        getSpreadPages();


    const previousSpreadIndex =
        currentSpread - 1;


    const previousLeft =
        previousSpreadIndex * 2 - 1;


    const previousRight =
        previousSpreadIndex * 2;


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


    turningSheet.style.width =
        "50%";


    turningSheet.style.left =
        "0";


    turningSheet.style.transformOrigin =
        "right center";


    animatePhysicalTurn({

        sheet:
            turningSheet,

        direction:
            "backward",

        from:
            0,

        to:
            1,

        duration:
            900,

        onComplete:
            () => {

                currentSpread--;

                turningSheet.style.left =
                    "50%";

                turningSheet.style.transformOrigin =
                    "left center";

                renderSpread();

            }

    });

}


/* =========================================================
   CLOSE TO COVER
========================================================= */

function closeToCover() {

    if (
        isAnimating ||
        currentSpread !== 1
    ) {
        return;
    }


    /*
     * Página izquierda:
     * página 02.
     *
     * Al cerrar,
     * vuelve a convertirse en reverso
     * de la portada.
     */

    turnFront.innerHTML =
        getPage(
            1
        );


    turnBack.innerHTML =
        getPage(
            0
        );


    turningSheet.style.width =
        "50%";


    turningSheet.style.left =
        "0";


    turningSheet.style.transformOrigin =
        "right center";


    animatePhysicalTurn({

        sheet:
            turningSheet,

        direction:
            "backward",

        from:
            0,

        to:
            1,

        duration:
            900,

        onComplete:
            () => {

                currentSpread = 0;


                /*
                 * Volvemos al modo
                 * revista cerrada.
                 */

                renderSpread();


                turningSheet.style.left =
                    "0";


                turningSheet.style.width =
                    "100%";


                setTimeout(
                    () => {

                        turningSheet.style.left =
                            "50%";

                        turningSheet.style.width =
                            "50%";

                    },

                    760
                );

            }

    });

}


/* =========================================================
   COVER BUTTON
========================================================= */

function goToCover() {

    if (isAnimating) {
        return;
    }


    if (
        currentSpread === 0
    ) {
        return;
    }


    /*
     * Por ahora navegamos hacia atrás
     * una hoja por pulsación.
     *
     * Después podemos hacer navegación
     * rápida animada.
     */

    previousSpread();

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
   INITIALIZE
========================================================= */

renderSpread();
