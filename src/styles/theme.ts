import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
    blue: Palette["primary"];
    steelBlue: Palette["primary"];
    brown: Palette["primary"];
    black: Palette["primary"];
    white: Palette["primary"];
  }

  interface PaletteOptions {
    green?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    steelBlue?: PaletteOptions["primary"];
    brown?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tlg: React.CSSProperties;
    tmd: React.CSSProperties;
    trg: React.CSSProperties;
    tsm: React.CSSProperties;
    txs: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    tlg?: React.CSSProperties;
    tmd?: React.CSSProperties;
    trg?: React.CSSProperties;
    tsm?: React.CSSProperties;
    txs?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tlg: true;
    tmd: true;
    trg: true;
    tsm: true;
    txs: true;
  }
}

const fontFamily = [
  "Noto Sans TC",
  "PingFang TC",
  "Microsoft JhengHei",
  "Arial",
  "sans-serif",
].join(",");

let theme = createTheme({
  palette: {
    green: {
      main: "#84cb98",
      dark: "#639872",
      light: "#f3faf5",
    },
    blue: {
      main: "#8894d8",
      dark: "#666fa2",
      light: "#f3f4fb",
    },
    steelBlue: {
      main: "#262e49",
      dark: "#1d2337",
      light: "#e9eaed",
    },
    brown: {
      main: "#dfa175",
      dark: "#a77958",
      light: "#fcf6f1",
    },
    black: {
      main: "#000000",
      dark: "#000000",
      light: "#e6e6e6",
      contrastText: "#f5f5f5",
    },
    white: {
      main: "#ffffff",
      dark: "#bfbfbf",
      light: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *,
      *::after,
      *::before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        scroll-behavior: smooth;
      }
      `,
    },
  },
});

theme = createTheme({
  ...theme,
  typography: {
    allVariants: {
      fontFamily: fontFamily,
      lineHeight: 1.2,
      fontWeight: 400,
    },
    h1: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 40,
        fontWeight: 600,
      },
      fontSize: 56,
    },
    h2: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 32,
        fontWeight: 600,
      },
      fontSize: 48,
    },
    h3: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 24,
        fontWeight: 600,
      },
      fontSize: 40,
    },
    h4: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        fontWeight: 600,
      },
      fontSize: 32,
    },
    h5: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
        fontWeight: 600,
      },
      fontSize: 24,
    },
    h6: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 20,
    },
    tlg: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 20,
    },
    tmd: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 18,
    },
    trg: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 16,
    },
    tsm: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 14,
    },
    txs: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      fontSize: 12,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          tlg: "p",
          tmd: "p",
          trg: "p",
          tsm: "p",
          txs: "p",
        },
      },
    },
  },
});

export { theme };
