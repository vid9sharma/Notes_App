const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title already exists!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notesToKeep.length == notes.length) {
        console.log(chalk.red.inverse('No note found!'));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.cyanBright.underline.bold('Your Notes:'))
    notes.forEach((note) => {
        console.log(chalk.cyanBright(note.title));
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const readNote = notes.find((note) => note.title === title);

    if (readNote) {
        console.log(chalk.bold.yellow.underline('Title: ' + readNote.title));
        console.log(readNote.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    readNotes: readNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};