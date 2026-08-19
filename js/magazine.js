/* =========================================================
   MÉXICO — REVISTA DIGITAL
   PAGE ENGINE v0.3
========================================================= */

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


/* =========================================================
   STATE
========================================================= */

let currentSheet = 0;

let isAnimating = false;

let dragMode = null;

let activeSheet = null;

let dragStartX = 0;

let dragStartY = 0;

let dragProgress = 0;

let pointerYRatio = 1;


/* =========================================================
   HELPERS
========================================================= */

function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}


function easeOutQuint(t) {

    return 1 -
        Math.pow(
            1 - t,
            5
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


/* =========================================================
   CREATE CURL ELEMENTS
========================================================= */

function createPhysicalLayers() {

    sheets.forEach(
        (sheet) => {

            const corner =
                document.createElement(
                    "div"
                );

            corner.className =
                "page-corner";


            const curl =
                document.createElement(
                    "div"
                );

            curl.className =
                "curl-layer";


            const shadow =
                document.createElement(
                    "div"
                );

            shadow.className =
                "curl-shadow";


            sheet.appendChild(
                shadow
            );

            sheet.appendChild(
                curl
            );

            sheet.appendChild(
                corner
            );

        }
    );

}


createPhysicalLayers();


/* =========================================================
   PHYSICAL PAGE TRANSFORM
========================================================= */

function applyTurn(
    sheet,
    progress,
    yRatio = .85
) {

    progress =
        clamp(
            progress,
            0,
            1
        );


    yRatio =
        clamp(
            yRatio,
            0,
            1
        );


    /*
     * Rotación principal.
     */

    const angle =
        -180 * progress;


    /*
     * La curvatura alcanza su máximo
     * cerca del centro del movimiento.
     */

    const bend =
        Math.sin(
            progress *
            Math.PI
        );


    /*
     * Mayor perspectiva mientras
     * la hoja cruza el centro.
     */

    const scaleX =
        1 -
        bend * .045;


    /*
     * Curvatura asimétrica dependiendo
     * de dónde esté el puntero.
     */

    const verticalBias =
        (yRatio - .5) * 2;


    const skewY =
        verticalBias *
        bend *
        -3.2;


    const rotateX =
        verticalBias *
        bend *
        -5;


    /*
     * Ligero arqueamiento.
     */

    const translateZ =
        bend * 36;


    sheet.style.transform =
        `
        rotateY(${angle}deg)
        rotateX(${rotateX}deg)
        skewY(${skewY}deg)
        scaleX(${scaleX})
        translateZ(${translateZ}px)
        `;


    /*
     * Variables CSS.
     */

    sheet.style.setProperty(
        "--turn",
        progress
    );


    sheet.style.setProperty(
        "--bend",
        bend
    );


    sheet.style.setProperty(
        "--shadow",
        bend * .92
    );


    /*
     * Control de la esquina visual.
     */

    const curlAngle =
        -45 +
        progress * 170 +
        verticalBias * 12;


    const curlScale =
        .55 +
        bend * 1.15;


    const curlX =
        -progress * 135;


    const curlY =
        -progress *
        (
            80 +
            verticalBias * 70
        );


    const curl =
        sheet.querySelector(
            ".curl-layer"
        );


    const shadow =
        sheet.querySelector(
            ".curl-shadow"
        );


    if (curl) {

        curl.style.transform =
            `
            translate(
                ${curlX}px,
                ${curlY}px
            )
            rotate(${curlAngle}deg)
            scale(${curlScale})
            `;

    }


    if (shadow) {

        shadow.style.transform =
            `
            translate(
                ${curlX * .72}px,
                ${curlY * .62}px
            )
            rotate(${curlAngle}deg)
            scale(
                ${1 + bend * .55}
            )
            `;

    }


    /*
     * Ajuste de iluminación.
     */

    const front =
        sheet.querySelector(
            ".page-front"
        );

    const back =
        sheet.querySelector(
            ".page-back"
        );


    if (front) {

        front.style.filter =
            `
            brightness(
                ${1 - bend * .16}
            )
            `;

    }


    if (back) {

        back.style.filter =
            `
            brightness(
                ${.88 + progress * .12}
            )
            `;

    }


    /*
     * Estado visual.
     */

    if (
        progress > .001 &&
        progress < .999
    ) {

        sheet.classList.add(
            "turning"
        );

    }

    else {

        sheet.classList.remove(
            "turning"
        );

    }

}


/* =========================================================
   ANIMATION
========================================================= */

function animateTurn(
    sheet,
    from,
    to,
    yRatio,
    duration,
    callback
) {

    if (isAnimating) {
        return;
    }


    isAnimating = true;

    sheet.classList.add(
        "turning"
    );


    const start =
        performance.now();


    function frame(now) {

        const elapsed =
            now - start;


        const raw =
            clamp(
                elapsed /
                duration,
                0,
                1
            );


        /*
         * Para el cierre usamos un easing
         * suave pero con sensación de peso.
         */

        const eased =
            easeInOutCubic(
                raw
            );


        const value =
            from +
            (
                to - from
            ) *
            eased;


        applyTurn(
            sheet,
            value,
            yRatio
        );


        if (raw < 1) {

            requestAnimationFrame(
                frame
            );

        }

        else {

            isAnimating = false;

            sheet.classList.remove(
                "turning"
            );


            callback?.();

        }

    }


    requestAnimationFrame(
        frame
    );

}


/* =========================================================
   STACK
========================================================= */

function updateStack() {

    sheets.forEach(
        (sheet, index) => {

            /*
             * Las hojas todavía no volteadas
             * permanecen arriba.
             */

            if (
                index >=
                currentSheet
            ) {

                sheet.style.zIndex =
                    200 - index;

            }

            /*
             * Hojas ya pasadas.
             */

            else {

                sheet.style.zIndex =
                    20 + index;

            }

        }
    );

}


/* =========================================================
   BOOK POSITION
========================================================= */

function updateBookPosition() {

    /*
     * Cerrado.
     */

    if (
        currentSheet === 0
    ) {

        book.style.transform =
            `
            rotateX(2deg)
            rotateY(-2deg)
            translateX(0)
            `;

    }

    /*
     * Abierto.
     */

    else {

        book.style.transform =
            `
            rotateX(1deg)
            rotateY(0deg)
            translateX(48%)
            `;

    }

}


/* =========================================================
   NEXT
========================================================= */

function nextPage() {

    if (
        isAnimating ||
        dragMode
    ) {
        return;
    }


    if (
        currentSheet >=
        sheets.length
    ) {
        return;
    }


    const sheet =
        sheets[
            currentSheet
        ];


    sheet.style.zIndex = 500;


    animateTurn(

        sheet,

        0,

        1,

        .85,

        920,

        () => {

            applyTurn(
                sheet,
                1,
                .85
            );


            currentSheet++;


            updateStack();

            updateBookPosition();

            updatePageIndicator();

        }

    );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousPage() {

    if (
        isAnimating ||
        dragMode
    ) {
        return;
    }


    if (
        currentSheet <= 0
    ) {
        return;
    }


    currentSheet--;


    const sheet =
        sheets[
            currentSheet
        ];


    sheet.style.zIndex = 500;


    animateTurn(

        sheet,

        1,

        0,

        .6,

        880,

        () => {

            applyTurn(
                sheet,
                0,
                .85
            );


            updateStack();

            updateBookPosition();

            updatePageIndicator();

        }

    );

}


/* =========================================================
   POINTER DOWN
========================================================= */

function pointerDown(event) {

    if (isAnimating) {
        return;
    }


    const rect =
        book.getBoundingClientRect();


    const normalizedX =
        (
            event.clientX -
            rect.left
        ) /
        rect.width;


    /*
     * AVANZAR
     *
     * Activamos desde aproximadamente
     * el último 40% de la página.
     */

    if (
        normalizedX > .58 &&
        currentSheet <
        sheets.length
    ) {

        dragMode =
            "forward";


        activeSheet =
            sheets[
                currentSheet
            ];


        dragProgress = 0;

    }


    /*
     * RETROCEDER
     *
     * Si ya existen páginas volteadas,
     * dejamos tomar la zona izquierda.
     */

    else if (
        normalizedX < .22 &&
        currentSheet > 0
    ) {

        dragMode =
            "backward";


        activeSheet =
            sheets[
                currentSheet - 1
            ];


        dragProgress = 1;

    }


    else {

        return;

    }


    dragStartX =
        event.clientX;


    dragStartY =
        event.clientY;


    const sheetRect =
        activeSheet
            .getBoundingClientRect();


    pointerYRatio =
        clamp(
            (
                event.clientY -
                sheetRect.top
            ) /
            sheetRect.height,
            0,
            1
        );


    activeSheet.style.zIndex =
        600;


    activeSheet.classList.add(
        "dragging"
    );


    activeSheet
        .setPointerCapture?.(
            event.pointerId
        );


    event.preventDefault();

}


/* =========================================================
   POINTER MOVE
========================================================= */

function pointerMove(event) {

    if (
        !dragMode ||
        !activeSheet
    ) {
        return;
    }


    const rect =
        activeSheet
            .getBoundingClientRect();


    const width =
        Math.max(
            rect.width,
            1
        );


    pointerYRatio =
        clamp(
            (
                event.clientY -
                rect.top
            ) /
            rect.height,
            0,
            1
        );


    /*
     * HACIA ADELANTE
     */

    if (
        dragMode ===
        "forward"
    ) {

        const distance =
            dragStartX -
            event.clientX;


        dragProgress =
            clamp(
                distance /
                (
                    width * .82
                ),
                0,
                1
            );

    }


    /*
     * HACIA ATRÁS
     */

    else {

        const distance =
            event.clientX -
            dragStartX;


        dragProgress =
            clamp(
                1 -
                distance /
                (
                    width * .82
                ),
                0,
                1
            );

    }


    applyTurn(
        activeSheet,
        dragProgress,
        pointerYRatio
    );

}


/* =========================================================
   POINTER UP
========================================================= */

function pointerUp(event) {

    if (
        !dragMode ||
        !activeSheet
    ) {
        return;
    }


    const mode =
        dragMode;


    const sheet =
        activeSheet;


    sheet.classList.remove(
        "dragging"
    );


    sheet
        .releasePointerCapture?.(
            event.pointerId
        );


    dragMode = null;

    activeSheet = null;


    /*
     * FORWARD
     */

    if (
        mode ===
        "forward"
    ) {

        const finish =
            dragProgress > .28;


        if (finish) {

            animateTurn(

                sheet,

                dragProgress,

                1,

                pointerYRatio,

                520,

                () => {

                    applyTurn(
                        sheet,
                        1,
                        pointerYRatio
                    );


                    currentSheet++;


                    updateStack();

                    updateBookPosition();

                    updatePageIndicator();

                }

            );

        }

        else {

            animateTurn(

                sheet,

                dragProgress,

                0,

                pointerYRatio,

                390,

                () => {

                    applyTurn(
                        sheet,
                        0,
                        pointerYRatio
                    );


                    updateStack();

                }

            );

        }

    }


    /*
     * BACKWARD
     */

    else {

        const returnPage =
            dragProgress < .72;


        if (returnPage) {

            animateTurn(

                sheet,

                dragProgress,

                0,

                pointerYRatio,

                520,

                () => {

                    currentSheet--;


                    applyTurn(
                        sheet,
                        0,
                        pointerYRatio
                    );


                    updateStack();

                    updateBookPosition();

                    updatePageIndicator();

                }

            );

        }

        else {

            animateTurn(

                sheet,

                dragProgress,

                1,

                pointerYRatio,

                380,

                () => {

                    applyTurn(
                        sheet,
                        1,
                        pointerYRatio
                    );


                    updateStack();

                }

            );

        }

    }

}


/* =========================================================
   PAGE INDICATOR
========================================================= */

function updatePageIndicator() {

    let visiblePage;


    if (
        currentSheet === 0
    ) {

        visiblePage = 1;

    }

    else {

        visiblePage =
            Math.min(
                currentSheet * 2,
                sheets.length * 2
            );

    }


    currentPageDisplay.textContent =
        String(
            visiblePage
        ).padStart(
            2,
            "0"
        );

}


/* =========================================================
   COVER
========================================================= */

function goToCover() {

    if (
        isAnimating ||
        dragMode ||
        currentSheet === 0
    ) {
        return;
    }


    previousPage();

}


/*
 * Nota:
 *
 * Por ahora PORTADA regresa una página
 * cada pulsación. Posteriormente construiremos
 * navegación animada multipágina.
 */


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
   POINTER EVENTS
========================================================= */

book.addEventListener(
    "pointerdown",
    pointerDown
);


window.addEventListener(
    "pointermove",
    pointerMove,
    {
        passive: false
    }
);


window.addEventListener(
    "pointerup",
    pointerUp
);


window.addEventListener(
    "pointercancel",
    pointerUp
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

    }

);


/* =========================================================
   BUTTONS
========================================================= */

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


/* =========================================================
   INITIALIZE
========================================================= */

function initializeBook() {

    sheets.forEach(
        sheet => {

            applyTurn(
                sheet,
                0,
                .85
            );

        }
    );


    updateStack();

    updateBookPosition();

    updatePageIndicator();

}


initializeBook();
