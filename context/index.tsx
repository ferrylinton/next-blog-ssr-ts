import { PropsWithChildren, createContext, useContext, useState } from 'react';
import ToastRadixUi from '@/components/ToastRadixUi';

export const AppContext = createContext<AppContextType>({
    showSuccessToast: (msg: string) => { console.log(msg) },
    showErrorToast: (msg: string) => { console.log(msg) }
})

export const AppProvider = ({ children }: PropsWithChildren) => {

    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState(true);

    const [message, setMessage] = useState('halo');

    const showSuccessToast = (message: string) => {
        setOpen(true);
        setStatus(true);
        setMessage(message);
    }

    const showErrorToast = (message: string) => {
        setOpen(true);
        setStatus(false);
        setMessage(message);
    }

    const value: AppContextType = {
        showSuccessToast,
        showErrorToast
    };

    return (
        <AppContext.Provider value={value}>
            {children}
            <ToastRadixUi open={open} setOpen={setOpen} message={message} status={status} />
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

