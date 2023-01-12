import { Container, Row } from '@sberdevices/plasma-ui/components/Grid';
import { DeviceCard } from '../Components/DeviceCard';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import IDeviceState from '../Store/Interfaces/IDeviceState';
import { Headline1 } from "@sberdevices/plasma-ui";

const DevicesPage = (props: any) => {
    return (
        <Container>
            <Headline1 style={{ margin: "1em auto" }}>202 аудитория</Headline1>
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

const mapStateToProps = (state: any) => {
    return {
        devices: state.devices,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage)