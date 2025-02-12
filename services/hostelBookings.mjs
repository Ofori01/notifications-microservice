import { createHolaWorldMail } from "../utils/cpanel_email.mjs";


export function hostelBookings(data){
    const userBookingHtml = `
    <div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10B981 0%, #047857 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed! 🏠</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Get ready for your stay</p>
            </div>
    
            <!-- Main Content -->
            <div style="padding: 40px 30px; background: white;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${data.fullName}! 🌟</h2>
                
                <!-- Booking Summary -->
                <div style="background: #f0fdf4; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #86efac;">
                    <h3 style="color: #166534; margin: 0 0 20px 0; text-align: center;">Your Stay Details</h3>
                    
                    <div style="background: white; border-radius: 12px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span style="color: #6b7280;">Room Type</span>
                            <span style="color: #047857; font-weight: bold;">${data.roomType}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span style="color: #6b7280;">Check-in</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.checkIn}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span style="color: #6b7280;">Check-out</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.checkOut}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #6b7280;">Guests</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.numGuests} person(s)</span>
                        </div>
                    </div>
                </div>
    
                <!-- Important Information -->
                <div style="background: #fff7ed; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #f97316;">
                    <h4 style="color: #c2410c; margin: 0 0 10px 0;">Important Information ℹ️</h4>
                    <ul style="color: #9a3412; margin: 0; padding-left: 20px; line-height: 1.6;">
                        <li>Check-in time: 2:00 PM</li>
                        <li>Check-out time: 11:00 AM</li>
                        <li>Please have your ID ready at check-in</li>
                        <li>Payment method: ${data.paymentMethod}</li>
                    </ul>
                </div>
    
                ${data.specialRequests ? `
                <!-- Special Requests -->
                <div style="background: #f0f9ff; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
                    <h4 style="color: #0369a1; margin: 0 0 10px 0;">Your Special Requests</h4>
                    <p style="color: #0c4a6e; margin: 0; line-height: 1.6;">${data.specialRequests}</p>
                </div>
                ` : ''}
    
                <!-- Contact Information -->
                <div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
                    <h4 style="color: #334155; margin: 0 0 15px 0;">Your Contact Details</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div>
                            <p style="color: #6b7280; margin: 0 0 5px 0;">Email</p>
                            <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.email}</p>
                        </div>
                        <div>
                            <p style="color: #6b7280; margin: 0 0 5px 0;">Phone</p>
                            <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.phone}</p>
                        </div>
                    </div>
                </div>
    
                <!-- Action Buttons -->
                <div style="text-align: center; margin: 35px 0;">
                    <a href="#" style="background: #10B981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                        Manage Booking
                    </a>
                    <a href="#" style="background: #6b7280; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                        Contact Us
                    </a>
                </div>
            </div>
    
            <!-- Footer -->
            <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
                <p style="margin: 0 0 15px 0;">Need help with your booking?</p>
                <div style="margin-bottom: 20px;">
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📧</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">💬</a>
                    <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                    © ${new Date().getFullYear()} Hostel Booking Platform. All rights reserved.
                </p>
            </div>
        </div>
    </div>`;

    const adminBookingHtml = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4F46E5 0%, #312E81 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Hostel Booking 🏠</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Booking ID: #${Date.now()}</p>
        </div>

        <!-- Quick Stats -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px; background: #f1f5f9;">
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">🛏️</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Room Type</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">${data.roomType}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">👥</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Guests</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">${data.numGuests}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">📅</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Nights</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">
                    ${Math.ceil((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24))}
                </p>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
            <!-- Guest Information -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #334155; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">👤</span> Guest Information
                </h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Full Name</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.fullName}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Email</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.email}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Phone</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.phone}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Payment Method</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.paymentMethod}</p>
                    </div>
                </div>
            </div>

            <!-- Stay Details -->
            <div style="background: #eef2ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #3730a3; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🏨</span> Stay Details
                </h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Check-in</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.checkIn}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Check-out</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.checkOut}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Room Type</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.roomType}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Number of Guests</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.numGuests}</p>
                    </div>
                </div>
            </div>

            ${data.specialRequests ? `
            <!-- Special Requests -->
            <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #065f46; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">📝</span> Special Requests
                </h3>
                <p style="color: #1f2937; margin: 0; line-height: 1.6;">${data.specialRequests}</p>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0 20px;">
                <a href="#" style="background: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Review Booking
                </a>
                <a href="#" style="background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Approve
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                This is an automated message from the booking system. Please do not reply directly to this email.
            </p>
        </div>
    </div>
</div>`;
try {
    createHolaWorldMail(data.email, 'Hostel Booking Confirmation', userBookingHtml);
    createHolaWorldMail(process.env.HOLAWORLD_EMAIL, 'New Hostel Booking', adminBookingHtml);
} catch (error) {
    console.log(error)
}

}