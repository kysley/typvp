const white = '#FFF'
const altWhite = '#5e6165'
const black = '#16171A'
const altBlack = '#dcddde'

const border = {
  default: '#E4E7EB',
  muted: '#EDF0F2',
  dark: {
    default: '#2b2c2d',
    active: '#3e4044',
  },
}

const background = {
  tint1: '#F9F9FB',
  tint2: '#F5F6F7',
  darkTint1: '#1e1f23',
  darkTint2: '#121416',
  darkTint3: '#090a0c',
}

const neutrals = {
  n100: '#F9F9FB',
  n200: '#E4E7EB',
  n300: '#425A70',
  n400: '#234361',
}

const teals = {
  t100: '#F1FBFC',
  t200: '#D2EEF3',
  t300: '#14B5D0',
  t400: '#007489',
}

const purples = {
  // p100: '#F8F7FC',
  // p200: '#EAE7F8',
  // p300: '#735DD0',
  // p400: '#37248F',
  p50: '#EAE6FF',
  p75: '#C0B6F2',
  p100: '#998DD9',
  p200: '#8777D9',
  p300: '#6554C0',
  p400: '#5243AA',
  p500: '#403294',
}

const blues = {
  // b100: '#F7F9FD',
  // b200: '#DDEBF7',
  // b300: '#1070CA',
  // b400: '#084B8A',
  b50: '#DEEBFF',
  b75: '#B3D4FF',
  b100: '#4C9AFF',
  b200: '#2684FF',
  b300: '#0065FF',
  b400: '#0052CC',
  b500: '#0747A6',
}

const yellows = {
  // y100: '#FEF8E7',
  // y200: '#FBE6A2',
  // y300: '#F7D154',
  // y400: '#7E6514',
  y50: '#FFFAE6',
  y75: '#FFF0B3',
  y100: '#FFE380',
  y200: '#FFC400',
  y300: '#FFAB00',
  y400: '#FF991F',
  y500: '#FF8B00',
}

const reds = {
  // r100: '#FEF6F6',
  // r200: '#FAE2E2',
  // r300: '#EC4C47',
  // r400: '#BF0E08',
  r50: '#FFEBE6',
  r75: '#FFBDAD',
  r100: '#FF8F73',
  r200: '#FF7452',
  r300: '#FF5630',
  r400: '#DE350B',
  r500: '#BF2600',
}

const greens = {
  // g100: '#F1FAF5',
  // g200: '#D4EEE2',
  // g300: '#47B881',
  // g400: '#00783E',
  g50: '#E3FCEF',
  g75: '#ABF5D1',
  g100: '#79F2C0',
  g200: '#57D9A3',
  g300: '#36B37E',
  g400: '#00875A',
  g500: '#006644',
}

const intent = {
  none: blues.b300,
  success: greens.g300,
  danger: reds.r300,
  warning: yellows.y300,
}

// const brand = {
//   blue: '#0064ff',
//   green: '#38cd83',
//   purple: '#7948ff',
//   red: '#ff5c56',
// }

export const colors = {
  white,
  black,
  border,
  background,
  intent,
  ...neutrals,
  ...teals,
  ...purples,
  ...blues,
  ...yellows,
  ...reds,
  ...greens,
  // brand,
}

export const intentMeta = {
  none: {
    text: colors.white,
    bg: colors.intent.none,
    hover: colors.p400,
  },
  success: {
    text: colors.white,
    bg: colors.intent.success,
    hover: colors.g400,
  },
  danger: {
    text: colors.white,
    bg: colors.intent.danger,
    hover: colors.r400,
  },
  warning: {
    text: colors.white,
    bg: colors.intent.warning,
    hover: colors.y400,
  },
}

export const normal = {
  none: {
    text: {
      light: colors.b500,
      dark: colors.white,
    },
    bg: {
      light: colors.b50,
      dark: colors.background.darkTint2,
    },
  },
  success: {
    text: {
      light: colors.g500,
      dark: colors.g300,
    },
    bg: {
      light: colors.g50,
      dark: colors.background.darkTint2,
    },
  },
  warning: {
    text: {
      light: colors.y500,
      dark: colors.y300,
    },
    bg: {
      light: colors.y50,
      dark: colors.background.darkTint2,
    },
  },
  danger: {
    text: {
      light: colors.r500,
      dark: colors.r300,
    },
    bg: {
      light: colors.r50,
      dark: colors.background.darkTint2,
    },
  },
}

export const primary = {
  none: {
    text: colors.white,
    bg: colors.b300,
    hover: colors.b200,
  },
  success: {
    text: colors.white,
    bg: colors.g300,
    hover: colors.g400,
  },
  warning: {
    text: colors.white,
    bg: colors.y300,
    hover: colors.y400,
  },
  danger: {
    text: colors.white,
    bg: colors.r300,
    hover: colors.r400,
  },
}

export const link = {
  none: {
    text: {
      light: colors.b300,
      dark: altBlack,
    },
    hover: 'transparent',
    bg: 'transparent',
  },
  success: {
    text: {
      light: colors.g300,
      dark: colors.g300,
    },
    hover: 'transparent',
    bg: 'transparent',
  },
  warning: {
    text: {
      light: colors.y500,
      dark: colors.y300,
    },
    hover: 'transparent',
    bg: 'transparent',
  },
  danger: {
    text: {
      light: colors.r300,
      dark: colors.r300,
    },
    hover: 'transparent',
    bg: 'transparent',
  },
}

export const secondary = {
  none: {
    text: {
      light: colors.b300,
      dark: colors.white,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.b300,
      dark: colors.border.dark.active,
    },
  },
  success: {
    text: {
      light: colors.g400,
      dark: colors.g300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.g400,
      dark: colors.g300,
    },
  },
  warning: {
    text: {
      light: colors.y500,
      dark: colors.y300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.y500,
      dark: colors.y300,
    },
  },
  danger: {
    text: {
      light: colors.r400,
      dark: colors.r300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.r400,
      dark: colors.r300,
    },
  },
}

const wordVariants = {
  // match: '#64aa84',    old
  // incorrect: '#cb466a',old
  // current: '#5646b2',  old
  // match: brand.green,
  // incorrect: brand.red,
  // current: brand.purple,
  match: colors.g300,
  incorrect: colors.r300,
  current: colors.p300,
}

interface Dic {
  [key: string]: any
}

export const bundle: Dic = {
  intent: intentMeta,
  primary,
  default: normal,
  link,
  secondary,
}

export const dark = {
  name: 'dark',
  backgrounds: {
    background: background.darkTint1,
    accent: background.darkTint2,
    input: background.darkTint1,
  },
  colors: {
    text: colors.white,
    accentText: altBlack,
    current: wordVariants.current,
    incorrect: wordVariants.incorrect,
    match: wordVariants.match,
    primary: colors.b300,
  },
  border: {
    default: border.dark.default,
    active: border.dark.active,
  },
}

export const light = {
  name: 'light',
  backgrounds: {
    background: white,
    accent: background.tint2,
  },
  colors: {
    text: colors.black,
    accentText: altWhite,
    current: wordVariants.current,
    incorrect: wordVariants.incorrect,
    match: wordVariants.match,
    primary: colors.b300,
  },
  border: {
    default: border.default,
    active: border.muted,
  },
}
