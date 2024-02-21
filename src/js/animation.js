export const anim = variants => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: "exit",
      variants
    };
};

export const fadeOpacity = {
    initial: {
        //x: "-100%",
        opacity: 0,
    },
    enter: {
        //x: "0%",
        opacity: 1,
        transition: {
            duration: 0.2,
            // ease: [0.73, 0, 0.23, 1],
        },
    },
    exit: {
        opacity: 0,
        //x: "100%",
        transition: {
            duration: 0.2,
            // ease: [0.73, 0, 0.23, 1],
        },
    },
};