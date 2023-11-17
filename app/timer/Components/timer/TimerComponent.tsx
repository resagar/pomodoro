"use client"
import {Button} from "@/components/ui/button";
import { PlayIcon, PauseIcon } from "lucide-react"
import React, {Fragment, HTMLProps, useState} from "react";
import Clock from "@/app/timer/Components/timer/Clock";
import { useTimer } from 'react-timer-hook'
import TimerMenu from "@/app/timer/Components/timer/TimerMenu";
import {setDate} from "@/lib/utils";
import {DialogTimer} from "@/app/timer/Components/timer/DialogTimer";

interface Props extends HTMLProps<HTMLElement>{
    timer: { work:number, short: number, large: number }
}
export default function TimerComponent({ timer }:Props) {
    const [openDialog, setOpenDialog] = useState(false)
    const time = setDate(timer.work)
    const {minutes, seconds, restart, pause, resume, isRunning} = useTimer({expiryTimestamp: time, autoStart: false});

    const playAndPause = () => {
        if(isRunning) {
            pause()
            return
        }
        setOpenDialog(true)
        return;
    }
    const changeTimer = (minutes: number) => {
        const time = setDate(minutes)
        restart(time, false)
    };

    const closeDialog = () => {
        setOpenDialog(false)
        resume()
    }

    return (
        <Fragment>
            <TimerMenu changeTimer={changeTimer} timerOptions={ timer }/>
            <Clock minute={minutes} second={seconds}/>
            <DialogTimer open={ openDialog } closeDialog={closeDialog} />
            <div className="flex justify-center items-center pt-8">
                <Button onClick={playAndPause} className="rounded-full h-16 w-16">
                    {isRunning ? <PauseIcon size={50}/> : <PlayIcon size={50}/>}
                </Button>
            </div>
        </Fragment>
    );
};