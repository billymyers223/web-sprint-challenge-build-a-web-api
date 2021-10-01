// add middlewares here related to actions
const Actions = require("./actions-model");

function validateActId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
      .then((possibleProject) => {
        if (!possibleProject) {
            next({ message: "Action with that ID not found", status: 404 });
        } else {
            req.user = possibleProject;
            next();
        }
      })
      .catch(next);
}

function validateActBody(req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        next({ status: 400, message: "Please input all text" });
      } else {
        next();
      }
}

  module.exports = { validateActId, validateActBody };