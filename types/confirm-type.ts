import { Dispatch, SetStateAction } from "react"

export type ConfirmType = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    message: string,
    callback: () => void
}