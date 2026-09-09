document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");


    /*
     * شاشة الدخول
     */

    setTimeout(() => {

        if (intro) {
            intro.classList.add("hide");
        }

        if (site) {
            site.classList.add("show");
        }

    }, 3200);



    /*
     * التنقل بين الأقسام
     */

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const targetId = link.dataset.section;

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            sections.forEach(section => {
                section.classList.remove("active-section");
            });

            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add("active-section");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });



    /*
     * مسار الفصل الأول
     */

    const chapterOnePath =
        "PATH OF THE VOID/chapter-01/index.html";



    /*
     * زر ابدأ القراءة
     *
     * يبدأ من بداية الفصل
     */

    const startReading =
        document.getElementById("startReading");

    if (startReading) {

        startReading.addEventListener("click", () => {

            window.location.href =
                chapterOnePath;

        });

    }



    /*
     * زر تابع القراءة
     *
     * يفتح آخر موضع محفوظ
     */

    const continueReading =
        document.getElementById("continueReading");

    if (continueReading) {

        continueReading.addEventListener("click", () => {

            const savedPosition =
                localStorage.getItem("sov-reading-position");

            if (savedPosition) {

                window.location.href =
                    chapterOnePath + "#continue";

            } else {

                window.location.href =
                    chapterOnePath;

            }

        });

    }



    /*
     * الوضع المظلم
     */

    const darkToggle =
        document.getElementById("darkToggle");

    if (darkToggle) {

        darkToggle.addEventListener("click", () => {

            darkToggle.classList.toggle("active");

            if (darkToggle.classList.contains("active")) {

                document.body.style.filter = "none";

            } else {

                document.body.style.filter =
                    "brightness(0.75)";

            }

        });

    }



    /*
     * الحركة
     */

    const motionToggle =
        document.getElementById("motionToggle");

    if (motionToggle) {

        motionToggle.addEventListener("click", () => {

            motionToggle.classList.toggle("active");

            document.body.classList.toggle(
                "no-motion",
                !motionToggle.classList.contains("active")
            );

        });

    }

});
