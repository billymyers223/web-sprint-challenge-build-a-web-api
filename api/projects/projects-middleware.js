// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then((possibleProject) => {
        if (!possibleProject) {
            next({ message: "Project with that ID not found", status: 404 });
        } else {
            req.user = possibleProject;
            next();
        }
      })
      .catch(next);
  }

  function validateProjBody(req, res, next) {
    const {name, description} = req.body 
    if(!name || !description) {
      res.status(400).json({
        message: "missing required name and description fields"
      })
    } else {
      next()
    }
  }
  module.exports ={validateProjId, validateProjBody}