"use client"
import React, {Fragment, HTMLProps, useEffect} from "react";
import {useTimer} from "react-timer-hook";
import {useToast} from "@/components/ui/use-toast";

interface Props extends HTMLProps<HTMLElement>{
    minute: number,
    second: number
}
const Clock = ({minute, second}: Props) => {
const { toast } =  useToast()


    useEffect(() => {
        if(minute === 0 && second === 0 ){
            toast({
                title: "Timer completed",
            })
        }
    }, [minute, second, toast]);

    return (
        <Fragment>
            <span className="text-7xl">{minute <= 9 ? `0${minute}` : minute}</span>
            <span className="text-7xl">:</span>
            <span className="text-7xl">{second <= 9 ? `0${second}` : second}</span>
        </Fragment>
    )
}

export default Clock