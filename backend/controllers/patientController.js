const mongoose = require('mongoose');
const Patient = require('../models/Patient');

function normalizePhone(s) { return String(s || '').trim(); }

async function getPatientByRef(req, res, next) {
  try {
    const { ref } = req.params;
    const hospitalId = req.user.hospitalId;
    const byId = mongoose.isValidObjectId(ref)
      ? await Patient.findOne({ _id: ref, hospitalId })
          .select('patientId personalInfo photos vitals')
          .lean()
      : null;

    const byHuman = byId || await Patient.findOne({ patientId: String(ref).trim(), hospitalId })
      .select('patientId personalInfo photos vitals')
      .lean();

    if (!byHuman) return res.status(404).json({ message: 'Patient not found' });
    res.json({
  id: byHuman._id,
  patientId: byHuman.patientId,
  personalInfo: {
    firstName: byHuman.personalInfo?.firstName || '',
    lastName: byHuman.personalInfo?.lastName || '',
    age: byHuman.personalInfo?.age || null,
    gender: byHuman.personalInfo?.gender || '',
    height: byHuman.personalInfo?.height || null,
    weight: byHuman.personalInfo?.weight || null,
    phone: byHuman.personalInfo?.phone || ''
  },
  vitals: byHuman.vitals || null,   // ⭐ THIS LINE
  photos: Array.isArray(byHuman.photos) ? byHuman.photos : []
});

  } catch (e) { next(e); }
}

async function updatePatientById(req, res, next) {
  try {
    const { id } = req.params;
    const hospitalId = req.user.hospitalId;
    const { personalInfo } = req.body;

    const updates = {};
    if (personalInfo) {
      updates['personalInfo.firstName'] = String(personalInfo.firstName || '').trim();
      updates['personalInfo.lastName']  = String(personalInfo.lastName  || '').trim();
      updates['personalInfo.age']       = personalInfo.age ?? null;
      updates['personalInfo.gender']    = String(personalInfo.gender || '').trim();
      updates['personalInfo.height']    = personalInfo.height ?? null;
      updates['personalInfo.weight']    = personalInfo.weight ?? null;
      updates['personalInfo.phone']     = normalizePhone(personalInfo.phone);
    }

    const updated = await Patient.findOneAndUpdate(
      { _id: id, hospitalId },
      { $set: updates },
      { new: true }
    ).select('patientId personalInfo').lean();

    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Updated', patientId: updated.patientId });
  } catch (e) { next(e); }
};



async function updatePatientVitals(req, res) {
  try {
    const { id } = req.params;
    const { spo2, pulse, bp_sys, bp_dia } = req.body;

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.vitals = {
      spo2,
      pulse,
      bp_sys,
      bp_dia,
      recordedAt: new Date()
    };

    await patient.save();

    res.json({
      success: true,
      vitals: patient.vitals
    });

  } catch (err) {
    console.error('Vitals update error:', err);
    res.status(500).json({ message: 'Failed to update vitals' });
  }
};



module.exports = { getPatientByRef, updatePatientById ,updatePatientVitals};