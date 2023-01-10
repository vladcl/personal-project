import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import {styled} from '@mui/material/styles';


/**
 * Supports all Material UI Fab props:
 *  - https://mui.com/pt/material-ui/react-floating-action-button/
 *
 * @param {Object} props
 */
export default function AddFabButton(props: Object) {
    return (
        <FabButton {...props} type="button" color="primary">
            <Icon>add</Icon>
        </FabButton>
    );
}

const FabButton = styled(Fab)(({theme}) => ({
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(3),
}));
