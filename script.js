document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       INTRO — ONCE PER SESSION
    ===================================================== */

    const intro =
        document.getElementById("intro");

    const site =
        document.getElementById("site");


    const introSeen =
        sessionStorage.getItem("sov_intro_seen");


    if (introSeen === "true") {

        /*
         * Refresh داخل نفس الجلسة:
         * لا يظهر الانترو.
         */

        if (intro) {

            intro.style.display = "none";

        }

        if (site) {

            site.classList.add("show");

        }

    } else {

        /*
         * أول فتح للموقع في هذه الجلسة:
         * اعرض الانترو.
         */

        if (site) {

            site.classList.remove("show");

        }


        setTimeout(() => {

            if (intro) {

                intro.classList.add("hide");

            }

            if (site) {

                site.classList.add("show");

            }


            sessionStorage.setItem(
                "sov_intro_seen",
                "true"
            );

        }, 3200);

    }



    /* =====================================================
       NAVIGATION
       الصفحات المستقلة:
       الفصول → chapters/index.html
       إعدادات الموقع → settings/index.html
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const targetId =
                link.dataset.section;


            /*
             * إذا كان الرابط للفصول
             */

            if (
                link.textContent.includes("الفصول")
                &&
                !targetId
            ) {

                window.location.href =
                    "chapters/index.html";

                return;

            }


            /*
             * إذا كان الرابط لإعدادات الموقع
             */

            if (
                link.textContent.includes("إعدادات الموقع")
                &&
                !targetId
            ) {

                window.location.href =
                    "settings/index.html";

                return;

            }


            /*
             * الأقسام الموجودة داخل الرئيسية
             */

            if (!targetId) {
                return;
            }


            const sections =
                document.querySelectorAll(".page-section");


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
                        item.querySelector(
                            ".volume-header"
                        );


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
       SITE THEME
       إعدادات عامة للموقع
    ===================================================== */

    const darkToggle =
        document.getElementById("darkToggle");


    const savedTheme =
        localStorage.getItem(
            "sov_site_theme"
        ) || "dark";


    function applySiteTheme(theme) {

        if (!darkToggle) {
            return;
        }


        if (theme === "dark") {

            darkToggle.classList.add(
                "active"
            );

            document.body.style.filter =
                "none";

        } else {

            darkToggle.classList.remove(
                "active"
            );

            document.body.style.filter =
                "brightness(0.75)";

        }


        localStorage.setItem(
            "sov_site_theme",
            theme
        );

    }


    if (darkToggle) {

        darkToggle.addEventListener(
            "click",
            () => {

                const isDark =
                    darkToggle.classList.contains(
                        "active"
                    );


                applySiteTheme(
                    isDark
                        ? "light"
                        : "dark"
                );

            }
        );


        applySiteTheme(
            savedTheme
        );

    }



    /* =====================================================
       MOTION
       إعداد الحركة العامة للموقع
    ===================================================== */

    const motionToggle =
        document.getElementById("motionToggle");


    const savedMotion =
        localStorage.getItem(
            "sov_site_motion"
        ) || "on";


    function applyMotion(motion) {

        const enabled =
            motion === "on";


        if (motionToggle) {

            motionToggle.classList.toggle(
                "active",
                enabled
            );

        }


        document.body.classList.toggle(
            "no-motion",
            !enabled
        );


        localStorage.setItem(
            "sov_site_motion",
            motion
        );

    }


    if (motionToggle) {

        motionToggle.addEventListener(
            "click",
            () => {

                const enabled =
                    motionToggle.classList.contains(
                        "active"
                    );


                applyMotion(
                    enabled
                        ? "off"
                        : "on"
                );

            }
        );


        applyMotion(
            savedMotion
        );

    }

});
