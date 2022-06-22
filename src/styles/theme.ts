const theme = {
  colors: {
    background: '#fff',
    grey: '#f2f2f2',
    text: '#000',
    text_inner: '#fff',
    primary: '#0085FF',
    error: '#cc0000'
  },
  fonts: {
    light: '300 1rem Open Sans, sans-serif',
    normal: '400 1rem Open Sans, sans-serif',
    strong: '600 1rem Open Sans, sans-serif',
    logo: '400 3.5rem Pacifico, cursive;'
  },
  flex_gap: (value) => `* + * { margin-top: ${value}rem }`
};

export default theme;
