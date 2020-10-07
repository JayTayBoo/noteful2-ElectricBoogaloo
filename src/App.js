import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderMenu from './Components/FolderMenu/FolderMenu';
import MainDisplay from './Components/MainDisplay/MainDisplay';
import SingleNoteDisplay from './Components/SingleNoteDisplay/SingleNoteDisplay';
import MyContext from './MyContext';
// const MyContext = React.createContext();

// class MyProvider extends Component {
// 	state = {
// 		notes: this.props.notes,
// 		folders: this.props.folders,
// 		selectedFolderId: null,
// 	}

// 	render() {
// 		return (
// 			<MyContext.Provider>
// 				{this.props.children}
// 			</MyContext.Provider>
// 		)
// 	}
// }

class App extends Component {
	static defaultProps = {
		notes: [],
		folders: [],
	}

setSelectedFolderId = (id) => {console.log('updated state in set'); MyContext._currentValue.selectedFolderId({ selectedFolderId: id });}
viewAll = () => {MyContext._currentValue.selectedFolderId({ selectedFolderId: null });}
notesToBeDisplayed = () => {return MyContext._currentValue.selectedFolderId ? MyContext._currentValue.notes.filter(note => note.folderId === MyContext._currentValue.selectedFolderId) : MyContext._currentValue.notes;}

	render() {
		const value = {
			notes: MyContext._currentValue.notes,
			folders: MyContext._currentValue.folders,
			selectedFolderId: MyContext._currentValue.selectedFolderId
		}
		//console.log(value.notes)
		return (
			<MyContext.Provider value={value}>
				<div className="App">
					<header className="App-header">
						<Link to="/"><h1>Noteful</h1></Link>
					</header>
					<div className='flex-container'>
						<Route exact path="/"
							render={() => <FolderMenu 
								onFolderClick={this.setSelectedFolderId}
								folders={value.folders}
								selectedFolderId={value.selectedFolderId} />} />

						<Route exact path="/"
							render={() => { if (value.selectedFolderId) this.viewAll(); return <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed(value.notes)} /> }} />

						<Route path='/folder/:folderId'
							render={() => <FolderMenu
								onFolderClick={this.setSelectedFolderId}
								folders={value.folders}
								selectedFolderId={value.selectedFolderId} />}
						/>
						<Route path='/folder' render={() => <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed} />} />

						<Route path='/note/:noteId' render={({ match, history }) => <SingleNoteDisplay match={match} folders={value.folders} notes={value.notes} goBack={history.goBack} />} />
					</div>
				</div>
			</MyContext.Provider>
		);
	}
}

export default App;
