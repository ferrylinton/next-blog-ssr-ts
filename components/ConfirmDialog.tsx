import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ConfirmType } from '@/types/confirm-type';

const ConfirmDialog = ({open, setOpen, message, callback}: ConfirmType) => {
    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="z-20 bg-gray-600 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none border-2 border-slate-600">
                    <AlertDialog.Title className="m-0 text-[17px] font-medium">
                        Confirmation
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
                        {message}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[5px]">
                        <AlertDialog.Cancel asChild>
                            <button className="w-[100px] btn btn-default">Cancel</button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={() => callback()} className="w-[100px] btn btn-primary">Ok</button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default ConfirmDialog