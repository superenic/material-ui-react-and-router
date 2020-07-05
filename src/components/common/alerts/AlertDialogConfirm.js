import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const AlertDialogConfirm = ({
  title,
  descriptionElement,
  confirm,
  decline,
  open,
  onClose,
}) => {
  const [openDialog, setOpenDialog] = React.useState(open);
  const handleConfirm = () => {
    setOpenDialog(false);

    if (confirm) confirm();

    onClose();
  };
  const handleDecline = (event) => {
    if (decline) decline();

    setOpenDialog(false);
    onClose();
  };

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {descriptionElement}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {decline ? (
            <Button onClick={handleDecline} color='primary'>
              Disagree
            </Button>
          ) : (
            <></>
          )}
          <Button onClick={handleConfirm} color='primary' autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialogConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  descriptionElement: PropTypes.element.isRequired,
  confirm: PropTypes.func,
  decline: PropTypes.func,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertDialogConfirm;
