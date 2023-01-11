import React from 'react';
import { Container, Row } from '@sberdevices/plasma-ui/components/Grid';
import { DeviceCard } from '../Components/DeviceCard';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import IDeviceState from '../Store/Interfaces/IDeviceState';


const DevicesPage = (props: any) => {
    return (
        <Container>
            <Row>
                {props.devices.map((d: IDeviceState) => (
                    <DeviceCard
                        key={d.id}
                        id={d.id}
                        name={d.name}
                        status={d.isOn ?? false}
                        image={d.image} />
                ))}
            </Row>
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        devices: state.devices,
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({

    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage)