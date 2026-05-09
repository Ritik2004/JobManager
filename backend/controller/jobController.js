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
      job_url: body.job_url,
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

export const updateJob = async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  try{
      const job = await Job.findById(id);
      if(!job){
        return res.status(404).json({
          msg: "Job not found",
        });
      }
      const updatedjob = await Job.findByIdAndUpdate(
        id,
        body,
        {
          new:true,
          runValidators:true,
        }
      )
      return res.status(200).json({
        msg: "Job updated successfully",
        data: updatedjob
      });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      msg: "Failed in updating job post",
    });
  }
}

export const deleteJob = async (req, res) => {
  const {id} = req.params;
  try{
    const job = await Job.findByIdAndDelete(id);
    if(!job){
      return res.status(404).json({
        msg: "Job not found",
      });
    }
    return res.status(200).json({
      msg: "Job deleted successfully",
    });
 
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      msg: "Failed in deleting job post",
    });
  }
}