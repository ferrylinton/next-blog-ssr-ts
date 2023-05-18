import { Dispatch, SetStateAction } from "react"

 type ToastType = {
    message: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}