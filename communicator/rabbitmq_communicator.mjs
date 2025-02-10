import amqp from 'amqplib/callback_api.js';
import {createMail}  from '../utils/email.mjs';
import dotenv from 'dotenv';
import communicator from '../communicator/index.mjs'

dotenv.config();
// RabbitMQ URL from environment variables
const rabbitmqUrl = process.env.RABBITMQ_URL;

// Function to receive messages from RabbitMQ queue
//user_account_creation_queue [entire user in body]
//product_creation_queue [entire product in body]
//product_update_queue [entire product in body]
//order_creation_queue //?alert user and sellers [entire order]
//payment_status_queue //?alert sellers or order check if status is completed [order id]--> for each seller in items get seller and product 



const receiveFromQueue = (queue) => {
    amqp.connect(rabbitmqUrl, (error0, connection) => {
        if (error0) {
            console.error("❌ RabbitMQ connection error:", error0);
            process.exit(1);
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                console.error("❌ RabbitMQ channel creation error:", error1);
                process.exit(1);
            }

            // Declare the queue
            channel.assertQueue(queue, { durable: true });
            console.log(`✅ Listening for messages in queue: ${queue}`);

            // Consume messages from the queue
            channel.consume(
                queue,
                (msg) => {
                    if (msg !== null) {
                        const keys = JSON.parse(msg.content.toString());
                        console.log(`📥 Received message from ${queue}:`, keys);

                        // Determine the type of notification and send
                        sendNotification(keys, queue);

                        // Acknowledge the message
                        channel.ack(msg);
                    }
                },
                { noAck: false }
            );
        });
    });
};

