import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Modal = ({ children, onClose, title }) =>
    <div>
        <div>
            {/* content */}
            <div>
                {/* header */}
                <div>
                    <h3>{title}</h3>
                    <button onClick={onClose}>
                        <IconButton>
                            <Close />
                        </IconButton>
                    </button>
                </div>
                {/* body */}
                <div>
                    {children}
                </div>
                {/* footer */}
                <div>
                    <button type="button" onClick={onClose}>Close</button>
                    <button type="button" onClick={onClose}>Save Changes</button>
                </div>
            </div>
        </div>
    </div>

export default Modal
