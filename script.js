document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL KEYS
    ===================================================== */

    const KEYS = {
        intro: "sov_intro_seen",

        lastChapter: "sov_last_chapter",

        siteTheme: "sov_site_theme",
        siteMotion: "sov_site_motion",

        readerSize: "sov_reader_size",
        readerFont: "sov_reader_font",
        readerWidth: "sov_reader_width",
        readerLine: "sov_reader_line",
        readerParagraph: "sov_reader_paragraph",
        readerMode: "sov_reader_mode"
    };


    /* =====================================================
       INTRO
    ===================================================== */

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");

    if (intro && site) {

        const introSeen =
            sessionStorage.getItem(KEYS.intro);

        if (introSeen === "true") {

            intro.style.display = "none";
            site.classList.add("show");

        } else {

            site.classList.remove("show");

            setTimeout(() => {

                intro.classList.add("hide");
                site.classList.add("show");

                sessionStorage.setItem(
                    KEYS.intro,
                    "true"
                );

            }, 3200);

        }

    }


    /* =====================================================
       MAIN SITE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const currentPage =
        document.body.dataset.page || "home";

    navLinks.forEach(link => {

        const section =
            link.dataset.section;

        if (section === currentPage) {

            link.classList.add("active");

        } else if (!section) {

            link.classList.remove("active");

        }


        link.addEventListener("click", () => {

            if (link.dataset.href) {

                window.location.href =
                    link.dataset.href;

                return;

            }

            if (!section) {
                return;
            }

            const target =
                document.getElementById(section);

            if (!target) {
                return;
            }

            document
                .querySelectorAll(".page-section")
                .forEach(item => {

                    item.classList.remove(
                        "active-section"
                    );

                });

            target.classList.add(
                "active-section"
            );

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            link.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HOME — START / CONTINUE
    ===================================================== */

    const startReading =
        document.getElementById("startReading");

    const continueReading =
        document.getElementById("continueReading");


    function getLastChapter() {

        return localStorage.getItem(
            KEYS.lastChapter
        ) || "01";

    }


    function chapterUrl(number) {

        const padded =
            String(number).padStart(2, "0");

        return `PATH%20OF%20THE%20VOID/chapter-${padded}.html`;

    }


    function openLastChapter() {

        window.location.href =
            chapterUrl(
                getLastChapter()
            );

    }


    if (startReading) {

        startReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    chapterUrl("01");

            }
        );

    }


    if (continueReading) {

        continueReading.addEventListener(
            "click",
            openLastChapter
        );

    }


    /* =====================================================
       SHARED SITE SETTINGS
    ===================================================== */

    const themeOptions =
        document.querySelectorAll(
            "[data-theme]"
        );

    const motionOptions =
        document.querySelectorAll(
            "[data-motion]"
        );


    function applyTheme(theme) {

        document.body.classList.toggle(
            "light-mode",
            theme === "light"
        );

        themeOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.theme === theme
            );

        });

        localStorage.setItem(
            KEYS.siteTheme,
            theme
        );

    }


    function applyMotion(motion) {

        document.body.classList.toggle(
            "no-motion",
            motion === "off"
        );

        motionOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.motion === motion
            );

        });

        localStorage.setItem(
            KEYS.siteMotion,
            motion
        );

    }


    if (themeOptions.length) {

        themeOptions.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    applyTheme(
                        option.dataset.theme
                    );

                }
            );

        });


        applyTheme(
            localStorage.getItem(
                KEYS.siteTheme
            ) || "dark"
        );

    }


    if (motionOptions.length) {

        motionOptions.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    applyMotion(
                        option.dataset.motion
                    );

                }
            );

        });


        applyMotion(
            localStorage.getItem(
                KEYS.siteMotion
            ) || "on"
        );

    }


    /* =====================================================
       READER
    ===================================================== */

    const chapterContent =
        document.getElementById(
            "chapterContent"
        );

    const readingProgressBar =
        document.getElementById(
            "readingProgressBar"
        );


    if (!chapterContent || !readingProgressBar) {
        return;
    }


    const chapterNumber =
        document.body.dataset.chapter || "01";

    const chapterKey =
        `sov_chapter_${chapterNumber}`;


    const readerKeys = {

        position:
            `${chapterKey}_position`,

        progress:
            `${chapterKey}_progress`,

        completed:
            `${chapterKey}_completed`

    };


    /* =====================================================
       READER HELPERS
    ===================================================== */

    function getReadingProgress() {

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (maxScroll <= 0) {
            return 0;
        }

        return Math.min(
            100,
            Math.max(
                0,
                (
                    window.scrollY /
                    maxScroll
                ) * 100
            )
        );

    }


    function saveReadingState() {

        const progress =
            getReadingProgress();


        localStorage.setItem(
            readerKeys.position,
            String(window.scrollY)
        );


        localStorage.setItem(
            readerKeys.progress,
            String(progress)
        );


        localStorage.setItem(
            KEYS.lastChapter,
            chapterNumber
        );


        const completed =
            progress >= 98;


        localStorage.setItem(
            readerKeys.completed,
            completed
                ? "true"
                : "false"
        );


        if (completed) {

            localStorage.setItem(
                `${chapterKey}_progress`,
                "100"
            );

        }

        updateReaderProgress(
            completed
                ? 100
                : progress
        );

    }


    function updateReaderProgress(value) {

        const progress =
            Math.min(
                100,
                Math.max(
                    0,
                    value
                )
            );

        readingProgressBar.style.width =
            `${progress}%`;

    }


    function restoreReadingPosition() {

        const savedPosition =
            parseFloat(
                localStorage.getItem(
                    readerKeys.position
                )
            );


        if (
            Number.isFinite(savedPosition) &&
            savedPosition > 20
        ) {

            setTimeout(() => {

                window.scrollTo({
                    top: savedPosition,
                    behavior: "auto"
                });

                updateReaderProgress(
                    getReadingProgress()
                );

            }, 120);

        } else {

            updateReaderProgress(
                getReadingProgress()
            );

        }

    }


    window.addEventListener(
        "scroll",
        saveReadingState,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        () => {

            updateReaderProgress(
                getReadingProgress()
            );

        }
    );


    window.addEventListener(
        "pagehide",
        saveReadingState
    );


    restoreReadingPosition();


    /* =====================================================
       READER SETTINGS
    ===================================================== */

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );

    const closeSettings =
        document.getElementById(
            "closeSettings"
        );

    const settingsOverlay =
        document.getElementById(
            "settingsOverlay"
        );


    function closeSettingsPanel() {

        if (settingsOverlay) {

            settingsOverlay.classList.remove(
                "open"
            );

        }

    }


    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            () => {

                settingsOverlay.classList.add(
                    "open"
                );

                document.body.classList.remove(
                    "reader-ui-hidden"
                );

            }
        );

    }


    if (closeSettings) {

        closeSettings.addEventListener(
            "click",
            closeSettingsPanel
        );

    }


    if (settingsOverlay) {

        settingsOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    settingsOverlay
                ) {

                    closeSettingsPanel();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSettingsPanel();

            }

        }
    );


    /* =====================================================
       GENERIC SETTING BINDERS
    ===================================================== */

    function bindOptions(
        selector,
        storageKey,
        callback
    ) {

        const options =
            document.querySelectorAll(
                selector
            );

        options.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const value =
                        option.dataset[
                            Object.keys(
                                option.dataset
                            )[0]
                        ];

                    callback(
                        value,
                        option,
                        options
                    );

                    localStorage.setItem(
                        storageKey,
                        value
                    );

                    options.forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });

                    option.classList.add(
                        "active"
                    );

                    updateReaderProgress(
                        getReadingProgress()
                    );

                }
            );

        });

    }


    /* =====================================================
       SIZE
    ===================================================== */

    const sizeOptions =
        document.querySelectorAll(
            "[data-size]"
        );


    sizeOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const value =
                    option.dataset.size;

                document.documentElement
                    .style
                    .setProperty(
                        "--reader-size",
                        `${value}px`
                    );

                sizeOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                option.classList.add(
                    "active"
                );

                localStorage.setItem(
                    KEYS.readerSize,
                    value
                );

            }
        );

    });


    /* =====================================================
       FONT
    ===================================================== */

    const fontOptions =
        document.querySelectorAll(
            "[data-font]"
        );


    fontOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const value =
                    option.dataset.font;


                document.body.classList.toggle(
                    "amiri-mode",
                    value === "amiri"
                );


                fontOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                localStorage.setItem(
                    KEYS.readerFont,
                    value
                );

            }
        );

    });


    /* =====================================================
       WIDTH
    ===================================================== */

    const widthOptions =
        document.querySelectorAll(
            "[data-width]"
        );


    widthOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const value =
                    option.dataset.width;


                document.documentElement
                    .style
                    .setProperty(
                        "--reader-width",
                        `${value}px`
                    );


                widthOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                localStorage.setItem(
                    KEYS.readerWidth,
                    value
                );

            }
        );

    });


    /* =====================================================
       LINE HEIGHT
    ===================================================== */

    const lineOptions =
        document.querySelectorAll(
            "[data-line]"
        );


    lineOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const value =
                    option.dataset.line;


                document.documentElement
                    .style
                    .setProperty(
                        "--reader-line-height",
                        value
                    );


                lineOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                localStorage.setItem(
                    KEYS.readerLine,
                    value
                );

            }
        );

    });


    /* =====================================================
       PARAGRAPH
    ===================================================== */

    const paragraphOptions =
        document.querySelectorAll(
            "[data-paragraph]"
        );


    paragraphOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const value =
                    option.dataset.paragraph;


                document.documentElement
                    .style
                    .setProperty(
                        "--reader-paragraph-space",
                        `${value}px`
                    );


                paragraphOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                localStorage.setItem(
                    KEYS.readerParagraph,
                    value
                );

            }
        );

    });


    /* =====================================================
       MODE
    ===================================================== */

    const modeOptions =
        document.querySelectorAll(
            "[data-mode]"
        );


    modeOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const mode =
                    option.dataset.mode;


                document.body.classList.remove(
                    "oled-mode",
                    "sepia-mode"
                );


                if (mode === "oled") {

                    document.body.classList.add(
                        "oled-mode"
                    );

                }


                if (mode === "sepia") {

                    document.body.classList.add(
                        "sepia-mode"
                    );

                }


                modeOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                localStorage.setItem(
                    KEYS.readerMode,
                    mode
                );

            }
        );

    });


    /* =====================================================
       LOAD SAVED READER SETTINGS
    ===================================================== */

    const savedSize =
        localStorage.getItem(
            KEYS.readerSize
        );

    if (savedSize) {

        document.documentElement
            .style
            .setProperty(
                "--reader-size",
                `${savedSize}px`
            );

        sizeOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.size === savedSize
            );

        });

    }


    const savedFont =
        localStorage.getItem(
            KEYS.readerFont
        );

    if (savedFont) {

        document.body.classList.toggle(
            "amiri-mode",
            savedFont === "amiri"
        );

        fontOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.font === savedFont
            );

        });

    }


    const savedWidth =
        localStorage.getItem(
            KEYS.readerWidth
        );

    if (savedWidth) {

        document.documentElement
            .style
            .setProperty(
                "--reader-width",
                `${savedWidth}px`
            );

        widthOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.width === savedWidth
            );

        });

    }


    const savedLine =
        localStorage.getItem(
            KEYS.readerLine
        );

    if (savedLine) {

        document.documentElement
            .style
            .setProperty(
                "--reader-line-height",
                savedLine
            );

        lineOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.line === savedLine
            );

        });

    }


    const savedParagraph =
        localStorage.getItem(
            KEYS.readerParagraph
        );

    if (savedParagraph) {

        document.documentElement
            .style
            .setProperty(
                "--reader-paragraph-space",
                `${savedParagraph}px`
            );

        paragraphOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.paragraph === savedParagraph
            );

        });

    }


    const savedMode =
        localStorage.getItem(
            KEYS.readerMode
        );

    if (savedMode) {

        document.body.classList.remove(
            "oled-mode",
            "sepia-mode"
        );


        if (savedMode === "oled") {

            document.body.classList.add(
                "oled-mode"
            );

        }


        if (savedMode === "sepia") {

            document.body.classList.add(
                "sepia-mode"
            );

        }


        modeOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.mode === savedMode
            );

        });

    }


    /* =====================================================
       CHAPTER LIST BUTTON
    ===================================================== */

    const chapterListButton =
        document.getElementById(
            "chapterListButton"
        );


    if (chapterListButton) {

        chapterListButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "../chapters/index.html";

            }
        );

    }


    /* =====================================================
       FULLSCREEN
    ===================================================== */

    const fullscreenButton =
        document.getElementById(
            "fullscreenButton"
        );


    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                try {

                    if (!document.fullscreenElement) {

                        await document.documentElement
                            .requestFullscreen();

                    } else {

                        await document.exitFullscreen();

                    }

                } catch {

                    document.body.classList.toggle(
                        "reader-ui-hidden"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "fullscreenchange",
        () => {

            if (!fullscreenButton) {
                return;
            }

            fullscreenButton.textContent =
                document.fullscreenElement
                    ? "خروج"
                    : "ملء الشاشة";

        }
    );


    /* =====================================================
       HIDE UI
    ===================================================== */

    let uiTimer = null;


    function showReaderUI() {

        document.body.classList.remove(
            "reader-ui-hidden"
        );


        clearTimeout(
            uiTimer
        );


        uiTimer =
            setTimeout(
                () => {

                    if (
                        !settingsOverlay ||
                        !settingsOverlay.classList.contains(
                            "open"
                        )
                    ) {

                        document.body.classList.add(
                            "reader-ui-hidden"
                        );

                    }

                },
                2600
            );

    }


    document.addEventListener(
        "mousemove",
        showReaderUI,
        { passive: true }
    );


    document.addEventListener(
        "touchstart",
        showReaderUI,
        { passive: true }
    );


    document.addEventListener(
        "click",
        showReaderUI
    );


    document.addEventListener(
        "keydown",
        showReaderUI
    );


    showReaderUI();

});
