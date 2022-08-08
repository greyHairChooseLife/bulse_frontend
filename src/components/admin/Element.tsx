import React, { useState, useEffect } from 'react';
import './Element.css';
import axios from 'axios';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})

interface IloginProps {
	nickname: string
	setWhoami: any
	setMode: any
}
export const Login = (props: IloginProps) => {

	const onSubmitLogin = async (e: any) => {
		const answer = await api.post('/admin', {proposed: e.target.input.value});
		if(answer.data.msg === 'login success'){
			props.setWhoami(answer.data.value);
			props.setMode('content');
		}else{
			alert(answer.data.msg);
		}
	}

	return (
		<div className="adminElementLogin">
			<p>{props.nickname}님 안녕하세요!!</p>
			<p>로그인 하시면 1시간 동안 유지됩니다.</p>
			<form onSubmit={e => {
				e.preventDefault();
				onSubmitLogin(e);
				}}>
				<input placeholder="로그인 아이디" name="input"></input>
				<button>로그인</button>
			</form>
		</div>
	);
}

export const Register = () => {
	return (
		<div className="adminElementRegister">
			<input placeholder="login_id"></input>
			<input placeholder="login_id again"></input>
			<input placeholder="nickname"></input>
			<button>계정 생성</button>
		</div>
	);
}

interface IidentityProps {
	whoami: any
	setMode: any
}
export const Identity = (props: IidentityProps) => {
	const onLogOut = () => {
		props.setMode('login');
	}
	const onDeregister = () => {
		if(confirm('정말로 탈퇴하시겠습니까?')){
			api.put('/admin', {id: props.whoami.id});
			props.setMode('register');
		}
	}
	return (
		<div className="adminElementIdentity">
			<p>welcome {props.whoami.nickname}, how's it going? :D</p>
			<button onClick={onLogOut}>logout</button>
			<button onClick={onDeregister}>deregister</button>
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

