import { hostelBookings } from "../services/hostelBookings.mjs";
import { ticketBookings } from "../services/ticketBookings.mjs";


const holaworldController = (ree,res,next)=>{
    const {type, data} = req.body;


    switch(type){
        case 'ticketbookings':
            //call ticket bookings service
            ticketBookings(data);
            break;
        case 'hostelbookings':
            //call hostel bookings service
            hostelBookings(data)
            break;
        default:
            res.status(400).send('Invalid type')
    }
}

export {holaworldController}