import React, { useState, useEffect } from 'react';
import './Element.css';

export const Login = () => {
	return (
		<div className="adminElementLogin">
			<input placeholder="login_id"></input>
			<button>login</button>
			<p>It lasts for 1 hour.</p>
		</div>
	);
}

export const Register = () => {
	return (
		<div className="adminElementRegister">
			<input placeholder="login_id"></input>
			<input placeholder="login_id again"></input>
			<input placeholder="nickname"></input>
			<button></button>
		</div>
	);
}

export const Identity = () => {
	return (
		<div className="adminElementIdentity">
			<p>//nickname// : welcome, how's it going? :D</p>
			<button>logout</button>
			<button>deregister</button>
		</div>
	);
}

export const StateTaps = () => {
	return (
		<div className="adminElementStateTaps">
			<button>confirm</button>
			<button>pending</button>
			<button>cancel</button>
		</div>
	);
}

export const CalendarFormat = () => {
	return (
		<div className="adminElementCalendarFormat">
			I am a calendar.
		</div>
	);
}

export const DiagramFormat = () => {
	return (
		<div className="adminElementDiagramFormat">
			I am a diagram.
		</div>
	);
}

export const TextTalbeFormat = () => {
	return (
		<div className="adminElementTextTableFormat">
			I am Text Table.
		</div>
	);
}

export const DetailPage = () => {
	return (
		<div className="adminElementDetailPage">
			I am detail Page.
		</div>
	);
}

export const CommentTextarea = () => {
	return (
		<div className="adminElementCommentTextarea">
			I am commoent text area.
		</div>
	);
}

export const PrivateNoteTextarea = () => {
	return (
		<div className="adminElementPrivateNoteTextarea">
			I am private note text area.
		</div>
	);
}

