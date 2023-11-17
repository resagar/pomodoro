import {Fragment, HTMLProps} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";

interface Props extends HTMLProps<HTMLElement> {
    open: boolean
    closeDialog: () => void
}
export const DialogTimer = ({open, closeDialog}: Props) => {
    return (
        <Fragment>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Antes de Empezar Recuerda:
                        </DialogTitle>
                    </DialogHeader>
                    <p>Tomar Agua antes de empezar a trabajar</p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={closeDialog}> close </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}