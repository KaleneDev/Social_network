import { useEffect, ReactNode } from "react";

interface Props {
    children: ReactNode;
    duration?: number;
    delay?: number;
    scroll?: string;
}
const TextAnimationBtoT = ({ children, duration, delay, scroll }: Props) => {
    const className = `animationTextBotToTop `;
    const delays = delay || 0;
    const animationDurations = duration || 0.5;
    const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.animationTextBotToTop`);

        function checkContent() {
            textElement.forEach((element: any) => {
                // const observerOptions = {
                //     root: null,
                //     rootMargin: "0px",
                //     threshold: 0.5,
                // };
                // const observer = new IntersectionObserver((entries) => {
                //     entries.forEach((entry) => {
                //         if (entry.isIntersecting) {
                //             checkContent();
                //         }
                //     });
                // }, observerOptions);

                // observer.observe(element);

                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;

                const textElementSpan = element.querySelectorAll("div > * ");

                textElementSpan.forEach((element: any) => {
                    element.style.top = element.offsetHeight + "px";
                });
                animation(element.offsetHeight, 0.1);

                const triggerBottom = (window.innerHeight / 5) * 4 + 150;
                function animation(top: number, duration: number) {
                    //Set the height
                    element.style.height = textElementSpan.offsetHeight + "px";
                    element.style.display = "inline-block";
                    element.style.overflow = "hidden";

                    //Set animation
                    textElementSpan.forEach((elementChild: any) => {
                        elementChild.style.position = "relative";
                        elementChild.style.transition = `top ${
                            animationDurations * duration
                        }s ease-in-out ${delays}s`;
                        elementChild.style.top = top + "px";
                    });
                }
                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }
                if (elementTop > triggerBottom || elementBot < 0) {
                    animation(element.offsetHeight, 0.1);
                } else {
                    animation(0, 1);
                }
            });
        }

        checkContent();
        window.addEventListener("scroll", checkContent);
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);
    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};
// const FadeIn = ({ children, duration }: props) => {
//     // const className = `fadeIn`;
//     // const animationDurations = duration || 0.5;
//     // useEffect(() => {
//     //     const textElement = document.querySelectorAll(`.fadeIn`);
//     //     textElement.forEach((element) => {
//     //         element.style.opacity = 0;
//     //         let currentTime = 0;
//     //         const increment = 16; // Intervalle de temps entre chaque étape de l'animation (en millisecondes)
//     //         const animate = () => {
//     //             const keyAnimationDuration =
//     //                 element.getAttribute("animationDuration") * 1000;
//     //             currentTime += increment;
//     //             const opacity = currentTime / keyAnimationDuration; // Calcule l'opacité en fonction du temps écoulé et de la durée totale
//     //             element.style.opacity = opacity > 1 ? 1 : opacity; // Limite l'opacité à une valeur maximale de 1
//     //             if (currentTime < keyAnimationDuration) {
//     //                 // Vérifie si l'animation est terminée
//     //                 requestAnimationFrame(animate); // Réexécute la fonction d'animation pour l'étape suivante
//     //             }
//     //         };
//     //         animate();
//     //     });
//     // }, []);
//     // return (
//     //     <div className={className} duration={animationDurations}>
//     //         {children}
//     //     </div>
//     // );
// };
const SlideInFromRight = ({ children, duration, delay, scroll }: Props) => {
    const className = `slideInFromRight`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.slideInFromRight`);

        textElement.forEach((element) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);
            observer.observe(element);
            element.childNodes.forEach((child: any) => {
                child.style.opacity = 0;
                child.style.transform = "translateX(100%)";
            });
        });

        function checkContent() {
            const triggerBottom = (window.innerHeight / 5) * 4 + 150;

            textElement.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;

                // const keyAnimationDuration = element.getAttribute("duration");
                // const keyAnimationDelay = element.getAttribute("delay");
                // const keyAnimationScroll = element.getAttribute("scroll");

                function animation(
                    opacity: number,
                    transform: number,
                    duration: number
                ) {
                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.opacity = opacity;
                        child.style.transition = `transform ${
                            animationDurations * duration
                        }s ease ${delays}s, opacity ${
                            animationDurations * duration * 1.5
                        }s ease`;
                        child.style.transform = `translateX(${transform}%)`;
                    });
                }

                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }

                if (elementTop > triggerBottom || elementBot < 0) {
                    animation(0, 120, 0.5);
                } else {
                    animation(1, 0, 1);
                }
            });
        }
        checkContent();
        window.addEventListener("scroll", checkContent);
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);
    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};
