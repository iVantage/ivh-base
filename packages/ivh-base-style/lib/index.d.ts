export = Theme

declare namespace Theme {
  /**
   * Colors
   */
  export const colorBackground: string
  export const colorBaseGreen: string
  export const colorBlack: string
  export const colorOrange: string
  export const colorDarkerOrange: string
  export const colorErrorRed: string
  export const colorHighlightOrange: string
  export const colorHoverDarkerGray: string
  export const colorInactiveGray: string
  export const colorInsightGreen: string
  export const colorLightGray: string
  export const colorLinesGray: string
  export const colorPrimaryBlue: string
  export const colorSecondaryBlue: string
  export const colorSelectionBlue: string
  export const colorSelectionYellow: string
  export const colorTextGray: string
  export const colorWhite: string
  export const colorYellow: string
  export const colorNavActive: string
  export const colorLink: string

  /**
   * Data Viz Colors
   */
  export const colorViz0: string
  export const colorViz1: string
  export const colorViz2: string
  export const colorViz3: string
  export const colorViz4: string
  export const colorViz5: string
  export const colorViz6: string
  export const colorViz7: string
  export const colorViz8: string
  export const colorViz9: string

  // No data
  export const colorVizNoData00: string
  export const colorVizNoData01: string

  /**
   * Fonts
   */
  export const fontFamilyBase: string
  export const fontFamilyCondensed: string
  export const fontFamilyVoice: string
  export const fontWeightHeavy: string
  export const fontWeightMedium: number
  export const fontWeightNormal: string

  /**
   * Glyphs
   */
  export const glyphCheck: string
  export const glyphTarget: string
  export const glyphHorizontalBar: string

  /**
   * Box shadows by depth
   */
  export const boxShadowShort: string
  export const boxShadowMedium: string
  export const boxShadowTall: string

  /**
   * Global z-index lookup
   */
  export const zIndexLoadMask: number
  export const zIndexDropdownMenu: number
  export const zIndexDropdownMenuBackdrop: number
  export const zIndexModal: number
  export const zIndexModalBackdrop: number
  export const zIndexTooltip: number
  export const zIndexToast: number

  /**
   * Misc
   */
  export const borderRadius: string

  /**
   * Semantic Colors
   */
  export const colorMuted: string
  export const colorInfo: string
  export const colorPrimary: string
  export const colorSuccess: string
  export const colorWarning: string
  export const colorDanger: string

  export const colorToDo: string
  export const colorInProgress: string
  export const colorDone: string

  /**
   * Utilitarian colors
   */
  export const colorText: string
  export const colorLines: string

  /**
   * Viz colors
   */
  export const vizColors: string[]

  /**
   * A helper for grabbing a viz color by series index
   */
  declare function getVizColor (ix: number) : string

  declare function asCustomPropertyVariables () : object
}