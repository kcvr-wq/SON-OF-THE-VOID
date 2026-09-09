document.addEventListener("DOMContentLoaded", () => {


    /*
     * =========================
     * ELEMENTS
     * =========================
     */

    const body =
        document.body;

    const chapterContent =
        document.getElementById("chapterContent");

    const readingProgress =
        document.getElementById("readingProgress");


    const settingsPanel =
        document.getElementById("readerSettings");

    const settingsOverlay =
        document.getElementById("settingsOverlay");


    const openReaderSettings =
        document.getElementById("openReaderSettings");

    const closeReaderSettings =
        document.getElementById("closeReaderSettings");


    const progressToggle =
        document.getElementById("progressToggle");


    const backHome =
        document.getElementById("backHome");


    const openChapterList =
        document.getElementById("openChapterList");

    const closeChapterList =
        document.getElementById("closeChapterList");

    const chapterListOverlay =
        document.getElementById("chapterListOverlay");



    /*
     * =========================
     * STORAGE
     * =========================
     */

    const STORAGE_KEY =
        "sov-reader-settings";

    const POSITION_KEY =
        "sov-reading-position";



    /*
     * الإعدادات الافتراضية
     */

    const defaultSettings = {

        size: "medium",

        font: "cairo",

        width: "medium",

        line: "relaxed",

        paragraph: "medium",

        theme: "dark",

        progress: true

    };



    /*
     * تحميل الإعدادات
     */

    let settings =
        loadSettings();



    /*
     * =========================
     * SETTINGS LOAD
     * =========================
     */

    function loadSettings() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return {
                    ...defaultSettings
                };
            }

            return {
                ...defaultSettings,
                ...JSON.parse(saved)
            };

        } catch (error) {

            return {
                ...defaultSettings
            };

        }

    }



    /*
     * =========================
     * SAVE SETTINGS
     * =========================
     */

    function saveSettings() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );

    }



    /*
     * =========================
     * OPEN / CLOSE SETTINGS
     * =========================
     */

    function openSettings() {

        settingsPanel.classList.add("open");

        settingsOverlay.classList.add("open");

    }


    function closeSettings() {

        settingsPanel.classList.remove("open");

        settingsOverlay.classList.remove("open");

    }


    openReaderSettings.addEventListener(
        "click",
        openSettings
    );


    closeReaderSettings.addEventListener(
        "click",
        closeSettings
    );


    settingsOverlay.addEventListener(
        "click",
        closeSettings
    );



    /*
     * =========================
     * CHAPTER LIST
     * =========================
     */

    openChapterList.addEventListener(
        "click",
        () => {

            chapterListOverlay.classList.add("open");

        }
    );


    closeChapterList.addEventListener(
        "click",
        () => {

            chapterListOverlay.classList.remove("open");

        }
    );


    chapterListOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                chapterListOverlay
            ) {

                chapterListOverlay.classList.remove(
                    "open"
                );

            }

        }
    );



    /*
     * =========================
     * BACK HOME
     * =========================
     */

    backHome.addEventListener(
        "click",
        () => {

            window.location.href =
                "../../index.html";

        }
    );



    /*
     * =========================
     * APPLY SETTINGS
     * =========================
     */

    function applySettings() {


        /*
         * حجم الخط
         */

        const sizeMap = {

            small: "17px",

            medium: "19px",

            large: "22px",

            xlarge: "25px"

        };


        document.documentElement.style.setProperty(
            "--reader-size",
            sizeMap[settings.size] || "19px"
        );



        /*
         * عرض النص
         */

        const widthMap = {

            narrow: "650px",

            medium: "780px",

            wide: "900px"

        };


        document.documentElement.style.setProperty(
            "--reader-width",
            widthMap[settings.width] || "780px"
        );



        /*
         * تباعد الأسطر
         */

        const lineMap = {

            normal: "1.8",

            relaxed: "2.15",

            spacious: "2.5"

        };


        document.documentElement.style.setProperty(
            "--reader-line",
            lineMap[settings.line] || "2.15"
        );



        /*
         * تباعد الفقرات
         */

        const paragraphMap = {

            small: "18px",

            medium: "28px",

            large: "40px"

        };


        document.documentElement.style.setProperty(
            "--reader-paragraph",
            paragraphMap[settings.paragraph] || "28px"
        );



        /*
         * الخط
         */

        body.classList.remove(
            "font-cairo",
            "font-naskh",
            "font-serif"
        );

        body.classList.add(
            `font-${settings.font}`
        );



        /*
         * Theme
         */

        body.classList.remove(
            "theme-dark",
            "theme-oled",
            "theme-light",
            "theme-sepia"
        );

        body.classList.add(
            `theme-${settings.theme}`
        );



        /*
         * Progress
         */

        body.classList.toggle(
            "hide-progress",
            !settings.progress
        );



        /*
         * تحديث الأزرار
         */

        updateSelectedButtons();

        updateProgressToggle();

    }



    /*
     * =========================
     * BUTTON STATES
     * =========================
     */

    function updateSelectedButtons() {


        document
            .querySelectorAll("[data-size]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.size === settings.size
                );

            });


        document
            .querySelectorAll("[data-font]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.font === settings.font
                );

            });


        document
            .querySelectorAll("[data-width]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.width === settings.width
                );

            });


        document
            .querySelectorAll("[data-line]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.line === settings.line
                );

            });


        document
            .querySelectorAll("[data-paragraph]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.paragraph === settings.paragraph
                );

            });


        document
            .querySelectorAll("[data-theme]")
            .forEach(button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.theme === settings.theme
                );

            });

    }



    /*
     * =========================
     * PROGRESS TOGGLE
     * =========================
     */

    function updateProgressToggle() {

        progressToggle.classList.toggle(
            "active",
            settings.progress
        );

    }



    /*
     * =========================
     * SETTING BUTTONS
     * =========================
     */

    document
        .querySelectorAll("[data-size]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.size =
                        button.dataset.size;

                    saveSettings();

                    applySettings();

                }
            );

        });


    document
        .querySelectorAll("[data-font]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.font =
                        button.dataset.font;

                    saveSettings();

                    applySettings();

                }
            );

        });


    document
        .querySelectorAll("[data-width]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.width =
                        button.dataset.width;

                    saveSettings();

                    applySettings();

                }
            );

        });


    document
        .querySelectorAll("[data-line]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.line =
                        button.dataset.line;

                    saveSettings();

                    applySettings();

                }
            );

        });


    document
        .querySelectorAll("[data-paragraph]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.paragraph =
                        button.dataset.paragraph;

                    saveSettings();

                    applySettings();

                }
            );

        });


    document
        .querySelectorAll("[data-theme]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    settings.theme =
                        button.dataset.theme;

                    saveSettings();

                    applySettings();

                }
            );

        });



    /*
     * =========================
     * PROGRESS SWITCH
     * =========================
     */

    progressToggle.addEventListener(
        "click",
        () => {

            settings.progress =
                !settings.progress;

            saveSettings();

            applySettings();

        }
    );



    /*
     * =========================
     * READING PROGRESS
     * =========================
     */

    function updateReadingProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {

            readingProgress.style.width =
                "0%";

            return;

        }


        const percentage =
            (scrollTop / documentHeight) * 100;


        readingProgress.style.width =
            `${Math.min(100, Math.max(0, percentage))}%`;

    }



    /*
     * =========================
     * SAVE READING POSITION
     * =========================
     */

    let saveTimer;


    function saveReadingPosition() {

        clearTimeout(saveTimer);

        saveTimer = setTimeout(() => {

            localStorage.setItem(
                POSITION_KEY,
                String(window.scrollY)
            );

        }, 150);

    }



    window.addEventListener(
        "scroll",
        () => {

            updateReadingProgress();

            saveReadingPosition();

        },
        {
            passive: true
        }
    );



    /*
     * =========================
     * CONTINUE READING
     * =========================
     */

    function continueReading() {

        const hash =
            window.location.hash;

        if (hash !== "#continue") {
            return;
        }


        const savedPosition =
            localStorage.getItem(POSITION_KEY);

        if (!savedPosition) {
            return;
        }


        setTimeout(() => {

            window.scrollTo({
                top:
                    Number(savedPosition),
                behavior:
                    "smooth"
            });

        }, 450);

    }



    /*
     * =========================
     * INITIALIZATION
     * =========================
     */

    applySettings();

    updateReadingProgress();

    continueReading();

});
