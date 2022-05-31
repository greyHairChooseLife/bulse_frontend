import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})
console.log('axios baseURL : ', `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`);

interface IIdentity {
	mobileNumber: number | ''
	name: string
	entered: boolean
}

interface INewProject {
	projectTime: number
	projectHour: number 
	projectSubject: string
	projectKeyword?: string
	projectDescription: string
	bankAccount: number
	bankHost: string
	bankHolderName: string
}

export const Project = () => {

	const [ identity, setIdentity ] = useState<IIdentity>({mobileNumber: '', name: '', entered: false});
	const [ projectList, setProjectList ] = useState<null>(null);
	const [ newProject, setNewProject ] = useState<INewProject>({
		projectTime: 14,
		projectHour: 1,
		projectSubject: '',
		projectDescription: '',
		bankAccount: 0,
		bankHost: '',
		bankHolderName:'' 
	});
	const [ newProjectDate, setNewProjectDate ] = useState<Date>(new Date());

	const [ mobileNumberErrMsg, setMobileNumberErrMsg ] = useState<string>('숫자만 입력 해 주세요.');
	const [ nameErrMsg, setNameErrMsg ] = useState<string>('이름을 입력 해 주세요.');

	const [ subjectErrMsg, setSubjectErrMsg ] = useState<string>('제목을 입력 해 주세요.');
	const [ descriptionErrMsg, setDescriptionErrMsg ] = useState<string>('상세 설명을 조금만 입력 해 주세요.');
	const [ bankAccountErrMsg, setBankAccountErrMsg ] = useState<string>('계좌번호를 정확히 적어주세요.');
	const [ bankHostErrMsg, setBankHostErrMsg ] = useState<string>('어떤 은행인지 입력 해 주세요.');
	const [ bankHolderNameErrMsg, setBankHolderNameErrMsg ] = useState<string>('계좌 소유자를 입력 해 주세요.');


	// About IDENTITY
	// 타이핑 할 때마다 setter함수 실행
	const onChangeIdentity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setIdentity({
			...identity,
			[name]: value,
		});
		
		switch(name){
			case 'name':
				if(value.trim() === '') setNameErrMsg('이름을 입력 해 주세요.');
				else setNameErrMsg('good');
				break;
			case 'mobileNumber':
				let haveNaN = false;
				value.split('').forEach((ele) => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false) setMobileNumberErrMsg('숫자만 입력 해 주세요.');
				if(value.length !== 11) setMobileNumberErrMsg('11자리 전화번호를 정확히 입력해 주세요.');
				if(haveNaN === false && value.length === 11) setMobileNumberErrMsg('good');
			default:
				console.log('something wrong at Project.tsx');
		}
	};

	// 이름, 전화번호 유효성 확인
	const checkValideIdentity = (name: string, mobileNumber: number | ''): boolean => {
		if(String(mobileNumber).length !== 11){
			alert('11자리 전화번호를 정확히 입력해 주세요.');
			return false;
		}
		let haveNaN = false;
		String(mobileNumber).split('').forEach((ele) => {
			console.log(parseInt(ele));
			if(isNaN(parseInt(ele))) haveNaN = true;
		})
		if(haveNaN !== false){
			alert(' 넣어 주세요.');
			return false;
		}
		if(name.trim() === ''){
			alert('이름을 입력 해 주세요.')
			return false;
		}

		return true;
	};

	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	const getProjectList = async () => {
		const response = await api.get(`/project/${identity.mobileNumber}/${identity.name}`);
		setProjectList(response.data);
	};

	const identityInput = 
		<div>
			<h2>identity</h2>
			<input type="text" placeholder="name" onChange={onChangeIdentity} value={identity.name} name="name"></input>
			<label>{nameErrMsg}</label>
			<input type="text" placeholder="mobile" onChange={onChangeIdentity} value={identity.mobileNumber} name="mobileNumber"></input>
			<label>{mobileNumberErrMsg}</label>
			<button onClick={() => {
//				if(checkValideIdentity(identity.name, identity.mobileNumber)){
//					getProjectList();
//					setIdentity({
//						...identity,
//						entered: true
//					});
//					console.log('identity validation success');
//				}
			}}>확인</button>
		</div>;

	// 타이핑 할 때마다 setter함수 실행
	const onChangeProject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNewProject({
			...newProject,
			[name]: value,
		});

		//	에러메시지 핸들링
		switch (name){
			case 'projectSubject':
				console.log('so..: ', value.trim());
				if(value.trim() !== '') setSubjectErrMsg('');
				else setSubjectErrMsg('제목을 입력 해 주세요.');
				break;
			case 'projectDescription':
				console.log('so..: ', value.trim());
				if(value.trim() !== '') setDescriptionErrMsg('');
				else setDescriptionErrMsg('상세 설명을 조금만 입력 해 주세요.');
				break;
			case 'bankAccount':
				console.log('so..: ', value.trim());
				let haveNaN = false;
				value.split('').forEach(ele => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false || parseInt(value) === 0) setBankAccountErrMsg('계좌번호를 정확히 적어주세요.');
				else setBankAccountErrMsg('');
				break;
			case 'bankHost':
				console.log('so..: ', value.trim());
				if(value.trim() !== '') setBankHostErrMsg('');
				else setBankHostErrMsg('어떤 은행인지 입력 해 주세요.');
				break;
			case 'bankHolderName':
				console.log('so..: ', value.trim());
				if(value.trim() !== '') setBankHolderNameErrMsg('');
				else setBankHolderNameErrMsg('계좌 소유자를 입력 해 주세요.');
				break;
		}
	};

