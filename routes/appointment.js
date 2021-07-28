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

module.exports = router