const SlideInFromLeft = ({ children, duration, delay, scroll }: Props) => {
    const className = `slideInFromLeft`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.slideInFromLeft`);

        textElement.forEach((element: any) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);

            observer.observe(element);
            element.childNodes.forEach((child: any) => {
                child.style.opacity = 0;
                child.style.transform = "translateX(-100%)";
            });
        });

        function checkContent() {
            const triggerBottom = (window.innerHeight / 5) * 4 + 150;
            textElement.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;
                function animation(
                    opacity: number,
                    transform: number,
                    duration: number
                ) {
                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.opacity = opacity;
                        child.style.transition = `transform ${
                            animationDurations * duration
                        }s ease, opacity ${
                            animationDurations * duration * 1.5
                        }s ease`;
                        child.style.animationDelay = `${delays}s`;
                        child.style.transform = `translateX(${transform}%)`;
                    });
                }

                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }
                if (elementTop > triggerBottom || elementBot < 0) {
                    animation(0, -100, 0.5);
                } else {
                    animation(1, 0, 1);
                }
            });
        }
        checkContent();
        window.addEventListener("scroll", checkContent);
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);

    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};
const SlideInFromTop = ({ children, duration, delay, scroll }: Props) => {
    const className = `slideInFromTop`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    const ScrollTopAndBot = scroll || "off";
    useEffect(() => {
        const textElement = document.querySelectorAll(`.slideInFromTop`);

        textElement.forEach((element) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);

            observer.observe(element);
            element.childNodes.forEach((child: any) => {
                child.style.opacity = 0;
                child.style.transform = `translateY(-50%)`;
            });
        });
        function checkContent() {
            const triggerBottom = (window.innerHeight / 5) * 4 + 150;
            textElement.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;

                function animation(
                    opacity: number,
                    transform: number,
                    duration: number
                ) {
                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.opacity = opacity;
                        child.style.transition = `transform ${
                            animationDurations * duration
                        }s ease ${delays}s, opacity ${
                            animationDurations * duration * 1.5
                        }s ease`;
                        child.style.transform = `translateY(${transform}%)`;
                    });
                }

                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }

                // Vérification si l'élément est sorti de la fenêtre
                if (elementTop > triggerBottom || elementBot < 0) {
                    // L'élément est sorti de la fenêtre vers le haut ou le bas
                    animation(0, -50, 0.7);
                } else {
                    // L'élément est dans la fenêtre
                    animation(1, 0, 1);
                }
            });
        }
        window.addEventListener("scroll", checkContent);

        checkContent();
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);

    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};
const SlideInFromBot = ({ children, duration, delay, scroll }: Props) => {
    const className = `slideInFromBot`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.slideInFromBot`);

        textElement.forEach((element) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);
            observer.observe(element);

            element.childNodes.forEach((child: any) => {
                child.style.opacity = 0;
                child.style.transform = `translateY(100%)`;
            });
        });
        function checkContent() {
            const triggerBottom = (window.innerHeight / 5) * 4 + 150;
            textElement.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;

                function animation(
                    opacity: number,
                    transform: number,
                    duration: number
                ) {
                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.transition = `transform ${
                            animationDurations * duration
                        }s ease ${delays}s, opacity ${
                            animationDurations * duration * 1.5
                        }s ease`;
                        child.style.transform = `translateY(${transform}%)`;
                        child.style.opacity = opacity;
                    });
                }
                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }
                // Vérification si l'élément est sorti de la fenêtre
                if (elementTop > triggerBottom || elementBot < 0) {
                    // L'élément est sorti de la fenêtre vers le haut ou le bas
                    animation(0, 180, 0.7);
                } else {
                    // L'élément est dans la fenêtre
                    animation(1, 0, 1);
                }
            });
        }
        window.addEventListener("scroll", checkContent);

        checkContent();
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);

    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};
