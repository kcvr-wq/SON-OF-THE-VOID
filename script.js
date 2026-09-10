document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    const KEYS = {

        intro:
            "sov_intro_seen",

        lastChapter:
            "sov_last_chapter",

        siteTheme:
            "sov_site_theme",

        siteMotion:
            "sov_site_motion",

        readerSize:
            "sov_reader_size",

        readerFont:
            "sov_reader_font",

        readerWidth:
            "sov_reader_width",

        readerLine:
            "sov_reader_line",

        readerParagraph:
            "sov_reader_paragraph",

        readerMode:
            "sov_reader_mode"

    };


    /* =====================================================
       INTRO
    ===================================================== */

    const intro =
        document.getElementById("intro");

    const site =
        document.getElementById("site");


    if (intro && site) {

        const introSeen =
            sessionStorage.getItem(
                KEYS.intro
            );


        if (introSeen === "true") {

            intro.style.display =
                "none";

            site.classList.add(
                "show"
            );

        } else {

            site.classList.remove(
                "show"
            );


            setTimeout(() => {

                intro.classList.add(
                    "hide"
                );

                site.classList.add(
                    "show"
                );

                sessionStorage.setItem(
                    KEYS.intro,
                    "true"
                );

            }, 3200);

        }

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const currentPage =
        document.body.dataset.page ||
        "home";


    function activateHashSection() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        if (!hash) {
            return;
        }


        const target =
            document.getElementById(
                hash
            );


        if (!target) {
            return;
        }


        const sections =
            document.querySelectorAll(
                ".page-section"
            );


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        target.classList.add(
            "active-section"
        );


        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.section === hash
            );

        });


        setTimeout(() => {

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        }, 0);

    }


    navLinks.forEach(link => {

        const section =
            link.dataset.section;


        if (
            section &&
            section === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }


        link.addEventListener(
            "click",
            () => {

                const href =
                    link.dataset.href;


                /* صفحة مستقلة */

                if (href) {

                    window.location.href =
                        href;

                    return;

                }


                /* قسم داخل الصفحة */

                if (!section) {
                    return;
                }


                const target =
                    document.getElementById(
                        section
                    );


                if (!target) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".page-section"
                    )
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


                link.classList.add(
                    "active"
                );


                window.history.replaceState(
                    null,
                    "",
                    `#${section}`
                );


                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    });


    /*
     * مهم جدًا:
     * index.html#world
     *
     * يفتح عالم الرواية مباشرة.
     */

    activateHashSection();


    /* =====================================================
       HOME — START READING
    ===================================================== */

    const startReading =
        document.getElementById(
            "startReading"
        );


    function getLastChapter() {

        return localStorage.getItem(
            KEYS.lastChapter
        ) || "01";

    }


    function chapterUrl(number) {

        const chapter =
            String(number)
                .padStart(2, "0");


        return `PATH%20OF%20THE%20VOID/chapter-${chapter}.html`;

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


    const continueReading =
        document.getElementById(
            "continueReading"
        );


    if (continueReading) {

        continueReading.addEventListener(
            "click",
            () => {

                window.location.href =
                    chapterUrl(
                        getLastChapter()
                    );

            }
        );

    }


    /* =====================================================
       SITE THEME
    ===================================================== */

    const themeOptions =
        document.querySelectorAll(
            "[data-theme]"
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


    /* =====================================================
       SITE MOTION
    ===================================================== */

    const motionOptions =
        document.querySelectorAll(
            "[data-motion]"
        );


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
       READER DETECTION
    ===================================================== */

    const chapterContent =
        document.getElementById(
            "chapterContent"
        );

    const readingProgressBar =
        document.getElementById(
            "readingProgressBar"
        );


    /*
     * إذا لم تكن هذه صفحة قراءة،
     * نتوقف هنا بعد تشغيل النظام العام.
     */

    if (
        !chapterContent ||
        !readingProgressBar
    ) {

        return;

    }


    /* =====================================================
       READER CHAPTER
    ===================================================== */

    const chapterNumber =
        document.body.dataset.chapter ||
        "01";


    const chapterKey =
        `sov_chapter_${chapterNumber}`;


    const READER_KEYS = {

        position:
            `${chapterKey}_position`,

        progress:
            `${chapterKey}_progress`,

        completed:
            `${chapterKey}_completed`

    };


    /* =====================================================
       READING PROGRESS
    ===================================================== */

    function getReadingProgress() {

        const documentHeight =
            document.documentElement
                .scrollHeight;


        const viewportHeight =
            window.innerHeight;


        const maxScroll =
            documentHeight -
            viewportHeight;


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


    function updateReadingProgress(
        progress
    ) {

        const value =
            Math.min(
                100,
                Math.max(
                    0,
                    progress
                )
            );


        readingProgressBar.style.width =
            `${value}%`;

    }


    /* =====================================================
       SAVE READING STATE
    ===================================================== */

    function saveReadingState() {

        const rawProgress =
            getReadingProgress();


        const progress =
            rawProgress >= 98
                ? 100
                : rawProgress;


        localStorage.setItem(
            READER_KEYS.position,
            String(window.scrollY)
        );


        localStorage.setItem(
            READER_KEYS.progress,
            String(progress)
        );


        localStorage.setItem(
            READER_KEYS.completed,
            progress >= 100
                ? "true"
                : "false"
        );


        localStorage.setItem(
            KEYS.lastChapter,
            chapterNumber
        );


        updateReadingProgress(
            progress
        );

    }


    /* =====================================================
       SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        saveReadingState,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        () => {

            updateReadingProgress(
                getReadingProgress()
            );

        }
    );


    window.addEventListener(
        "pagehide",
        saveReadingState
    );


    window.addEventListener(
        "beforeunload",
        saveReadingState
    );


    /* =====================================================
       RESTORE POSITION
    ===================================================== */

    const savedPosition =
        parseFloat(
            localStorage.getItem(
                READER_KEYS.position
            )
        );


    if (
        Number.isFinite(
            savedPosition
        ) &&
        savedPosition > 20
    ) {

        setTimeout(() => {

            window.scrollTo({

                top:
                    savedPosition,

                behavior:
                    "auto"

            });


            updateReadingProgress(
                getReadingProgress()
            );

        }, 120);

    } else {

        updateReadingProgress(
            getReadingProgress()
        );

    }


    /* =====================================================
       SETTINGS PANEL
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

                if (!settingsOverlay) {
                    return;
                }


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

            if (
                event.key ===
                "Escape"
            ) {

                closeSettingsPanel();

            }

        }
    );


    /* =====================================================
       FONT SIZE
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


                updateReadingProgress(
                    getReadingProgress()
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


                updateReadingProgress(
                    getReadingProgress()
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


                updateReadingProgress(
                    getReadingProgress()
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


                updateReadingProgress(
                    getReadingProgress()
                );

            }
        );

    });


    /* =====================================================
       PARAGRAPH SPACING
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


                updateReadingProgress(
                    getReadingProgress()
                );

            }
        );

    });


    /* =====================================================
       READER MODE
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


                if (
                    mode === "oled"
                ) {

                    document.body.classList.add(
                        "oled-mode"
                    );

                }


                if (
                    mode === "sepia"
                ) {

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
                option.dataset.size ===
                savedSize
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
                option.dataset.font ===
                savedFont
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
                option.dataset.width ===
                savedWidth
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
                option.dataset.line ===
                savedLine
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
                option.dataset.paragraph ===
                savedParagraph
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


        if (
            savedMode === "oled"
        ) {

            document.body.classList.add(
                "oled-mode"
            );

        }


        if (
            savedMode === "sepia"
        ) {

            document.body.classList.add(
                "sepia-mode"
            );

        }


        modeOptions.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.mode ===
                savedMode
            );

        });

    }


    /* =====================================================
       CHAPTER LIST
    ===================================================== */

    const chapterListButton =
        document.getElementById(
            "chapterListButton"
        );


    if (chapterListButton) {

        chapterListButton.addEventListener(
            "click",
            () => {

                saveReadingState();


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

                    if (
                        !document.fullscreenElement
                    ) {

                        await document
                            .documentElement
                            .requestFullscreen();

                    } else {

                        await document
                            .exitFullscreen();

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
       HIDE READER UI
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
