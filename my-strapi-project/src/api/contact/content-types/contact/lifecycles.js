module.exports ={
    async afterCreate(event){
        const {result} = event;

        try{
            await strapi.services["api::email.email"].send({
                to:result.email,
                subject:"Contact form recieved",
                html:`
                <html>
                <body>
                <h1>${result.name}</h1>
                <p>We send this letter to confirm that we have recieved your feedback and we will be getting back
                 to you as soon as possible.</p>
                 </body>
                 </html>
                
                `
            })
        }
        catch(error){
            console.log(error)
        }

    }
}