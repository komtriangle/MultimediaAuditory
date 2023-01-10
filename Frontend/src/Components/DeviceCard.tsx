import { Card, CardContent, CardBody,CardMedia } from '@sberdevices/plasma-ui';
import { Col } from '@sberdevices/plasma-ui/components/Grid';
import PropTypes from 'prop-types';
import { PAGES_TYPE } from '../Consts/Pages';
import {useNavigate} from "react-router-dom"
import { accent, primary } from '@salutejs/plasma-tokens'
import { BodyL, BodyS } from '@salutejs/plasma-ui';;

export const DeviceCard = ({id, image, name, status}:
    {id: string,
    image: string,
    name: string,
    status: boolean}) =>{
    const navigate = useNavigate()

    function onClickDevice() {
        navigate(`${PAGES_TYPE.DEVICE}/${id}`)
    }

    return (
             <Col onClick={onClickDevice} className="device-card"  sizeS={2} sizeM={3} sizeL={3} sizeXL={3} >
             <Card  style={{marginTop: '4%'}}  tabIndex={0} outlined scaleOnFocus>
             <CardBody>
                    <CardContent
                        style={{padding:'10%'}}>
                        <CardMedia 
                        style={{marginLeft: '20%'}}
                        width='55%'
                        ratio='4/3'
                        src={image} 
                        placeholder={image}
                         />
                        
                        <BodyL >{name}</BodyL>
                        <BodyS style={status ? {color:accent}: {color: primary}}> {status ? "Вкл.": "Выкл."}</BodyS>
                    </CardContent>
                </CardBody>
            </Card>
        </Col>
    )
}
