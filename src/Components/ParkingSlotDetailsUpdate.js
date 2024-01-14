export default function ParkingSlotDetailsUpdate({id, isUpdate})
{
    const {
        parkingSlotDetailsEntity,
        getDetails
     } = useParkingSlotDetailsHook(id);

    const [showUpdate, setShowUpdate] = useState();

    const [element, setElement] = useState(null)

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const setData = async () =>{
        const element = await getDetails(id);
        if(element) setElement(element);
    }

    useEffect(()=>{
        setData();
    },[])

    return <>
        {   element
            ? <Button variant="primary" onClick={handleShowUpdate}>
                Update Parking Details
              </Button>
            : 'No info'
        }
        { 
            showUpdate && element && 
            <GenericUpdateForm
                data = { parkingSlotDetailsEntity.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {()=>{}}
                title = {parkingSlotDetailsEntity.getEntityName()}
                submitButtonText = {null}
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
    </>
}