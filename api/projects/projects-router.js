// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const { validateProjId, validateProjBody } = require('./projects-middleware')
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projs => {
            res.status(200).json(projs);
        })
        .catch(error => {
            next(error);
        });
});

router.get("/:id", validateProjId, (req, res, next) => {
    Projects.get(req.params.id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch(err =>{
          next(err)
        });
});

router.post('/', validateProjBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(proj => {
            res.status(201).json(proj);
        })
        .catch(err => {
            next(err);
        });
});




module.exports = router;