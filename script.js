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
       
       الرئيسية وعالم الرواية موجودان داخل index.html.
       
       الفصول وإعدادات الموقع صفحات مستقلة:
       
       chapters/index.html
       settings/index.html
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const targetId =
                link.dataset.section;


            /*
             * الفصول
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
             * إعدادات الموقع
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
             * لا يوجد قسم داخلي
             */

            if (!targetId) {

                return;

            }


            const sections =
                document.querySelectorAll(
                    ".page-section"
                );


            /*
             * تحديث العنصر النشط
             */

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            link.classList.add(
                "active"
            );


            /*
             * إخفاء جميع الأقسام
             */

            sections.forEach(section => {

                section.classList.remove(
                    "active-section"
                );

            });


            /*
             * إظهار القسم المطلوب
             */

            const targetSection =
                document.getElementById(
                    targetId
                );


            if (targetSection) {

                targetSection.classList.add(
                    "active-section"
                );

            }


            /*
             * العودة إلى أعلى الصفحة
             */

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       START READING
    ===================================================== */

    const startReading =
        document.getElementById(
            "startReading"
        );


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
        document.getElementById(
            "continueReading"
        );


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
       NOTE
       
       إعدادات الموقع نفسها أصبحت في:
       
       settings/index.html
       
       وإعدادات القراءة أصبحت داخل صفحات الفصول.
    ===================================================== */


});
