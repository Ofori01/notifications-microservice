import { hostelBookings } from "../services/hostelBookings.mjs";
import { ticketBookings } from "../services/ticketBookings.mjs";


const holaworldController = async (req,res,next)=>{
    const {type, data} = req.body;


 switch(type){
        case 'ticketbookings':
            //call ticket bookings service
            ticketBookings(data);
            res.status(200).send({message: 'Email sent'});
            break;
        case 'hostelbookings':
            //call hostel bookings service
            hostelBookings(data)
            res.status(200).send({message: 'Email sent'});
            break;
        default:
            res.status(400).send('Invalid type')
    }
}

export {holaworldController}