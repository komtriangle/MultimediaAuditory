import { Spinner } from '@salutejs/plasma-ui';
import { Container, } from '@sberdevices/plasma-ui/components/Grid';
import { connect } from "react-redux";
import { ConnectionStatuses } from '../Consts/ConnectionStatuses';
import IStore from '../Store/Interfaces/IStore';


const SpinnerPage = ({ connectionStatus }:
    { connectionStatus: ConnectionStatuses }) => {

    function isShowSpinner(): Boolean {
        return false
        //connectionStatus === ConnectionStatuses.Disconnected;
    }

    return (
        <>
            {isShowSpinner() === true ?
                (<Container className='spinner-container'>
                    <Spinner />
                </Container>) : (<></>)
            }
        </>
    )
}


function mapStateToProps(state: IStore) {
    return {
        connectionStatus: state.Connection.status,
    }
}

export default connect(mapStateToProps)(SpinnerPage)
