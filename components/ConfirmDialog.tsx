import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ConfirmType } from '@/types/confirm-type';

const ConfirmDialog = ({open, setOpen, message, callback}: ConfirmType) => {
    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="z-20 bg-gray-600 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="m-0 text-[17px] font-medium">
                        Confirmation
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
                        {message}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[5px]">
                        <AlertDialog.Cancel asChild>
                            <button className="w-[100px] border border-gray-400 text-gray-700 hover:bg-gray-100 focus:shadow-gray-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={() => callback()} className="w-[100px] border border-red-400 text-red-600 hover:bg-red-100 focus:shadow-red-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Ok
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default ConfirmDialog