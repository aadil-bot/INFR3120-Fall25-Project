let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let eventModel = require('../model/event'); 

// GET route for displaying the data from DB --> Read Operation
router.get('/',async(req,res,next)=>{
    try{
        const EventList = await eventModel.find(); 
        res.render('Events/list',{
            title:'Event Planner',
            EventList: EventList
        })
    }
    catch(err)
    {
        console.log(err);
        res.render('Events/list',
            {
                title: 'Error',
                error: 'Error on the Server',
                EventList: []
            }
        )
    }
});

// GET route for displaying the Add Page --> Create Operation
router.get('/add',async(req,res,next)=>{
    try
    {
        res.render('Events/add',{
            title:'Add New Event'
        });
    }
    catch(err)
    {
        console.log(err);
        res.render('Events/list',
            {
                title: 'Error',
                error:'Error on the Server',
                EventList: []
            }
        )
    }
})

// POST route for processing the Add Page --> Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newEvent = eventModel({ 
            "name":req.body.name,
            "organizer":req.body.organizer,
            "date":req.body.date,
            "description":req.body.description,
            "location":req.body.location
        })
        eventModel.create(newEvent).then(()=>{ 
            res.redirect('/events')
        });
    }
     catch(err)
    {
        console.log(err);
        res.render('Events/list',
            {
                title: 'Error', 
                error:'Error on the Server',
                EventList: [] 
            }
        )
    }
})

// GET route for displaying the Edit Page --> Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const eventToEdit = await eventModel.findById(id); 
        res.render("Events/edit",
            {
                title: 'Edit Event',
                Event: eventToEdit
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

// POST route for processing the Edit Page --> Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updateEvent = eventModel({ 
            "_id":id,
            "name":req.body.name,
            "organizer":req.body.organizer,
            "date":req.body.date,
            "description":req.body.description,
            "location":req.body.location
        })
        eventModel.findByIdAndUpdate(id,updateEvent).then(()=>{
            res.redirect("/events")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})

// GET route to perform Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        // You must use 'eventModel' here
        eventModel.deleteOne({_id:id}).then(()=>{ 
            res.redirect("/events")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
    
})
module.exports = router;