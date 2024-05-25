const express = require('express');
const restHandlers = require('./resthandlers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get('/subjects', restHandlers.getSubjects);
app.get('/subjects/search', restHandlers.getSubjectsByName);
app.get('/subjects/:subjectId/notes', restHandlers.getNotesBySubjectId);
app.get('/subjects/:subjectId/syllabus', restHandlers.getSyllabusBySubjectId);
app.get('/subjects/:subjectId/textbooks', restHandlers.getTextBooksBySubjectId);
app.get('/subjectsinfo/search', restHandlers.getinfoByName);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
