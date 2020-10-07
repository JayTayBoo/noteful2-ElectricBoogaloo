import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderMenu from './Components/FolderMenu/FolderMenu';
import MainDisplay from './Components/MainDisplay/MainDisplay';
import SingleNoteDisplay from './Components/SingleNoteDisplay/SingleNoteDisplay';

const MyContext = React.createContext();

class MyProvider extends Component {
	state = {
		notes: this.props.notes,
		folders: this.props.folders,
		selectedFolderId: null,
		setSelectedFolderId: setSelectedFolderId = (id) => {console.log('updated state in set'); this.setState({ selectedFolderId: id });},
		viewAll: viewAll = () => {this.setState({ selectedFolderId: null });},
		notesToBeDisplayed: notesToBeDisplayed = () => {return this.state.selectedFolderId ? this.state.notes.filter(note => note.folderId === this.state.selectedFolderId) : this.state.notes;}
	}

	render() {
		return (
			<MyContext.Provider >
				{this.props.children}
			</MyContext.Provider>
		)
	}
}

class App extends Component {
	static defaultProps = {
		notes: [],
		folders: [],
	}

	render() {
		return (
			<MyProvider>
				<div className="App">
					<header className="App-header">
						<Link to="/"><h1>Noteful</h1></Link>
					</header>
					<div className='flex-container'>
						<Route exact path="/"
							render={() => <FolderMenu
								//onFolderClick={this.setSelectedFolderId}
								//folders={this.state.folders}
								selectedFolderId={this.state.selectedFolderId} />} />

						<Route exact path="/"
							render={() => { if (this.state.selectedFolderId) this.viewAll(); return <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed} /> }} />

						<Route path='/folder/:folderId'
							render={() => <FolderMenu
								onFolderClick={this.setSelectedFolderId}
								folders={this.state.folders}
								selectedFolderId={this.state.selectedFolderId} />}
						/>
						<Route path='/folder' render={() => <MainDisplay notesToBeDisplayed={this.notesToBeDisplayed} />} />

						<Route path='/note/:noteId' render={({ match, history }) => <SingleNoteDisplay match={match} folders={this.state.folders} notes={this.state.notes} goBack={history.goBack} />} />
					</div>
				</div>
			</MyProvider>
		);
	}
}

export default App;
