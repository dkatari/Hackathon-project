var mysql = require('mysql2/promise');

var pool = mysql.createPool({
    connectionLimit: 4,
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "exam_assistance"
});

async function getSubjects() {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM Subjects");
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving subjects');
    }
}

async function getSubjectsByName(name) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM Subjects WHERE subject_name LIKE ?", ['%' + name + '%']);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving subjects by name');
    }
}

async function getNotesBySubjectId(subjectId) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM Notes WHERE subject_id = ?", [subjectId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving notes by subject ID');
    }
}

async function getSyllabusBySubjectId(subjectId) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM Syllabus WHERE subject_id = ?", [subjectId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving syllabus by subject ID');
    }
}

async function getTextBooksBySubjectId(subjectId) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM TextBooks WHERE subject_id = ?", [subjectId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving textbooks by subject ID');
    }
}

async function getinfoByName(name) {
    try {
        // Get subjects by name
        const [subjectRows, subjectFields] = await pool.query("SELECT * FROM Subjects WHERE subject_name LIKE ?", ['%' + name + '%']);

        // Array to store results
        const results = [];

        // Iterate over each subject to get related notes, syllabus, and textbooks
        for (const subject of subjectRows) {
            // Get notes for the current subject
            const [noteRows, noteFields] = await pool.query("SELECT * FROM Notes WHERE subject_id = ?", [subject.subject_id]);

            // Get syllabus for the current subject
            const [syllabusRows, syllabusFields] = await pool.query("SELECT * FROM Syllabus WHERE subject_id = ?", [subject.subject_id]);

            // Get textbooks for the current subject
            const [textbookRows, textbookFields] = await pool.query("SELECT * FROM TextBooks WHERE subject_id = ?", [subject.subject_id]);

            // Push the subject along with its related data to the results array
            results.push({
                subject: subject,
                notes: noteRows,
                syllabus: syllabusRows,
                textbooks: textbookRows
            });
        }

        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving subjects by name');
    }
}

module.exports = {
    getSubjects,
    getSubjectsByName,
    getNotesBySubjectId,
    getSyllabusBySubjectId,
    getTextBooksBySubjectId,
    getinfoByName
};