// Function to send the notification dynamically
const sendNotification = async (keys, queue) =>{
    console.log(`📢 Sending Notification for ${queue} update`);

    

   
    // Determine the content based on the queue type
    if (queue === 'user_account_creation_queue') {
        //? user
       const  html = `<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header with Logo Area -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Multi-Vendor Platform</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Ultimate Shopping Destination</p>
        </div>

        <!-- Main Content Area -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Welcome ${keys.name}! 🎉</h2>
            
            <div style="background: #f3f4f6; border-radius: 10px; padding: 20px; margin: 20px 0;">
                <p style="color: #4b5563; line-height: 1.6; margin: 0;">
                    Thank you for joining our community of shoppers and sellers. We're excited to have you on board!
                </p>
            </div>

            <!-- Features Section -->
            <div style="margin: 30px 0;">
                <div style="display: inline-block; width: 100%; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px; background: #fdf2f8; border-radius: 10px; margin-bottom: 15px;">
                        <span style="font-size: 24px;">🛍️</span>
                        <h3 style="color: #831843; margin: 10px 0;">Shop Exclusive Products</h3>
                    </div>
                </div>
                <div style="display: inline-block; width: 100%; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px; background: #f0fdf4; border-radius: 10px; margin-bottom: 15px;">
                        <span style="font-size: 24px;">🌟</span>
                        <h3 style="color: #166534; margin: 10px 0;">Earn Rewards</h3>
                    </div>
                </div>
                <div style="display: inline-block; width: 100%;">
                    <div style="text-align: center; padding: 15px; background: #eff6ff; border-radius: 10px;">
                        <span style="font-size: 24px;">💎</span>
                        <h3 style="color: #1e40af; margin: 10px 0;">Premium Experience</h3>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                    Start Shopping
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Connect with us</p>
            <div style="margin-bottom: 20px;">
                <!-- Social Media Icons -->
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📘</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📸</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © 2025 Multi-Vendor Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`
    createMail(keys.email, "Welcome to Multi-Vendor Platform", html);

    

    }
    //! 
    else if (queue === 'product_creation_queue') {
        // Ensure update.status and update.estimatedDelivery exist
        //?entire product
        const seller_id = keys.seller_id;
        const user =  await communicator.getUser(seller_id);
        const productCreationHTML = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Product Listed! 🎉</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Multi-Vendor Platform</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${user.name}! 👋</h2>
            
            <!-- Product Card -->
            <div style="background: #f8fafb; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #e5e7eb;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 48px;">🛍️</span>
                </div>
                <h3 style="color: #374151; margin: 0; text-align: center; font-size: 22px;">${keys.title}</h3>
                
                <!-- Product Details -->
                <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #6b7280; font-weight: 500;">Price:</span>
                        <span style="color: #059669; font-weight: bold;">$${keys.price}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">Quantity Available:</span>
                        <span style="color: #4b5563; font-weight: bold;">${keys.stock_quantity} units</span>
                    </div>
                </div>
            </div>

            <!-- Success Message -->
            <div style="background: #ecfdf5; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #059669;">
                <p style="color: #065f46; margin: 0; line-height: 1.6;">
                    Your product has been successfully listed on our platform and is now visible to potential buyers!
                </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    View Product
                </a>
                <a href="#" style="background: #4b5563; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Manage Listings
                </a>
            </div>
        </div>

        <!-- Tips Section -->
        <div style="padding: 30px; background: #f8fafb; border-top: 1px solid #e5e7eb;">
            <h4 style="color: #374151; margin: 0 0 15px 0;">📌 Quick Tips:</h4>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Keep your product details up to date</li>
                <li>Respond quickly to customer inquiries</li>
                <li>Add high-quality photos to boost sales</li>
            </ul>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Stay connected with us</p>
            <div style="margin-bottom: 20px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📘</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📸</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © ${new Date().getFullYear()} Multi-Vendor Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`;


        createMail(user.email,"Product Added Successfully",productCreationHTML)
    }
    //! 
    else if (queue === 'product_update_queue') {
        //entire product
        const user = await communicator.getUser(keys.seller_id)
        const productUpdateHTML = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Product Update Alert 🔄</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Multi-Vendor Platform</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${user.name}! 👋</h2>
            
            <!-- Update Card -->
            <div style="background: #f0f7ff; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #bfdbfe;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 48px;">📦</span>
                </div>
                
                <!-- Product Details -->
                <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="color: #1e40af; margin: 0 0 15px 0; text-align: center; font-size: 22px;">${keys.title}</h3>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #6b7280; font-weight: 500;">Updated Price:</span>
                        <span style="color: #059669; font-weight: bold; font-size: 18px;">$${keys.price}</span>
                    </div>
                    
                    
                </div>
            </div>

            <!-- Notification Message -->
            <div style="background: #f0fdfa; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #0d9488;">
                <p style="color: #115e59; margin: 0; line-height: 1.6;">
                    Your product has been successfully updated and the changes are now live on our platform!
                </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    View Product
                </a>
                <a href="#" style="background: #6b7280; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Manage Listings
                </a>
            </div>
        </div>

        <!-- Analytics Section -->
        <div style="padding: 30px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
            <h4 style="color: #334155; margin: 0 0 15px 0;">📊 Quick Stats:</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="font-size: 24px;">👁️</div>
                    <div style="color: #64748b; font-size: 14px;">Views Today</div>
                    <div style="color: #334155; font-weight: bold; margin-top: 5px;">123</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="font-size: 24px;">⭐</div>
                    <div style="color: #64748b; font-size: 14px;">Rating</div>
                    <div style="color: #334155; font-weight: bold; margin-top: 5px;">4.8/5</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="font-size: 24px;">🛒</div>
                    <div style="color: #64748b; font-size: 14px;">Orders</div>
                    <div style="color: #334155; font-weight: bold; margin-top: 5px;">45</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Stay connected with us</p>
            <div style="margin-bottom: 20px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📘</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📸</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © ${new Date().getFullYear()} Multi-Vendor Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`;
        createMail(user.email,"Product Updated Successfully",productUpdateHTML)

    }
    //!
    else if(queue === 'order_creation_queue'){
        const items = keys.items;
        //alert each seller
        items.forEach(async (order) => {
            const product = await communicator.getProduct(order.product_id);
            const user = await communicator.getUser(order.seller_id)
            const sellerOrderHTML = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Order Received! 🎉</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Multi-Vendor Platform</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${user.name}! 🌟</h2>
            
            <!-- Order Card -->
            <div style="background: #fff8f1; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #ffe4cc;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 48px;">📦</span>
                </div>
                
                <!-- Product Details -->
                <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="color: #ff6b6b; margin: 0 0 15px 0; text-align: center; font-size: 22px;">${product.name}</h3>
                    
                    <div style="margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280; font-weight: 500;">Price Per Unit:</span>
                            <span style="color: #ff6b6b; font-weight: bold;">$${product.price}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280; font-weight: 500;">Quantity Ordered:</span>
                            <span style="color: #1f2937; font-weight: bold;">${order.quantity} units</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-top: 1px dashed #e5e7eb; margin-top: 10px; padding-top: 10px;">
                            <span style="color: #6b7280; font-weight: 500;">Total Amount:</span>
                            <span style="color: #059669; font-weight: bold; font-size: 18px;">$${order.price}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Required Box -->
            <div style="background: #fff1f2; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #ff6b6b;">
                <h4 style="color: #991b1b; margin: 0 0 10px 0;">🎯 Action Required:</h4>
                <p style="color: #ef4444; margin: 0; line-height: 1.6;">
                    Please process this order within the next 24 hours to maintain our service standards.
                </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: #ff6b6b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Process Order
                </a>
                <a href="#" style="background: #6b7280; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    View Details
                </a>
            </div>
        </div>

        <!-- Tips Section -->
        <div style="padding: 30px; background: #f8fafb; border-top: 1px solid #e5e7eb;">
            <h4 style="color: #374151; margin: 0 0 15px 0;">📌 Quick Reminders:</h4>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Confirm stock availability</li>
                <li>Pack items securely</li>
                <li>Update order status promptly</li>
            </ul>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Need assistance?</p>
            <div style="margin-bottom: 20px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📧</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">💬</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © ${new Date().getFullYear()} Multi-Vendor Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`;
            createMail(user.email,"Order Placed For Product",sellerOrderHTML)
            
        });

        const buyer = await communicator.getUser(keys.user_id);
        const buyerOrderHTML = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Thank you for shopping with us</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${buyer.name}! 🌟</h2>
            
            <!-- Order Info Card -->
            <div style="background: #f0f7ff; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #bfdbfe;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 48px;">🛍️</span>
                </div>
                
                <!-- Order Details -->
                <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="margin-bottom: 15px; text-align: center;">
                        <span style="color: #6b7280; font-size: 14px;">Order ID</span>
                        <h3 style="color: #1e40af; margin: 5px 0; font-size: 20px;">${keys.order_id}</h3>
                    </div>
                    
                    <div style="border-top: 1px dashed #e5e7eb; padding-top: 15px; margin-top: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280; font-weight: 500;">Total Amount:</span>
                            <span style="color: #059669; font-weight: bold; font-size: 24px;">$${keys.total_price}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Timeline -->
            <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 12px;">
                <h4 style="color: #334155; margin: 0 0 15px 0;">Order Timeline</h4>
                <div style="display: flex; justify-content: space-between; position: relative;">
                    <div style="flex: 1; text-align: center; position: relative;">
                        <div style="background: #3B82F6; width: 30px; height: 30px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 14px;">✓</span>
                        </div>
                        <p style="margin: 0; color: #3B82F6; font-size: 14px;">Confirmed</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="background: #e5e7eb; width: 30px; height: 30px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #9ca3af; font-size: 14px;">2</span>
                        </div>
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">Processing</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="background: #e5e7eb; width: 30px; height: 30px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #9ca3af; font-size: 14px;">3</span>
                        </div>
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">Shipped</p>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: #3B82F6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Track Order
                </a>
                <a href="#" style="background: #6b7280; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    View Details
                </a>
            </div>

            <!-- Next Steps -->
            <div style="background: #f0fdfa; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #0d9488;">
                <h4 style="color: #0f766e; margin: 0 0 10px 0;">What's Next? 📋</h4>
                <ul style="color: #115e59; margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li>You'll receive updates about your order status</li>
                    <li>Sellers are preparing your items for shipment</li>
                    <li>Track your order anytime from your account</li>
                </ul>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Need help with your order?</p>
            <div style="margin-bottom: 20px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📧</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">💬</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © ${new Date().getFullYear()} Multi-Vendor Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`;
        createMail(buyer.email,"Order Placed Successfully",buyerOrderHTML)
    }
    else if(queue === 'payment_status_queue'){

    }
};

// Start receiving messages from specific queues
export  { receiveFromQueue, sendNotification };
