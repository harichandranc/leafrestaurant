/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    /* -----------------------------------------
       FIX LOADER LOGO
    ----------------------------------------- */

    const loaderLogo =
        loader.querySelector("img, svg");

    if (loaderLogo) {

        loaderLogo.style.display = "block";
        loaderLogo.style.width = "auto";
        loaderLogo.style.height = "auto";
        loaderLogo.style.maxWidth = "85vw";
        loaderLogo.style.maxHeight = "140px";
        loaderLogo.style.objectFit = "contain";
        loaderLogo.style.objectPosition = "center";
        loaderLogo.style.margin = "0 auto";

    }


    /* -----------------------------------------
       WAIT FOR LOGO IMAGE TO LOAD
    ----------------------------------------- */

    const logoImage = loader.querySelector("img");

    const hideLoader = () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1200);

    };


    if (logoImage) {

        if (logoImage.complete) {

            hideLoader();

        } else {

            logoImage.addEventListener(
                "load",
                hideLoader,
                { once: true }
            );

            logoImage.addEventListener(
                "error",
                hideLoader,
                { once: true }
            );

        }

    } else {

        hideLoader();

    }

});



/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


if (cursor && cursorDot) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.15;

        cursorY +=
            (mouseY - cursorY) * 0.15;


        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document
        .querySelectorAll("a, button")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.style.width =
                        "60px";

                    cursor.style.height =
                        "60px";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.style.width =
                        "35px";

                    cursor.style.height =
                        "35px";

                }
            );

        });

}



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });

}



/* =========================================================
   HERO 3D PARALLAX
========================================================= */

const heroVisual =
    document.getElementById("heroVisual");

const dishCard =
    document.querySelector(".dish-card");


if (
    heroVisual &&
    dishCard &&
    window.innerWidth > 900
) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 8;

            const rotateX =
                ((centerY - y) / centerY) * 6;


            dishCard.style.transform =
                `
                rotateY(${-8 + rotateY}deg)
                rotateX(${4 + rotateX}deg)
                translateZ(20px)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            dishCard.style.transform =
                `
                rotateY(-8deg)
                rotateX(4deg)
                `;

        }
    );

}



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 250;


            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* =========================================================
   IMAGE PARALLAX
========================================================= */

const images =
    document.querySelectorAll(
        ".experience-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        images.forEach(image => {

            const parent =
                image.parentElement;


            if (!parent) return;


            const rect =
                parent.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight;


            if (
                rect.top < viewportHeight &&
                rect.bottom > 0
            ) {

                const progress =
                    (viewportHeight - rect.top) /
                    (viewportHeight + rect.height);


                const movement =
                    (progress - 0.5) * 20;


                image.style.transform =
                    `scale(1.05) translateY(${movement}px)`;

            }

        });

    }
);