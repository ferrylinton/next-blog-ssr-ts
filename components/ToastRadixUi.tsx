import CheckIcon from '@/icons/CheckIcon';
import WarningIcon from '@/icons/WarningIcon';
import * as Toast from '@radix-ui/react-toast';
import { Dispatch, SetStateAction } from 'react';


type Props = {
  status: boolean,
  message: string,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ToastRadixUi = ({ status, open, setOpen, message }: Props) => {

  const icon = status ? <CheckIcon /> : <WarningIcon />

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={`border border-t-4  bg-white rounded shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut ${status ? 'border-green-500 ' : 'border-red-500 '}`}
        open={open}
        onOpenChange={setOpen}>
        <Toast.Description asChild>
          <div className='flex justify-between items-start'>
            <div className='grow text-sm'>{message}</div>
            <div className={`flex-none w-[24px] h-[24px]  ${status ? 'text-green-600 ' : 'text-red-600 '} `}>{icon}</div>
          </div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}

export default ToastRadixUi