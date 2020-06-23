import AuSelect from './select'
import AuSelectButton from './select-button'
import AuSelectMenu from './select-menu'
import AuSelectMenuItem, { AuSelectMenuItemLink } from './select-menu-item'

AuSelect.Button = AuSelectButton
AuSelect.Menu = AuSelectMenu
AuSelect.MenuItem = AuSelectMenuItem

export {
  AuSelect as default,
  AuSelect,
  AuSelectButton,
  AuSelectMenu,
  AuSelectMenuItem,
  AuSelectMenuItemLink
}
