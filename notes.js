const fs = require('fs');
const chalk = require('chalk');

//Function for Adding Notes.
const addNotes = (title, body)=>{
    const notes = loadNotes();
    const duplicate = notes.find((note)=> note.title === title)

    if(!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);

        console.log(chalk.green.inverse("Note added successfully."));
    }
    else{
        console.log(chalk.red.inverse("Note Title,'%s' is already taken.", title));
    }
    
}

//Function for Liosting all Notes.
const listNotes = (title, body)=>{
    const notes = loadNotes();
    if(notes.length !== 0)
    {
        console.log(chalk.green.inverse("List of Title : "));
        notes.forEach((element) => {
            console.log(chalk.green.underline(element.title));
        });
    }
    else{
        console.log(chalk.red.inverse("List is empty."));
    }
      
}

//Function for Reading Notes.
const readNotes = (title)=>{
    const notes = loadNotes();
    const noteToRead = notes.find((note)=> note.title === title)
   
    if(!noteToRead){
        console.log(chalk.red.inverse("The note doesent exist."));
    }
    else{
        console.log(chalk.white.inverse("your Requested Note : "));
        console.log(chalk.green("Title : ") + noteToRead.title);
        console.log(chalk.green("Body : ") + noteToRead.body);
    }
}

//Function for Removing Notes.
const removeNotes = (title)=>{
    const notes = loadNotes();
    
    const notesToKeep = notes.filter((note)=> note.title !== title )
    
    if(notes.length > notesToKeep.length)
    {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note with title, '%s' is removed.",title));
    }
    else{
        console.log(chalk.red.inverse("Note with title, '%s' is not in the Notes.",title));
    }
    
}

//Function for Loading Notes for internal functions.
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const stringFile = dataBuffer.toString();
        return JSON.parse(stringFile);
    }catch(e){
        return [];
    }
}

//Function for Saving Notes for internal functions.
const saveNotes = (notes)=>{
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',notesJson);
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}