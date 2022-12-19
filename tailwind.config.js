const config = require('tailwindcss/defaultConfig');
const colors = require('tailwindcss/colors');

const baseColors = {
  blue: ['#E8F3FF', '#BEDAFF', '#94BFFF', '#6AA1FF', '#4080FF', '#165DFF', '#0E42D2', '#072CA6', '#031A79', '#000D4D'],
  orange: ['#FFF7E8', '#FFE4BA', '#FFCF8B', '#FFB65D', '#FF9A2E', '#FF7D00', '#D25F00', '#A64500', '#792E00', '#4D1B00'],
  green: ['#E8FFEA', '#AFF0B5', '#7BE188', '#4CD263', '#23C343', '#00B42A', '#009A29', '#008026', '#006622', '#004D1C'],
  red: ['#FFECE8', '#FDCDC5', '#FBACA3', '#F98981', '#F76560', '#F53F3F', '#CB272D', '#A1151E', '#770813', '#4D000A'],
  gray: ['#F7F8FA', '#F2F3F5', '#E5E6EB', '#C9CDD4', '#A9AEB8', '#86909C', '#6B7785', '#4E5969', '#272E3B', '#1D2129'],
};

function createPrimaryColors(type, colors) {
  if (!colors) return {};
  return {
    [`b-${type}`]: {
      DEFAULT: colors[5],
      hover: colors[4],
      active: colors[6],
      disabled: colors[2],
      background: colors[0],
    }
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}",
    './docs/**/*.{md,vue,js}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,

      ...Object.entries(baseColors).reduce((conf, [name, list]) => {
        conf[name] = list.reduce((map, color, index) => {
          map[(index + 1) * 100] = color;
          return map;
        }, {});
        return conf;
      }, {}),

      ...createPrimaryColors('primary', baseColors.blue),
      ...createPrimaryColors('success', baseColors.green),
      ...createPrimaryColors('warn', baseColors.orange),
      ...createPrimaryColors('danger', baseColors.red),
      ...createPrimaryColors('link', baseColors.blue),

    },
    // 继承（原有的不会删除）
    extend: {
      textColor: {
        primary: baseColors.gray[9],
        regular: baseColors.gray[7],
        secondary: baseColors.gray[5],
        disabled: baseColors.gray[3],
      },
    },
  },
  plugins: [
    '@tailwindcss/aspect-ratio',
    require('@tailwindcss/line-clamp'),
  ],
}
