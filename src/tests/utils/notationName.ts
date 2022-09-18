export const notationName = (i: number) => {
    if (i === 0) {
        return 'function notation';
    } else if (i === 1) {
        return 'object notation';
    }

    return 'unknown notation';
};
