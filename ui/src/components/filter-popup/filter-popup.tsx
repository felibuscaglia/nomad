import { Dialog } from "@material-ui/core";

interface FilterPopupProps {
    open: boolean;
    onClose: () => void
}

function FilterPopup(props: FilterPopupProps) {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <span>This works!</span>
        </Dialog>
    )
}

export default FilterPopup;