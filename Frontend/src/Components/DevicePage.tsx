import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { useNavigate, useParams } from "react-router-dom";
import IDeviceState from "../Store/Interfaces/IDeviceState";
import { PAGES_TYPE } from "../Consts/Pages";
import { DeviceTypes } from "../Consts/DeviceTypes";
import LampPage from "../Pages/LampPage";

const DevicePage = (props: any) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const device: IDeviceState = currentDevice();

    if (device == undefined) {
        navigate(`${PAGES_TYPE.DEVICES}`)
    }


    function currentDevice(): IDeviceState {
        const device = props.devices.find((d: IDeviceState) => d.id === id);
        return device;
    }

    function chooseDeviceComponent(device: IDeviceState) {
        switch (device.type) {
            case DeviceTypes.Lamp:
                return <LampPage />
            default:
                navigate(`${PAGES_TYPE.DEVICES}`);
        }
    }

    return (
        <div>
            {chooseDeviceComponent(device)}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage);