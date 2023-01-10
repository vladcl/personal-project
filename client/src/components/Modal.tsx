import {forwardRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';

export function Modal(props: any) {
    const {children, open, onClose, ...rest} = props;

    return (
        <Dialog
            {...rest}
            keepMounted
            fullWidth
            scroll="paper"
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
        >
            {children}
        </Dialog>
    );
};

export function ModalHeader(props: any) {
    const {children, onCloseButton, ...rest} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...rest}>
            {children}
            {onCloseButton && (
                <CloseButton onClick={onCloseButton}>
                    <Close />
                </CloseButton>
            )}
        </DialogTitle>
    );
};

export function ModalContent({children, ...props}: {children: JSX.Element | JSX.Element[]}) {
    return (
        <DialogContent {...props} dividers>
            {children}
        </DialogContent>
    );
};

export function ModalActions({children, ...props}: {children: JSX.Element[]}) {
    return (
        <DialogActions {...props}>
            {children}
        </DialogActions>
    );
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CloseButton = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    right: 16,
    top: 12,
    color: theme.palette.grey[500],
}));
