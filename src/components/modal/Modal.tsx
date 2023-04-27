import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IModalProps {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  onDelete: (id: number) => void;
  id?: number;
}
export default function Modal({
  showModal,
  setShowModal,
  onDelete,
  id,
}: IModalProps) {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowModal(false);

    onDelete(id!);
  };

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xoá?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            {" "}
            Delete
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
