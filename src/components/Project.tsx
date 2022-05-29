import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})
console.log('axios baseURL : ', `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`);

interface Iidentity {
	mobileNumber: number | '',
	name: string,
	entered: boolean
}

export const Project = () => {

	const [ identity, setIdentity ] = useState<Iidentity>({mobileNumber: '', name: '', entered: false});
	const [ projectList, setProjectList ] = useState<null>(null);

	//타이핑 할 때마다 setter함수 실행
	const onChangeIdentity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setIdentity({
			...identity,
			[name]: value,
		});
	};

	//이름, 전화번호 유효성 확인
	const checkValideIdentity = (name: string, mobileNumber: number | '') => {
		if(String(mobileNumber).length !== 11){
			alert('11자리 전화번호를 정확히 입력해 주세요.');
			return false;
		}
		let haveNaN = false;
		String(mobileNumber).split('').forEach((ele) => {
			console.log(parseInt(ele));
			if(isNaN(parseInt(ele))){
				alert('숫자만 넣어 주세요.');
				haveNaN = true;
			}
		})
		if(haveNaN !== false) return false;
		if(name.trim() === ''){
			alert('이름을 입력 해 주세요.')
			return false;
		}

		return true;
	};

	//입력된 이름, 전화번호로 등록된 projectList 받아오기
	const fetchProjectList = async () => {
		const response = await api.get(`/project/${identity.mobileNumber}/${identity.name}`);
		setProjectList(response.data);
	};

	const identityInput = 
		<div>
			<h2>identity</h2>
			<input placeholder="name" onChange={onChangeIdentity} value={identity.name} name="name"></input>
			<input placeholder="mobile" onChange={onChangeIdentity} value={identity.mobileNumber} name="mobileNumber"></input>
			<button onClick={() => {
				if(checkValideIdentity(identity.name, identity.mobileNumber)){
					fetchProjectList();
					setIdentity({
						...identity,
						entered: true
					});
					console.log('identity validation success');
				}
			}}>확인</button>
		</div>;
	const projectInput =
		<div>
			<h2>about project</h2>
			<input placeholder="project_datetime"></input>
			<input placeholder="subject"></input>
			<input placeholder="project_keyword"></input>
			<input placeholder="project_description"></input>
			<h2>about bank account</h2>
			<input placeholder="bank_account"></input>
			<input placeholder="bank_host"></input>
			<input placeholder="bank_holder_name"></input>
		</div>;

	return (
		<div className="projectBoard">
			{identity.entered ? null : identityInput}
			{identity.entered ? <div>[{projectList}]</div> : null}
			{identity.entered ? projectInput : null}
		</div>
	);
}
