import React from 'react';
import on_off from '../Content/Images/on-off.png';
import { Container, } from '@sberdevices/plasma-ui/components/Grid';
import { Image, Headline4, Button, BodyL } from '@sberdevices/plasma-ui';
import { useParams } from "react-router-dom"
import { colorValues } from '@salutejs/plasma-tokens';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import Connector from '../SignalRConnector/Connector';
import IDeviceState from '../Store/Interfaces/IDeviceState';
import { DeviceSettingsHeader } from '../Components/DeviceSettingsHeader';
import { ColorPicker } from '../Components/HuePicker';

const LampPage = (props: any) => {
    const { id } = useParams();
    const { sendCommand } = Connector;
    const currentDevice = () => {
        const device = props.devices.find((d: IDeviceState) => d.id === id);
        return device;
    }
    const device = currentDevice();
    const onClickOnOff = () => {
        console.log(device.isOn, id)
        if (device.isOn === true) {
            //props.sendAction({action_id: "deviceOn"})
            sendCommand({ DeviceId: `${id}`, ControlName: 'on-off', Value: 'off' });
            //sendCommand({ DeviceId: `${id}`, ControlName: 'color', Value: '255 255 255' });
        }
        else {
            //props.sendAction({action_id: "deviceOn"})
            sendCommand({ DeviceId: `${id}`, ControlName: 'on-off', Value: 'on' });
        }
    }

    return (
        <>
            <DeviceSettingsHeader />
            <Container className='device-image-container'>
                <Headline4>{device.name}</Headline4>
                <Image
                    src={device.image}
                    width='15%'
                    height='15%'
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: "8px" }}>
                    <BodyL style={device.isOn ? { color: colorValues.accent, marginRight: "12px" } : { color: colorValues.secondary, marginRight: "12px" }}>{device.isOn ? "Вкл." : "Выкл."}</BodyL>
                    <Button onClick={onClickOnOff} view="clear" >
                        <img className={device.isOn === true ? 'image-on' : ''}
                            src={on_off}
                            width='40px'
                            height='40px'
                        />
                    </Button>
                </div>
                <div style={{ marginTop: "16px" }}>
                    {device.id != 2 ? (<ColorPicker />) : (<div></div>)}
                </div>
            </Container>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        devices: state.devices
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LampPage)

