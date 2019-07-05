const white = '#FFF'
const black = '#16171A'

const border = {
  default: '#E4E7EB',
  muted: '#EDF0F2',
}

const background = {
  tint1: '#F9F9FB',
  tint2: '#F5F6F7',
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
    text: colors.p300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  success: {
    text: colors.g300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  warning: {
    text: colors.o300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  danger: {
    text: colors.r300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
}

export const primary = {
  none: {
    text: colors.white,
    bg: colors.p300,
    hover: colors.p400,
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

export const minimal = {
  none: {
    text: colors.n400,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  success: {
    text: colors.g300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  warning: {
    text: colors.o300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  danger: {
    text: colors.r300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
}

export const link = {
  none: {
    text: colors.p300,
    hover: 'transparent',
    bg: 'transparent',
  },
  success: {
    text: colors.g300,
    hover: 'transparent',
    bg: 'transparent',
  },
  warning: {
    text: colors.o300,
    hover: 'transparent',
    bg: 'transparent',
  },
  danger: {
    text: colors.r300,
    hover: 'transparent',
    bg: 'transparent',
  },
}

interface Dic {
  [key: string]: any
}

export const bundle: Dic = {
  intent: intentMeta,
  primary,
  minimal,
  default: normal,
  link,
}
