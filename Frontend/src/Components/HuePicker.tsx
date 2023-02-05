import React, { useRef } from 'react'
import styles from "./style.module.scss";
import { useParams } from "react-router-dom"
import Connector from '../SignalRConnector/Connector';

export const ColorPicker = () => {
    const { id } = useParams();
    const { sendCommand } = Connector;
    const saturationRef = React.useRef<any>()
    const saturationSelectorRef = useRef<any>();
    const hueRef = useRef<any>();
    const hueSelectorRef = useRef<any>();
    const lightnessRef = useRef<any>();
    const lightnessSelectorRef = useRef<any>();
    const isDown = useRef<boolean>(false);
    const optionActive = useRef<"saturation" | "hue" | "lightness" | undefined>(undefined);
    const mousePosition = useRef<any>();
    const MAX_HUE = 360;

    const handleCursorPosition = (
        e: React.MouseEvent<HTMLDivElement> | MouseEvent
    ): void => {
        const rect = hueRef.current.getBoundingClientRect();
        const width = hueRef.current.offsetWidth - hueSelectorRef.current.offsetWidth;
        const mousePositionX = e.clientX - rect.left;
        mousePosition.current = {
            x: mousePositionX >= 0 && mousePositionX <= width ? mousePositionX : mousePositionX > width ? width : 0
        };
        if (optionActive.current === "saturation") {
            saturationSelectorRef.current.style.left = mousePosition.current.x + window.innerWidth * 0.1 + "px";
            const saturation = Number(+(mousePosition.current.x / width).toFixed(2))*100;
            sendCommand({ DeviceId: `${id}`, ControlName: 'saturation', Value: `${saturation}`})
        } else if (optionActive.current === "hue") {
            hueSelectorRef.current.style.left = mousePosition.current.x + window.innerWidth * 0.1 + "px";
            const hue = (mousePosition.current.x / width) * MAX_HUE;
            hueSelectorRef.current.style.backgroundColor = `rgb(${HSLToRGB(hue, 100, 50)[0]}, ${HSLToRGB(hue, 100, 50)[1]}, ${HSLToRGB(hue, 100, 50)[2]})`
            sendCommand({ DeviceId: `${id}`, ControlName: 'hue', Value: `${hue}`})
            lightnessRef.current.style.background = `linear-gradient(90deg, rgba(127,127,127,1), rgba(${Math.round(HSLToRGB(hue, 100, 50)[0])}, ${Math.round(HSLToRGB(hue, 100, 50)[1])}, ${Math.round(HSLToRGB(hue, 100, 50)[2])}, 1))`
        } else if (optionActive.current === "lightness") {
            lightnessSelectorRef.current.style.left = mousePosition.current.x + window.innerWidth * 0.1 + "px";
            const lightness =  Number(+(mousePosition.current.x / width).toFixed(2))*100;
            sendCommand({ DeviceId: `${id}`, ControlName: 'lightness', Value: `${lightness}`})
        }
    };

    const HSLToRGB = (h: number, s: number, l: number) => {
        s /= 100;
        l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    const handleMouseMove = (e: MouseEvent): void => {
        e.preventDefault();
        if (isDown.current) {
            handleCursorPosition(e);
        }
    };

    const handleMouseUp = (): void => {
        isDown.current = false;
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
        optionActive.current = undefined;
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement> | MouseEvent,
        option: "saturation" | "hue" | "lightness"
    ): void => {
        isDown.current = true;
        optionActive.current = option;
        handleCursorPosition(e);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div style={{ width: "100vw", margin: "0 10%" }}>
            <div className={styles.hue} ref={hueRef} onMouseDown={(e) => handleMouseDown(e, "hue")}>
                <span ref={hueSelectorRef} className={styles.hue__selector} />
                <i className={styles.drop_opacity}></i>
            </div>
            <div className={styles.saturation} ref={saturationRef} onMouseDown={(e) => handleMouseDown(e, "saturation")}>
                <i className={styles.sun}></i>
                <span ref={saturationSelectorRef} className={styles.saturation__selector} />
            </div>
            <div className={styles.lightness} ref={lightnessRef} onMouseDown={(e) => handleMouseDown(e, "lightness")}>
                <i className={styles.drop_invert}></i>
                <span ref={lightnessSelectorRef} className={styles.lightness__selector} />
            </div>
        </div>
    )
}