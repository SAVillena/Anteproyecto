import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

function Alerta() {
    return (
        <Alert variant="outlined" severity="warning">
            <AlertTitle>Precaución</AlertTitle>
            Precaución en el sector, posible aumento de polvo, se sugiere preparar camiones de regadio
        </Alert>
    );
}

export default Alerta;