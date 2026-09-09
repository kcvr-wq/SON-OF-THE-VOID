document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       INTRO — FIRST VISIT ONLY
    ===================================================== */

    const intro =
        document.getElementById("intro");

    const site =
        document.getElementById("site");


    const introSeen =
        localStorage.getItem("sov_intro_seen");


    if (introSeen === "true") {

        /*
         * الانترو تم عرضه سابقًا.
         * لا نعرضه ولا حتى ننتظر الـ3.2 ثانية.
         */

        if (intro) {

            intro.style.display = "none";

        }

        if (site) {

            site.classList.add("show");

        }

    } else {

        /*
         * أول زيارة فقط.
         */

        setTimeout(() => {

            if (intro) {

                intro.classList.add("hide");

            }

            if (site) {

                site.classList.add("show");

            }

            localStorage.setItem(
                "sov_intro_seen",
                "true"
            );

        }, 3200);

    }



    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll(".page-section");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const targetId =
                link.dataset.section;


            navLinks.forEach(item => {

                item.classList.remove("active");

            });


            link.classList.add("active");


            sections.forEach(section => {

                section.classList.remove(
                    "active-section"
                );

            });


            const targetSection =
                document.getElementById(targetId);


            if (targetSection) {

                targetSection.classList.add(
                    "active-section"
                );

            }


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       VOLUME OPEN / CLOSE
    ===================================================== */

    const volumeHeaders =
        document.querySelectorAll(".volume-header");


    volumeHeaders.forEach(header => {

        header.addEventListener("click", () => {

            const volume =
                header.closest(".volume-item");


            if (!volume) return;


            const isOpen =
                volume.classList.contains("open");


            document
                .querySelectorAll(".volume-item")
                .forEach(item => {

                    item.classList.remove("open");


                    const itemHeader =
                        item.querySelector(".volume-header");


                    if (itemHeader) {

                        itemHeader.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


            if (!isOpen) {

                volume.classList.add("open");


                header.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });



    /* =====================================================
       START READING
    ===================================================== */

    const startReading =
        document.getElementById("startReading");


    if (startReading) {

        startReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    "PATH%20OF%20THE%20VOID/chapter-01.html";

            }
        );

    }



    /* =====================================================
       CONTINUE READING
    ===================================================== */

    const continueReading =
        document.getElementById("continueReading");


    if (continueReading) {

        continueReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    "PATH%20OF%20THE%20VOID/chapter-01.html";

            }
        );

    }



    /* =====================================================
       DARK MODE
    ===================================================== */

    const darkToggle =
        document.getElementById("darkToggle");


    if (darkToggle) {

        darkToggle.addEventListener(
            "click",
            () => {

                darkToggle.classList.toggle("active");


                if (
                    darkToggle.classList.contains(
                        "active"
                    )
                ) {

                    document.body.style.filter =
                        "none";

                } else {

                    document.body.style.filter =
                        "brightness(0.75)";

                }

            }
        );

    }



    /* =====================================================
       MOTION
    ===================================================== */

    const motionToggle =
        document.getElementById("motionToggle");


    if (motionToggle) {

        motionToggle.addEventListener(
            "click",
            () => {

                motionToggle.classList.toggle("active");


                document.body.classList.toggle(
                    "no-motion",
                    !motionToggle.classList.contains(
                        "active"
                    )
                );

            }

        );

    }

});
