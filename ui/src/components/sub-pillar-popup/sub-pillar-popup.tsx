import { Dialog, DialogTitle } from "@material-ui/core";

interface SubPillarProps {
    open: boolean;
}

function SubPillarPopup(props: SubPillarProps) {

    return (
        <Dialog open={props.open}>
            <DialogTitle>Checking this mierda!</DialogTitle>
        </Dialog>
    )
}

export default SubPillarPopup;