import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function Alerta() {
    return (
        <>
        <Alert variant="outlined" severity="warning">
            <AlertTitle>Precaución</AlertTitle>
            Precaución en el sector, posible aumento de polvo, se sugiere preparar camiones de regadio
        </Alert>
        <Alert variant="outlined" severity="error">
            <AlertTitle>Alerta</AlertTitle>
            Alerta en el sector, regar inmediatamente
        </Alert>
        </>
    );
}

export default Alerta;