const theme = {
  /**
   * Colors
   */
  colorBackground: '#eaeef0',
  colorBaseGreen: '#f5f9d7',
  colorBlack: '#000',
  colorOrange: '#e79d2a',
  colorDarkerOrange: '#cd8058',
  colorErrorRed: '#d83c3c',
  colorHighlightOrange: '#c76837',
  colorHoverDarkerGray: '#869297',
  colorInactiveGray: '#ccd6d9',
  colorInsightGreen: '#5f9535',
  colorLightGray: '#f0f4f5',
  colorLinesGray: '#dfe4e6',
  colorPrimaryBlue: '#35738c',
  colorSecondaryBlue: '#679ab1',
  colorSelectionBlue: '#e4f6fd',
  colorSelectionYellow: '#f5d8aa',
  colorTextGray: '#495357',
  colorWhite: '#fff',
  colorYellow: '#eeba69',
  colorNavActive: '#c76837',
  colorLink: '#267c9f',

  /**
   * Data Viz Colors
   */
  colorViz0: '#354772',
  colorViz1: '#E47105',
  colorViz2: '#49A5A7',
  colorViz3: '#6D1D48',
  colorViz4: '#3A6B1E',
  colorViz5: '#725035',
  colorViz6: '#AE421A',
  colorViz7: '#6d9b29',
  colorViz8: '#B77B08',
  colorViz9: '#EBAA1D',

  // No data
  colorVizNoData00: '#D6D9DF',
  colorVizNoData01: '#EDEEEF',

  /**
   * Fonts
   */
  fontFamilyBase: 'Roboto',
  fontFamilyCondensed: '"Roboto Condensed"',
  fontFamilyVoice: 'Roboto',
  fontWeightHeavy: 'bold',
  fontWeightMedium: 500,
  fontWeightNormal: 'normal',

  /**
   * Glyphs
   */
  glyphCheck: '"\\2713"',
  glyphTarget: '"\\2609"',
  glyphHorizontalBar: '"\\2013"',

  /**
   * Box shadows by depth
   *
   * For absolutely positioned elements, shadows should mirror z-index
   * assignment.
   */
  boxShadowShort: '0 3px 15px 0 rgba(0,0,0,0.08)',
  boxShadowMedium: '0 5px 20px 0 rgba(0,0,0,0.18)',
  boxShadowTall: '0 7px 25px 0 rgba(0,0,0,0.24)',

  /**
   * Global z-index lookup
   *
   * To enforce consistent indexes between absolutely positioned components
   */
  zIndexLoadMask: 100,
  zIndexDropdownMenu: 1 * 1000,
  zIndexDropdownMenuBackdrop: 1 * 1000 - 1,
  zIndexModal: 5 * 1000,
  zIndexModalBackdrop: 5 * 1000 - 1,
  zIndexTooltip: 7 * 1000,
  zIndexToast: 15 * 1000,

  /**
   * Misc
   */
  borderRadius: '2px'
}

/**
 * Semantic colors
 */
theme.colorMuted = theme.colorInactiveGray
theme.colorInfo = theme.colorSecondaryBlue
theme.colorPrimary = theme.colorPrimaryBlue
theme.colorSuccess = theme.colorInsightGreen
theme.colorWarning = theme.colorOrange
theme.colorDanger = theme.colorErrorRed

theme.colorToDo = theme.colorPrimary
theme.colorInProgress = theme.colorWarning
theme.colorDone = theme.colorSuccess

theme.colorLink = theme.colorSecondaryBlue

/**
 * Utilitarian colors
 */
theme.colorText = theme.colorTextGray
theme.colorLines = theme.colorLinesGray

/**
 * Viz colors by series count
 */
theme.vizColors = [
  theme.colorViz0,
  theme.colorViz1,
  theme.colorViz2,
  theme.colorViz3,
  theme.colorViz4,
  theme.colorViz5,
  theme.colorViz6,
  theme.colorViz7,
  theme.colorViz8,
  theme.colorViz9
]

/**
 * A helper for grabbing a viz color by series index
 */
theme.getVizColor = function getVizColor (ix) {
  return theme.vizColors[ix % theme.vizColors.length]
}

/**
 * Expose our theme in a format that can be directly consumed by
 * `postcss-custom-properties`
 */
const dasherize = function (str) {
  return str.replace(/[A-Z]|_?\d+/g, function (match) {
    return '-' + match.toLowerCase().replace(/^_/, '')
  })
}

const formatForCustomProperties = function (hash) {
  return Object.keys(hash).reduce(function (customProps, hashKey) {
    customProps['--' + dasherize(hashKey)] = hash[hashKey]
    return customProps
  }, {})
}

theme.asCustomPropertyVariables = function () {
  return formatForCustomProperties(theme)
}

module.exports = theme
