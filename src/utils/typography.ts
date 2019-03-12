import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

oceanBeachTheme.overrideThemeStyles = () => ({
  a: {
    color: '#5f8ddc',
    textShadow: 'none',
    backgroundImage:
      'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #5f8ddc 1px, #5f8ddc 2px, rgba(0, 0, 0, 0) 2px)',
  },
  'a:visited': { color: '#5f8ddc' },
  blockquote: {
    borderLeft: '0.5925rem solid #5f8ddc',
  },
  code: {
    fontSize: '0.9em',
  },
  pre: {
    fontSize: '1em',
  },
});

const typography = new Typography(oceanBeachTheme);

export default typography;
