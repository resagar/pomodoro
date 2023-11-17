import {HTMLProps} from "react";
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface Props extends HTMLProps<HTMLElement>{
    label: string;
}
const Field = ({ label, children, className }: Props ) => (
    <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            {children}
        </FormControl>
        <FormMessage />
    </FormItem>
)

export default Field;