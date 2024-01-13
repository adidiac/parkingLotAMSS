import { GenericTabel } from "../GenericComponents/GenericTable"
import {useParkingSlotsHook} from '../EntityDefinitions/Parkings'
export default function Parkings({}) {

    const {
        parkingSlotsEntity,
        getData
     } = useParkingSlotsHook()
    return <div className="center-div">
        <GenericTabel 
        getDataMethod={getData}
        entityDefinition={parkingSlotsEntity}
        ></GenericTabel>
    </div>
}