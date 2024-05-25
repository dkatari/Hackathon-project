var express = require('express');
var db = require("./database")

async function getSubjects(req, res) {
  try {
    let subjects = await db.getSubjects()
    res.json(subjects)
  } catch (err) {
    res.status(500).send("Error: " + err.message)
  }
}

async function getSubjectsByName(req, res) {
  try {
    let subjects = await db.getSubjectsByName(req.query.name)
    res.json(subjects)
  } catch (err) {
    res.status(500).send("Error: " + err.message)
  }
}

async function getNotesBySubjectId(req, res) {
  try {
    let notes = await db.getNotesBySubjectId(req.params.subjectId)
    res.json(notes)
  } catch (err) {
    res.status(500).send("Error: " + err.message)
  }
}

async function getSyllabusBySubjectId(req, res) {
  try {
    let syllabus = await db.getSyllabusBySubjectId(req.params.subjectId)
    res.json(syllabus)
  } catch (err) {
    res.status(500).send("Error: " + err.message)
  }
}

async function getTextBooksBySubjectId(req, res) {
  try {
    let textbooks = await db.getTextBooksBySubjectId(req.params.subjectId)
    res.json(textbooks)
  } catch (err) {
    res.status(500).send("Error: " + err.message)
  }
}


async function getinfoByName(req, res) {
  try {
    // Get the name from the query parameter
    const name = req.query.name;

    // Call the database function to retrieve subject info by name
    const subjectInfo = await db.getinfoByName(name);

    // Check if subject info was found
    if (subjectInfo.length > 0) {
      res.json(subjectInfo);
    } else {
      res.status(404).send("No subjects found with the given name");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getinfoByName
};



module.exports = {
  getSubjects,
  getSubjectsByName,
  getNotesBySubjectId,
  getSyllabusBySubjectId,
  getTextBooksBySubjectId,
  getinfoByName
};
