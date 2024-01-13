import { GenericTabel } from "../GenericComponents/GenericTable"
import { useMyBookingsHook } from "../EntityDefinitions/MyBookingsEntityDefinition"
export default function Parkings({}) {

    const {
        myBookingsEntity,
        getData,
        deleteBooking
     } = useMyBookingsHook()
    return <div className="center-div">
        <GenericTabel 
        getDataMethod={getData}
        deleteDataMethod={deleteBooking}
        entityDefinition={myBookingsEntity}
        ></GenericTabel>
    </div>
}