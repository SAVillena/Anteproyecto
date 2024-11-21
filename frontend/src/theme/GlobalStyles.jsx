import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = ({ theme }) => (
    <MuiGlobalStyles
        styles={{
            '*': {
                scrollbarWidth: 'thin',
                scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
            },
            '*::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '4px',
            },
            '*::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.default,
                borderRadius: '4px',
            },
        }}
    />
);

export default GlobalStyles;
