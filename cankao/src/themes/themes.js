const COLORS = {
  primary: "rgba(197, 205, 222, 1)",
  secondary: "rgba(130, 144, 174, 1)",
  tertiary: "rgba(153,153,153,1)",
  dark: " rgba(25, 29, 40, 1)",
  gray: "rgba(46, 50, 66, 1)",
  background: "rgba(35, 40, 56, 1)",
  subtitle: "rgb(153, 153, 153)",
  white: "#F3F4F8",
  lightWhite: "rgb(204,204,204)",
  button1: "rgba(90, 145, 204, 1)",
  button2: "rgba(90, 172, 204, 1)",
  buttonText: "rgba(240, 245, 255, 1)",
  malInfo: "rgba(21, 24, 33, 1)",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const WEIGHT = {
  middle: "500",
  Large: "700",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, WEIGHT, SHADOWS };
