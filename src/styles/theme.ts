const theme = {
  colors: {
    background: '#fff',
    grey: '#f2f2f2',
    text: '#000',
    text_inner: '#fff',
    primary: '#0085FF',
    error: '#cc0000',
    links: {
      purple: { background: '#EFEAFB', font: '#2D01FF' }
    }
  },
  fonts: {
    light: '300 1rem Open Sans, sans-serif',
    normal: '400 1rem Open Sans, sans-serif',
    strong: '600 1rem Open Sans, sans-serif',
    logo: '400 3.5rem Pacifico, cursive;'
  },
  gap_column: (value) => `> * + * { margin-top: ${value}rem }`,
  gap_row: (value) => `> * + * { margin-left: ${value}rem }`
};

export default theme;
