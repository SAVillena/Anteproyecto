import React, { useState } from 'react';
import { Alert, AlertTitle, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

function Alerta({ alertas = [] }) { // Asigna un valor por defecto
    const [openDialog, setOpenDialog] = useState(false);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);

    const handleClickAlert = (alerta) => {
        setAlertaSeleccionada(alerta);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAlertaSeleccionada(null);
    };

    return (
        <>
            {alertas.map((alerta, index) => (
                <Alert
                    key={index}
                    variant="outlined"
                    severity={alerta.alert_type === "Precaución" ? "warning" : "error"}
                    onClick={() => handleClickAlert(alerta)}
                    sx={{ cursor: 'pointer', marginBottom: 1 }}
                >
                    <AlertTitle>{alerta.alert_type}</AlertTitle>
                    Valor: {alerta.alert_value} - Timestamp: {new Date(alerta.timestamp).toLocaleString()}
                </Alert>
            ))}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Detalles de la Alerta</DialogTitle>
                <DialogContent>
                    {alertaSeleccionada && (
                        <>
                            <Typography>Tipo: {alertaSeleccionada.alert_type}</Typography>
                            <Typography>Valor: {alertaSeleccionada.alert_value}</Typography>
                            <Typography>Fecha y Hora: {new Date(alertaSeleccionada.timestamp).toLocaleString()}</Typography>
                            <Typography>Serial: {alertaSeleccionada.serialId}</Typography>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Alerta;
