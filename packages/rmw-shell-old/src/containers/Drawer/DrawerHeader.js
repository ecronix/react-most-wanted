import PropTypes from 'prop-types'
import drawerActions from '../../store/drawer/actions'
import { DrawerHeader } from '../../components/Drawer'
import { connect } from 'react-redux'
import { setDialogIsOpen } from '../../store/dialogs/actions'

DrawerHeader.propTypes = {
  auth: PropTypes.object
}

const mapStateToProps = state => {
  const { auth, locale, dialogs, drawer } = state

  return {
    auth,
    locale,
    dialogs,
    drawer
  }
}

export default connect(
  mapStateToProps,
  { setDialogIsOpen, ...drawerActions }
)(DrawerHeader)
