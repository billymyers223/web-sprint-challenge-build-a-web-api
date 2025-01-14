// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const { validateActId, validateActBody } = require("./actions-middlware");
router.get("/", (req, res, next) => {
    Actions.get()
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch(err =>{
          next(err)
      });
  });


router.get("/:id", validateActId, (req, res, next) => {
    Actions.get(req.params.id)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch(next);
});

router.post("/", validateActBody, (req, res, next) => {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch(next);
});

router.put("/:id", validateActId, (req, res, next) => {
    if(req.body.completed){
        Actions.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json(req.body);
          })
          .catch((err) => {
            next(err);
          });
    }else{
        res.status(400).json({ message: "Try again will all forms filled" });
    }

});

router.delete("/:id", validateActId, (req, res, next) => {
    Actions.remove(req.params.id)
      .then(() => {
        res.status(200).json();
      })
      .catch(next);
});

  module.exports = router;  
