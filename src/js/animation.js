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
      opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.3,
            // ease: [0.73, 0, 0.23, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            // ease: [0.73, 0, 0.23, 1],
        },
    },
};