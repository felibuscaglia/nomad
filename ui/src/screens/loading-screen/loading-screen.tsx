import { CircularProgress } from "@material-ui/core";

function LoadingScreen() {
    return (
        <div id='spinner-container'>
            <CircularProgress id='spinner' size={80} thickness={5} />
        </div>
    )
}

export default LoadingScreen;