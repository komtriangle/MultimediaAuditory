import lamp from '../../Content/Images/lamp.png';
import on_off from '../../Content/Images/on-off.png';
import { Container, } from '@sberdevices/plasma-ui/components/Grid';
import { Image,  Headline4, Button, BodyXS} from '@sberdevices/plasma-ui';
import  {useParams} from "react-router-dom"
import { colorValues } from '@salutejs/plasma-tokens';
import { connect } from "react-redux"
import {  bindActionCreators } from "redux";
import Connector from '../../SignalRConnector/Connector';
import IDeviceState from '../../Store/Interfaces/IDeviceState';
import DeviceSettingsHeader from './DeviceSettingsHeader';


const LampPage = (props: any) =>{

    const {id} = useParams();
    const { sendCommand, events } = Connector;
    const device = currentDevice();

    function onClickOnOff(){
        console.log(device.isOn)
        if(device.isOn === true){
            sendCommand({DeviceId:`${id}`,  ControlName: 'on-off', Value: 'off'});
        }
        else{
            sendCommand({DeviceId:`${id}`,  ControlName: 'on-off', Value: 'on'});
        }
    }


    function currentDevice(){
        const device = props.devices.find((d:IDeviceState) => d.id === id);
        return device;
    }

    return(
       <>
        <DeviceSettingsHeader/>
        <Container className='device-image-container'>
            <Image
                        src={device.image}
                        width='20%'
                        height='20%'
                />

                <Headline4>{device.name}</Headline4>
                <BodyXS style={{color: colorValues.secondary, marginBottom: '20px'}}>{device.isOn ? "Включена" : "Выключена"}</BodyXS>
                
                <Button onClick={onClickOnOff} view="clear">
                    <img className={device.isOn === true ? 'image-on':''}
                            src={on_off}
                            width='50px'
                            height='50px'
                    />
                </Button>
        </Container>
       </>
    )
}

function mapStateToProps(state: any) {
    return {
        devices: state.devices
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
       
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(LampPage)