//			<button onClick={async () => {
//				const form: {sanitizing: ISanitizeNewProject, posting: IPostNewProject} = {
//					sanitizing: {
//						keyword: newProject.projectKeyword,
//					},
//					posting: {
//						readyToPost: false,
//						identity: identity,
//						newProject: newProject,
//						newProjectDate: newProjectDate
//					}
//				}
//				console.log('validaty confirmed');
//				sanitizeProjectInput(form.sanitizing).then(() => console.log(newProject))
//			}}>신청완료</button>

	//
	// 적절한 형식으로 변환
	interface ISanitizeNewProject {
		keyword?: string
	}
	const sanitizeProjectInput = async (form: ISanitizeNewProject) => {
		const {keyword} = form;
		let sanitized;
		if(keyword !== undefined){
			sanitized = keyword.split(',').map(ele => {return ele.trim()}).join(', ');
		}
		setNewProject({
			...newProject,
			projectKeyword: sanitized
		});
	}
	
	// 
	interface IPostNewProject {
		readyToPost: boolean
		identity: IIdentity
		newProject: INewProject
		newProjectDate: Date
	}
	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	// const postNewProject = () => { api.post() }

	const projectInput =
		<div>
			<h2>about Project</h2>
			<Calendar defaultValue={new Date()} minDate={new Date()} onChange={setNewProjectDate} value={newProjectDate}></Calendar>
			<select size={1} onChange={onChangeProject} name="projectTime">
				<option value="14">오후 2시</option>
				<option value="15">오후 3시</option>
				<option value="16">오후 4시</option>
				<option value="17">오후 5시</option>
				<option value="18">오후 6시</option>
				<option value="19">오후 7시</option>
				<option value="20">오후 8시</option>
				<option value="21">오후 9시</option>
				<option value="22">오후 10시</option>
			</select>
			<select size={1} onChange={onChangeProject} name="projectHour">
				<option value="1">1시간</option>
				<option value="2">2시간</option>
			</select>
			<input type="text" placeholder="projectSubject" onChange={onChangeProject} name="projectSubject"></input>
			<label>{subjectErrMsg}</label>

			<input type="text" placeholder="projectKeyword" onChange={onChangeProject} name="projectKeyword"></input>

			<textarea placeholder="projectDescription" onChange={onChangeProject} name="projectDescription"></textarea>
			<label>{descriptionErrMsg}</label>

			<h2>about Bank</h2>
			<input type="text" placeholder="bankAccount" onChange={onChangeProject} name="bankAccount"></input>
			<label>{bankAccountErrMsg}</label>

			<input type="text" placeholder="bankHost" onChange={onChangeProject} name="bankHost"></input>
			<label>{bankHostErrMsg}</label>

			<input type="text" placeholder="bankHolderName" onChange={onChangeProject} name="bankHolderName"></input>
			<label>{bankHolderNameErrMsg}</label>

			<button onClick={() => {
			}}>신청완료</button>
		</div>;

	return (
		<div className="projectBoard">
			{identity.entered ? null : identityInput}
			{identity.entered ? <div>[{projectList}]</div> : null}
			{identity.entered ? projectInput : null}
		</div>
	);
}
