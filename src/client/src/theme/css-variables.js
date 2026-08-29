import colors from './colors.json';
import semanticTokens from './semantic-tokens.json';

const drColors = Object.values(colors).reduce((acc, value) => ({ ...acc, ...value }), {});

const paletteVars = Object.entries(drColors).reduce((acc, [colorName, colorValue]) => {
  acc[`--${colorName}`] = colorValue;
  return acc;
}, {});

const lightVars = {};
const darkVars = {};
for (const group of semanticTokens.groups) {
  for (const token of group.tokens) {
    lightVars[`--${token.name}`] = `var(--${token.light})`;
    darkVars[`--${token.name}`] = `var(--${token.dark})`;
  }
}

function cssVariablesPlugin({ addBase }) {
  addBase({
    ':root': { ...paletteVars, ...lightVars },
    '.dark': darkVars,
  });
}

export { drColors };
export default cssVariablesPlugin;
