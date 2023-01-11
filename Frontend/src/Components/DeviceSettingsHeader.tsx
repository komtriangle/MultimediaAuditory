import { IconChevronLeft } from "@sberdevices/plasma-icons";
import { Headline1 } from "@sberdevices/plasma-ui";
import { PAGES_TYPE } from "../Consts/Pages";
import { useNavigate } from 'react-router-dom'


function DeviceSettingsHeader() {

    const navigate = useNavigate();

    function onClickBack() {
        navigate(`${PAGES_TYPE.DEVICES}`)
    }

    return (
        <div className='device-settings-header'>
            <div onClick={onClickBack} className='back-to-devices'>
                <IconChevronLeft size="s" color="inherit" />
            </div>
            <div className='settings-header'>
                <Headline1>Настройки</Headline1>
            </div>
        </div>
    )
}

export default DeviceSettingsHeader;