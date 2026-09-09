document.addEventListener("DOMContentLoaded", () => {

    /*
     * =====================================================
     * INTRO
     * =====================================================
     */

    const intro =
        document.getElementById("intro");

    const site =
        document.getElementById("site");


    setTimeout(() => {

        if (intro) {
            intro.classList.add("hide");
        }

        if (site) {
            site.classList.add("show");
        }

    }, 3200);



    /*
     * =====================================================
     * NAVIGATION
     * =====================================================
     */

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



    /*
     * =====================================================
     * PATH OF THE VOID
     * =====================================================
     */

    const pathOfTheVoid =
        "PATH%20OF%20THE%20VOID/index.html";



    /*
     * =====================================================
     * START READING
     * =====================================================
     */

    const startReading =
        document.getElementById(
            "startReading"
        );


    if (startReading) {

        startReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    pathOfTheVoid;

            }
        );

    }



    /*
     * =====================================================
     * CONTINUE READING
     * =====================================================
     *
     * حاليًا نفس مكان البداية.
     * سنربطه بنظام الحفظ الحقيقي
     * عندما ننتهي من بناء القارئ.
     */

    const continueReading =
        document.getElementById(
            "continueReading"
        );


    if (continueReading) {

        continueReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    pathOfTheVoid;

            }
        );

    }



    /*
     * =====================================================
     * DARK MODE
     * =====================================================
     */

    const darkToggle =
        document.getElementById(
            "darkToggle"
        );


    if (darkToggle) {

        darkToggle.addEventListener(
            "click",
            () => {

                darkToggle.classList.toggle(
                    "active"
                );


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



    /*
     * =====================================================
     * MOTION
     * =====================================================
     */

    const motionToggle =
        document.getElementById(
            "motionToggle"
        );


    if (motionToggle) {

        motionToggle.addEventListener(
            "click",
            () => {

                motionToggle.classList.toggle(
                    "active"
                );


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
