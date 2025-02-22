import dotenv from 'dotenv';
import express from 'express';
import mongoose, { createConnection } from 'mongoose';
import communicator from './communicator/index.mjs';
import { createMail } from './utils/email.mjs';
import cors from 'cors'
import { receiveFromQueue } from './communicator/rabbitmq_communicator.mjs';
import { holaworldController } from './controllers/holaworld_email_controller.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Notification Service is running`);
});
mongoose.connect(process.env.MONGO_URI_NOTIFICATIONS).then(
    () => {
        console.log("notifications Connected to Database")
    }
).catch(
    (error) => {
        console.log("Error connecting notifications service to MongoDB",error)
    }
);

receiveFromQueue('user_account_creation_queue');
receiveFromQueue('product_creation_queue')
receiveFromQueue('product_update_queue')
receiveFromQueue('order_creation_queue')
receiveFromQueue('payment_status_queue')





app.use(express.json());
app.use(cors())
app.get('/api/test', async (req, res) =>{
    try {
        const response = await communicator.authTest()
        res.send({msg: `${response} and Notification Service is running`});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/sendNotification', async (req, res) => {
    try {
        const {user_id, message, subject} = req.body;
        if(!user_id || !message || !subject) {
            return res.status(400).send({msg: 'Missing required fields'});
        }
        const user = await communicator.getUser(user_id);
        if(!user) {
            return res.status(404).send({msg: 'User not found, Email not sent'});
        }
        const response = createMail(user.email, subject, message);
        return res.status(200).send({msg: 'Email sent'});
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: `${error.message}`})
        
    }
})

app.post("/api/holaworld/email", holaworldController)