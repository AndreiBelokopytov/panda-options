import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Manrope', sans-serif",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
      },
      variants: {
        default: {
          backgroundColor: "#4B71FF",
          color: "white",
        },
      },
      sizes: {
        md: {
          padding: "16px 24px",
          lineHeight: "24px",
          fontSize: "14px",
        },
      },
      defaultProps: {
        variant: "default",
        size: "md",
      },
    },
  },
});
