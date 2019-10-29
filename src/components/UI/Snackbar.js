import React, {useEffect} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar('Portfolio Updated!', { variant: 'success' });
    }, [])

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default function Snackbar(props) {
  return (
        <SnackbarProvider maxSnack={3}>
        <MyApp />
        </SnackbarProvider>
  );
}