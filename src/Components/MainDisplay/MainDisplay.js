import React, { Component } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './MainDisplay.css';
import MyContext from '../../MyContext';


// relies on NotesToBeDisplayed
function MainDisplay (props){
	console.log(props)
	const displayNotes = []//props.notesToBeDisplayed().map(note =>
	// <NoteCard key={note.id} noteId={note.id} name={note.name} modified={note.modified}/>
	// )};

	return (
		<div className="main-display">
			<ul>
			{displayNotes}
			</ul>
			<button>
				Add Note
			</button>
		</div>
	);
}

export default MainDisplay;

// static contextType = MyContext;
// render(){
// 	const {notes} = this.context
// 	console.log({notes})
// console.log(this.context.notes)
// const displayNotes = console.log(this.context.folders) 