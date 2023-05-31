import { Dispatch, SetStateAction } from "react"

export type ConfirmType = {
    showConfirm: boolean,
    setShowConfirm: Dispatch<SetStateAction<boolean>>,
    message: string,
    callback: () => void
}