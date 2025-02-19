import { createHolaWorldMail } from "../utils/cpanel_email.mjs";

export function ticketBookings(data){
    const userBookingHtml =`
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed! ✈️</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your journey is set to begin</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hello ${data.fullName}! 🌟</h2>
            
            <!-- Flight Details Card -->
            <div style="background: #f0f7ff; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #bfdbfe;">
                <h3 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">Flight Details 🛫</h3>
                
                <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div style="text-align: center; flex: 1;">
                            <p style="color: #6b7280; margin: 0;">From</p>
                            <h4 style="color: #1e40af; margin: 5px 0; font-size: 24px;">${data.departureAirport}</h4>
                        </div>
                        <div style="text-align: center; padding: 0 20px;">
                            <span style="color: #2563eb; font-size: 24px;">✈️</span>
                        </div>
                        <div style="text-align: center; flex: 1;">
                            <p style="color: #6b7280; margin: 0;">To</p>
                            <h4 style="color: #1e40af; margin: 5px 0; font-size: 24px;">${data.destinationAirport}</h4>
                        </div>
                    </div>
                    <div style="border-top: 1px dashed #e5e7eb; padding-top: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Departure</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.departureDate}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Return</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.returnDate}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #6b7280;">Class</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.flightClass}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Transportation Details -->
            <div style="background: #fdf2f8; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #fbcfe8;">
                <h3 style="color: #9d174d; margin: 0 0 20px 0; text-align: center;">Transportation Details 🚗</h3>
                
                <div style="background: white; border-radius: 12px; padding: 20px;">
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Service Type</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.transportType}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Pickup Location</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.pickupLocation}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #6b7280;">Pickup Time</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.pickupDateTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact & Special Requests -->
            <div style="background: #ecfdf5; border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid #a7f3d0;">
                <h3 style="color: #065f46; margin: 0 0 20px 0; text-align: center;">Contact Information 📞</h3>
                
                <div style="background: white; border-radius: 12px; padding: 20px;">
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Email</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.email}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #6b7280;">Phone</span>
                            <span style="color: #1f2937; font-weight: 500;">${data.phone}</span>
                        </div>
                    </div>
                    ${data.specialRequests ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #e5e7eb;">
                        <p style="color: #6b7280; margin: 0 0 5px 0;">Special Requests:</p>
                        <p style="color: #1f2937; margin: 0;">${data.specialRequests}</p>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Payment Info -->
            <div style="background: #eff6ff; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <p style="color: #1e40af; margin: 0; line-height: 1.6;">
                    Payment Method: ${data.paymentMethod}
                </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                    Manage Booking
                </a>
                <a href="#" style="background: #6b7280; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Contact Support
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; color: white; padding: 30px 20px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Need assistance with your booking?</p>
            <div style="margin-bottom: 20px;">
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📧</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">💬</a>
                <a href="#" style="color: white; text-decoration: none; margin: 0 10px;">📱</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.6);">
                © ${new Date().getFullYear()} Travel Booking Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>`;

    const adminBookingHtml = `
<div style="background-color: #f8f9fa; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4338CA 0%, #312E81 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Booking Received 🎯</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">This Booking was created at: #${Date.now()}</p>
        </div>

        <!-- Quick Stats -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px; background: #f1f5f9;">
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">✈️</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Flight Class</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">${data.flightClass}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">🚗</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Transport</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">${data.transportType}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <span style="font-size: 24px;">💳</span>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Payment</p>
                <p style="margin: 5px 0 0 0; color: #1f2937; font-weight: bold;">${data.paymentMethod}</p>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px;">
            <!-- Customer Information -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #334155; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">👤</span> Customer Details
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
                </div>
            </div>

            <!-- Flight Information -->
            <div style="background: #eef2ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #3730a3; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">✈️</span> Flight Information
                </h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">From</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.departureAirport}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">To</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.destinationAirport}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Departure Date</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.departureDate}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Return Date</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.returnDate}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Class</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.flightClass}</p>
                    </div>
                </div>
            </div>

            <!-- Transportation Details -->
            <div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #9d174d; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🚗</span> Transportation Details
                </h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Service Type</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.transportType}</p>
                    </div>
                    <div>
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Pickup Time</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.pickupDateTime}</p>
                    </div>
                    <div style="grid-column: span 2;">
                        <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 13px;">Pickup Location</p>
                        <p style="color: #1f2937; margin: 0; font-weight: 500;">${data.pickupLocation}</p>
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
        console.log(data)
         createHolaWorldMail(data.email, 'Air Ticket Booking Confirmation', userBookingHtml);
         createHolaWorldMail(process.env.HOLAWORLD_EMAIL, 'New Air Ticket Booking', adminBookingHtml);
    } catch (error) {
        console.log(error);
    }
}
