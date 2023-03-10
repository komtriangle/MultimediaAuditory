import { IconChevronLeft } from "@sberdevices/plasma-icons";
import { Headline2 } from "@sberdevices/plasma-ui";
import { PAGES_TYPE } from "../Consts/Pages";
import { useNavigate } from 'react-router-dom'


export const DeviceSettingsHeader = () => {
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(`${PAGES_TYPE.DEVICES}`)
    }

    return (
        <div className='device-settings-header'>
            <div onClick={onClickBack} className='back-to-devices'>
                <IconChevronLeft size="s" color="inherit" />
            </div>
            <div className='settings-header'>
                <Headline2>Настройки</Headline2>
            </div>
        </div>
    )
}