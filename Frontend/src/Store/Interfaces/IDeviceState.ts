import { DeviceTypes } from "../../Consts/DeviceTypes"

// Интерфейс, которому должны удовлетворять все
// уствройства в store
//не все свойства относятся ко всем устройства.
//каждой устройство имеет часть этих свойств
export default interface IDeviceState {
    id: string
    name: string
    type: DeviceTypes
    isOn: boolean | undefined
    image: string
}

