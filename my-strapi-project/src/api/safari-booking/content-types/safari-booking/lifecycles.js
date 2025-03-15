module.exports = {
    async afterCreate(event) {
      const { result } = event;
  
      try {
        
        let destinationName = "Your Safari";
        let destinationDescription = "";
        
       
        if (result.safari_destination) {
          const destinationData = await strapi.entityService.findOne(
            'api::safari-destination.safari-destination', 
            result.safari_destination,
            { populate: ['*'] }
          );
          
          if (destinationData) {
            destinationName = destinationData.name || destinationName;
            destinationDescription = destinationData.description || "";
          }
        }
  
        
        const travelDate = new Date(result.travel_date_from);
        const formattedDate = travelDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  
        
        let greeting = 'Hello';
        if (result.title === 'Mr') {
          greeting = `Dear Mr. ${result.last_name}`;
        } else if (result.title === 'Mrs') {
          greeting = `Dear Mrs. ${result.last_name}`;
        } else if (result.title === 'Miss') {
          greeting = `Dear Miss ${result.last_name}`;
        } else if (result.title === 'Dr') {
          greeting = `Dear Dr. ${result.last_name}`;
        }
  
       
        let partyDescription = `${result.adults} adult${result.adults > 1 ? 's' : ''}`;
        if (result.children > 0) {
          partyDescription += ` and ${result.children} ${result.children > 1 ? 'children' : 'child'}`;
        }
  
        await strapi.services["api::email.email"].send({
          to: result.email,
          subject: `Your ${destinationName} Safari Booking Confirmation - Safari Motors`,
          html: `
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
              }
              .header {
                background-color: #4A6741;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                padding: 20px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
              }
              .footer {
                font-size: 12px;
                color: #666;
                text-align: center;
                margin-top: 20px;
                padding: 10px;
                border-top: 1px solid #ddd;
              }
              .booking-details {
                background-color: #fff;
                padding: 15px;
                border-left: 4px solid #4A6741;
                margin: 15px 0;
              }
              .destination-highlight {
                background-color: #f0f7ed;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 15px;
              }
              h2 {
                color: #4A6741;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Safari Motors</h1>
            </div>
            <div class="content">
              <h2>Booking Confirmation</h2>
              <p>${greeting},</p>
              <p>Thank you for booking your safari adventure with Safari Motors! We are thrilled that you have chosen us for your upcoming journey into the wild.</p>
              
              <div class="destination-highlight">
                <h3>${destinationName}</h3>
                ${destinationDescription ? `<p>${destinationDescription}</p>` : ''}
              </div>
              
              <div class="booking-details">
                <h3>Your Booking Details:</h3>
                <p><strong>Name:</strong> ${result.title} ${result.first_name} ${result.last_name}</p>
                <p><strong>Travel Date:</strong> ${formattedDate}</p>
                <p><strong>Duration:</strong> ${result.number_of_nights} night${result.number_of_nights > 1 ? 's' : ''}</p>
                <p><strong>Party Size:</strong> ${partyDescription}</p>
                <p><strong>Budget Range:</strong> ${result.budget_per}</p>
                ${result.booking_information ? `<p><strong>Selected Experiences:</strong> ${result.booking_information}</p>` : ''}
              </div>
              
              <p>Our team is reviewing your booking request and will contact you shortly to discuss the details and confirm your safari adventure. Please allow up to 24 hours for us to get back to you.</p>
              
              <p>If you have any urgent questions or need to update your booking information, please contact us at:</p>
              <p>📞 Phone: +254 727 265 224<br>
              📧 Email: safarimotorske@gmail.com</p>
              
              <p>We look forward to helping you create unforgettable memories in the beautiful landscapes of Africa!</p>
              
              <p>Warm regards,<br>
              The Safari Motors Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation of your booking request. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Safari Motors. All rights reserved.</p>
            </div>
          </body>
          </html>
          `
        });
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }
  };