const express  = require('express');
const router   = express.Router();
const service  = require('../services/appointment.service');
const { checkJwt }                  = require('../middlewares/auth.middleware');
const { validateCreateAppointment } = require('../middlewares/validate.middleware');

router.use(checkJwt);

router.post('/', validateCreateAppointment, async (req, res) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

router.get('/today', async (req, res) => {
  try {
    const result = await service.findToday();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { doctorId, patientId, status, date, page, limit } = req.query;
    const result = await service.findAll({
      doctorId, patientId, status, date,
      page:  page  ? parseInt(page,  10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await service.findOne(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const result = await service.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await service.remove(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = router;