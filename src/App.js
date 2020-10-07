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

setSelectedFolderId = (id) => {console.log('updated state in set'); this.setState({ selectedFolderId: id });}
viewAll = () => {this.setState({ selectedFolderId: null });}
notesToBeDisplayed = () => {return this.context.selectedFolderId ? this.context.notes.filter(note => note.folderId === this.context.selectedFolderId) : this.state.notes;}

	render() {
		return (
			<MyContext.Provider>
				<div className="App">
					<header className="App-header">
						<Link to="/"><h1>Noteful</h1></Link>
					</header>
					<div className='flex-container'>
						<Route exact path="/"
							render={() => <FolderMenu 
								onFolderClick={this.setSelectedFolderId}
								folders={this.context.folders}
								selectedFolderId={this.context.selectedFolderId} />} />

						<Route exact path="/"
							render={() => { if (this.context.selectedFolderId) this.viewAll(); return <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed} /> }} />

						<Route path='/folder/:folderId'
							render={() => <FolderMenu
								onFolderClick={this.setSelectedFolderId}
								folders={this.context.folders}
								selectedFolderId={this.context.selectedFolderId} />}
						/>
						<Route path='/folder' render={() => <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed} />} />

						<Route path='/note/:noteId' render={({ match, history }) => <SingleNoteDisplay match={match} folders={this.state.folders} notes={this.state.notes} goBack={history.goBack} />} />
					</div>
				</div>
			</MyContext.Provider>
		);
	}
}

export default App;
