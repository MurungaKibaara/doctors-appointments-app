const router = require('express').Router();

const Appointment = require('../models/appointments');

require('dotenv').config()

router.post('/appointments', async (req, res) => {
    const appointment = new Appointment({
        user_id: req.user_id,
        start: req.body.start,
        finish: req.body.finish,
      });
    
      try {
        const savedAppointment = await appointment.save();
        res.status(201).send({ error: null, data: savedAppointment  });

      } catch (error) {
          res.status(400).send({ error: error });
      }
})

router.get('/appointments', async (req, res) => {
    const per_page = parseInt(req.query.per_page) || 10
    const page_no = parseInt(req.query.page_no) || 1
    const pagination = {
        limit: per_page,
        skip:per_page * (page_no - 1)
    }
    
    try {
        const appointments = await Appointment.find({user_id: req.user_id}).limit(pagination.limit).skip(pagination.skip).exec()
        res.status(200).send(appointments);

    } catch(error) {
        console.log({ error })
    }
});


router.put('/appointments/:id', async (req, res, next) => {

    const selectedOption = Object.keys(req.body);
    const appointment = await Appointment.findById({ _id: req.params.id });

    try {
        selectedOption.forEach(option => appointment[option] = req.body[option]);
        
        await appointment.save()
        res.status(200).send(appointment);

    } catch (err) {
        res.status(400).send({ error: err }); 
    }
});


router.delete('/appointments/:id', (req, res) => {
    // if (req.role === 'user') {
    //     res.status(400).send({ error: "You don't have the required privileges." })
    //     return false
    // }

    Appointment.findOneAndDelete({_id: req.params.id}).then(function(appointment){
        res.send(appointment);
    });
});

module.exports = router