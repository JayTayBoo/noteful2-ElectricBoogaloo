import React, { Component } from 'react';
import store from './store';


const MyContext = React.createContext({
	notes: store.notes,
	folders: store.folders,
	selectedFolderId: null,
})

console.log(MyContext._currentValue)
MyContext.displayName = 'MyContext';

export default MyContext;