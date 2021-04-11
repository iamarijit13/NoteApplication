const chalk = require('chalk');
//const { countReset } = require('node:console');
const yargs = require('yargs');
const notes = require('./notes.js');

//Crate 'add' command.
yargs.command({
    command:'add',
    describe:'Add Notes.',
    builder:{
        title:{
            describe:'Note Title.',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note Body.',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
    {
        notes.addNotes(argv.title, argv.body);
        //console.log(argv);
    }
})


//Create 'remove' command.
yargs.command({
    command:'remove',
    describe:'Remove Notes.',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
    {
        notes.removeNotes(argv.title);
    }
})

//Create 'list' command.
yargs.command({
    command:'list',
    describe:'List the Notes.',
    handler(argv)
    {
       notes.listNotes();
    }
})

//Create 'read' command.
yargs.command({
    command:'read',
    describe:'Reads Notes.',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
    },
    handler(argv)
    {
        notes.readNotes(argv.title);
    }
})

yargs.parse();

//console.log(yargs.argv);

