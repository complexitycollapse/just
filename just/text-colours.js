export const red = (str) => "\x1b[31m" + str + "\x1b[0m";
export const redBack = (str) => "\x1b[90;41m" + str + "\x1b[0m";
export const green = (str) => "\x1b[32m" + str + "\x1b[0m";
export const greenBack = (str) => "\x1b[90;42m" + str + "\x1b[0m";
export const yellow = (str) => "\x1b[93m" + str + "\x1b[0m";
export const yellowBack = (str) => "\x1b[90;103m" + str + "\x1b[0m";

export const restore = "\x1b[0m";
export const turnRed = "\x1b[31m";
export const turnGreen = "\x1b[32m";