const ZoomOut = ({ children, duration, delay, scroll }: Props) => {
    const className = `ZoomOut`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.${className}`);
        const triggerBottom = (window.innerHeight / 5) * 4 + 250;

        textElement.forEach((element: any) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);

            observer.observe(element);
            element.childNodes.forEach((child: any) => {
                child.style.opacity = "0";
                child.style.transform = `scale(0.5)`;
            });
        });

        function checkContent() {
            textElement.forEach((element: any) => {
                const elementTop = element.getBoundingClientRect().top;
                let elementBot = element.getBoundingClientRect().bottom;

                function animation(
                    opacity: number,
                    transformScale: number,
                    duration: number
                ) {
                    // const htmlElement = element as HTMLElement;

                    // htmlElement.style.transition = `transform ${
                    //     Number(keyAnimationDuration) * duration
                    // }s ease ${Number(keyAnimationDelay)}s, opacity ${
                    //     Number(keyAnimationDuration) * duration
                    // }s ease`;

                    // htmlElement.style.opacity = opacity.toString();

                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.transition = `transform ${
                            Number(animationDurations) * duration
                        }s ease ${Number(delays)}s, opacity ${
                            Number(animationDurations) * duration
                        }s ease`;
                        child.style.opacity = opacity.toString();

                        child.style.transform = `scale(${transformScale})`;
                    });
                }

                if (ScrollTopAndBot === "off") {
                    elementBot = 0;
                } else if (ScrollTopAndBot === "on") {
                    elementBot = element.getBoundingClientRect().bottom;
                } else {
                    elementBot = 0;
                }

                if (elementTop > triggerBottom || elementBot < 0) {
                    animation(0, 0.5, 0.1);
                } else {
                    animation(1, 1, 0.7);
                }
            });
        }

        checkContent();

        window.addEventListener("scroll", checkContent);
        return () => {
            window.removeEventListener("scroll", checkContent);
        };
    }, []);

    return (
        <div className={className} {...{ duration, delay, scroll }}>
            {children}
        </div>
    );
};

const ZoomOutPopup = ({ children, duration, delay, scroll }: Props) => {
    const className = `ZoomOutPopup`;
    const delays = delay || 0;
    const animationDurations = duration || 1;
    // const ScrollTopAndBot = scroll || "off";

    useEffect(() => {
        const textElement = document.querySelectorAll(`.${className}`);
        textElement.forEach((element) => {
            const observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        checkContent();
                    }
                });
            }, observerOptions);
            observer.observe(element);

            element.childNodes.forEach((child: any) => {
                // child.style.opacity = "0";
                child.style.transform = `translate(-50%, -50%) scale(0)`;
            });
        });

        function checkContent() {
            textElement.forEach((element) => {
                function animation(
                    opacity: number,
                    transformScale: number,
                    duration: number
                ) {
                    const htmlElement = element as HTMLElement;

                    htmlElement.style.transition = `transform ${
                        animationDurations * duration
                    }s ease ${delays}s, opacity ${
                        animationDurations * duration
                    }s ease`;

                    element.childNodes.forEach((child: any) => {
                        if (child.tagName.toLowerCase() === "span") {
                            child.style.display = "inline-block";
                        }
                        child.style.opacity = opacity.toString();
                        // child.style.transition = `transform ${
                        //     animationDurations* duration
                        // }s ease ${delays}s, opacity ${
                        //    animationDurations * duration
                        // }s ease`;
                        child.style.transition = `transform 1s ease`;
                        child.style.transform = `translate(-50%, -50%) scale(${transformScale})`;
                    });
                }
                if (!element.childNodes) {
                    animation(0, 0, 0.7);
                }
                setTimeout(() => {
                    animation(1, 1, 0.7);
                }, 0);
            });
        }

        checkContent();
    }, []);

    return (
        <div
            className={className}
            {...{ duration, delay, scroll }}
        >
            {children}
        </div>
    );
};

export {
    TextAnimationBtoT,
    // FadeIn,
    SlideInFromRight,
    SlideInFromLeft,
    SlideInFromTop,
    SlideInFromBot,
    ZoomOut,
    ZoomOutPopup,
};
