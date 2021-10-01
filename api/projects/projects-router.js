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
      .catch(next);
});

router.put("/:id", validateProjId, validateProjBody, (req, res) => {
    Projects.update(req.params.id, req.body)
      .then(proj => {
        res.status(200).json(proj)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  })

router.post('/', validateProjBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(proj => {
            res.status(201).json(proj);
        })
        .catch(err => {
            next(err);
        });
});



router.delete("/:id", validateProjId, (req, res, next) => {
    Projects.remove(req.params.id)
      .then(() => {
        res.status(200).json();
      })
      .catch(next);
});


router.get('/:id/actions', validateProjId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(proj =>{
            res.status(200).json(proj);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;