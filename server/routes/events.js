let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// connect to our book model
let eventModel = require('../model/event');

// GET route for displaying the data from DB --> Read Operation
router.get('/',async(req,res,next)=>{
    try{
        const EventList = await Event.find();
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
                error:'Error on the Server'
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
                error:'Error on the Server'
            }
        )
    }
})


// POST route for processing the Add Page --> Create Operations
router.post('/add',async(req,res,next)=>{
    try
    {
        let newEvent = Event({
            "name":req.body.name,
            "organizer":req.body.organizer,
            "date":req.body.date,
            "description":req.body.description,
            "location":req.body.location
        })
        Event.create(newEvent).then(()=>{
            res.redirect('/events')
        });
    }


     catch(err)
    {
        console.log(err);
        res.render('Events/list',
            {
                error:'Error on the Server'
            }
        )
    }
})


// GET route for displaying the Edit Page --> Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const bookToEdit = await Book.findById(id);
        res.render("Books/edit",
            {
                title: 'Edit Book',
                Book: bookToEdit,
                displayName: req.user?req.user.displayName:""
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
        let updateBook = Book({
            "_id":id,
            "name":req.body.name,
            "author":req.body.author,
            "published":req.body.published,
            "description":req.body.description,
            "price":req.body.price
        })
        Book.findByIdAndUpdate(id,updateBook).then(()=>{
            res.redirect("/books")
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
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect("/books")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
    
})
module.exports = router;