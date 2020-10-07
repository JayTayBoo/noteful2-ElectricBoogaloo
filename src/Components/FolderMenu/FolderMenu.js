import React, { Component } from 'react';
import FolderCard from '../FolderCard/FolderCard';
import './FolderMenu.css';
import MyContext from '../../MyContext';

// FolderMenu.defaultProps = {
// 	folders: [],
// 	selectedFolderId: null
// }

export default class FolderMenu extends Component {
	static contextType = MyContext;
  render() {
    // const displayFolders = props.folders.map( folder =>
    // <FolderCard key={folder.id} name={folder.name} folderId={folder.id} onFolderClick={props.onFolderClick} selected={folder.id === props.selectedFolderId}/>
    // );
    return (
         <div className='folder-menu'>
		   {/* <ul>{displayFolders}</ul> */}
           <button>Add Folder</button>
         </div>
    );
  }
}
