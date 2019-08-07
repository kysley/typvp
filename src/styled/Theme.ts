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
  p100: '#F8F7FC',
  p200: '#EAE7F8',
  p300: '#735DD0',
  p400: '#37248F',
}

const blues = {
  b100: '#F7F9FD',
  b200: '#DDEBF7',
  b300: '#1070CA',
  b400: '#084B8A',
}

const yellows = {
  y100: '#FEF8E7',
  y200: '#FBE6A2',
  y300: '#F7D154',
  y400: '#7E6514',
}

const reds = {
  r100: '#FEF6F6',
  r200: '#FAE2E2',
  r300: '#EC4C47',
  r400: '#BF0E08',
}

const greens = {
  g100: '#F1FAF5',
  g200: '#D4EEE2',
  g300: '#47B881',
  g400: '#00783E',
}

const oranges = {
  o100: '#FDF8F3',
  o200: '#FAE3CD',
  o300: '#D9822B',
  o400: '#95591E',
}

const intent = {
  none: blues.b300,
  success: greens.g300,
  danger: reds.r300,
  warning: oranges.o300,
}

const brand = {
  blue: '#0064ff',
  green: '#38cd83',
  purple: '#7948ff',
  red: '#ff5c56',
}

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
  ...oranges,
  brand,
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
      light: colors.brand.blue,
      dark: colors.white,
    },
    bg: {
      light: colors.b200,
      dark: colors.background.darkTint2,
    },
  },
  success: {
    text: {
      light: colors.g400,
      dark: colors.g300,
    },
    bg: {
      light: colors.g200,
      dark: colors.background.darkTint2,
    },
  },
  warning: {
    text: {
      light: colors.o400,
      dark: colors.o300,
    },
    bg: {
      light: colors.o200,
      dark: colors.background.darkTint2,
    },
  },
  danger: {
    text: {
      light: colors.r300,
      dark: colors.r300,
    },
    bg: {
      light: colors.r200,
      dark: colors.background.darkTint2,
    },
  },
}

export const primary = {
  none: {
    text: colors.white,
    bg: colors.brand.blue,
    hover: colors.b200,
  },
  success: {
    text: colors.white,
    bg: colors.g300,
    hover: colors.g400,
  },
  warning: {
    text: colors.white,
    bg: colors.o300,
    hover: colors.o400,
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
      light: colors.brand.blue,
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
      light: colors.o300,
      dark: colors.o300,
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
      dark: colors.white,
      light: colors.brand.blue,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.brand.blue,
      dark: colors.border.dark.active,
    },
  },
  success: {
    text: {
      dark: colors.g300,
      light: colors.g300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.g400,
      dark: colors.g400,
    },
  },
  warning: {
    text: {
      dark: colors.o300,
      light: colors.o300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.o300,
      dark: colors.o300,
    },
  },
  danger: {
    text: {
      dark: colors.r300,
      light: colors.r300,
    },
    hover: 'transparent',
    bg: 'transparent',
    border: {
      light: colors.r400,
      dark: colors.r400,
    },
  },
}

const wordVariants = {
  // match: '#64aa84',    old
  // incorrect: '#cb466a',old
  // current: '#5646b2',  old
  match: brand.green,
  incorrect: brand.red,
  current: brand.purple,
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
    primary: brand.blue,
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
    primary: brand.blue,
  },
  border: {
    default: border.default,
    active: border.muted,
  },
}
