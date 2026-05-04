import Job from "../models/JobData.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    return res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to fetch jobs",
    });
  }
};

export const createJobs = async (req, res) => {
  const body = req.body;

  // validation
  if (!body.company || !body.role) {
    return res.status(400).json({
      msg: "Company and role are required",
    });
  }

  try {
    const data = await Job.create({
      company: body.company,
      role: body.role,
      status: body.status,
      notes: body.notes,
    });

    return res.status(201).json({
      msg: "Job created successfully",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      msg: "Failed in creating job post",
    });
  }
};