import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const api = axios.create({
	baseURL: `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`,
})
console.log('axios baseURL : ', `http://${process.env.REACT_APP_API_SERVER_HOST}:${process.env.REACT_APP_API_SERVER_PORT}`);

// TYPE & INTERFACE
type postNewProjectType ={registerDate: Date, projectDate: Date } & IIdentity & INewProject;

interface IIdentity {
	mobileNumber: number | ''
	name: string
	entered: boolean
}

interface INewProject {
	registerDate: Date
	identityName: string
	identityMobileNumber: number | ''
	projectDate: Date
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

	const initialValues: {initNewProject: INewProject, } = {
		initNewProject: {
			registerDate: new Date(), 
			identityName: '',
			identityMobileNumber: '',
			projectDate: new Date(),
			projectTime: 14,
			projectHour: 1,
			projectSubject: '',
			projectDescription: '',
			bankAccount: 0,
			bankHost: '',
			bankHolderName:'' 
			},
	}

	// State
	const [ projectList, setProjectList ] = useState<null>(null);
	const [ newProject, setNewProject ] = useState<INewProject>(initialValues.initNewProject);
	const [ newProjectDate, setNewProjectDate ] = useState<Date>(new Date());

	const [ identityConfirm, setIdentityConfirm ] = useState<boolean>(false);

	const [ mobileNumberErrMsg, setMobileNumberErrMsg ] = useState<string>('숫자만 입력 해 주세요.');
	const [ nameErrMsg, setNameErrMsg ] = useState<string>('이름을 입력 해 주세요.');
	const [ subjectErrMsg, setSubjectErrMsg ] = useState<string>('제목을 입력 해 주세요.');
	const [ descriptionErrMsg, setDescriptionErrMsg ] = useState<string>('상세 설명을 조금만 입력 해 주세요.');
	const [ bankAccountErrMsg, setBankAccountErrMsg ] = useState<string>('계좌번호를 정확히 적어주세요.');
	const [ bankHostErrMsg, setBankHostErrMsg ] = useState<string>('어떤 은행인지 입력 해 주세요.');
	const [ bankHolderNameErrMsg, setBankHolderNameErrMsg ] = useState<string>('계좌 소유자를 입력 해 주세요.');

	//	프로젝트 날짜 선택은 무슨무슨 노드 모듈을 이용하는데, 간단히 사용하기 위해 따로 state값을 만들었다. 그래서 이런식의로 useEffect를 걸어준다.
	useEffect(() => {
		setNewProject({
			...newProject,
			projectDate: newProjectDate
		})
	}, [newProjectDate])

	
	// About IDENTITY
	// 타이핑 할 때마다 setter함수 실행
	const onChangeIdentity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewProject({
			...newProject,
			[name]: value,
		})

	// 이름, 전화번호 유효성 확인
		switch(name){
			case 'identityName':
				if(value.trim() === '') setNameErrMsg('이름을 입력 해 주세요.');
				else setNameErrMsg('');
				break;
			case 'identityMobileNumber':
				let haveNaN = false;
				value.split('').forEach((ele) => {
					if(isNaN(parseInt(ele))) haveNaN = true;
				})
				if(haveNaN !== false) setMobileNumberErrMsg('숫자만 입력 해 주세요.');
				if(value.length !== 11) setMobileNumberErrMsg('11자리 전화번호를 정확히 입력해 주세요.');
				if(haveNaN === false && value.length === 11) setMobileNumberErrMsg('');
			default:
				console.log('something wrong at Project.tsx');
		}
	};

	//	모든 요소가 유효한지 확인
	const onClickIsFineIdentity = (): boolean => {
		if(mobileNumberErrMsg + nameErrMsg === '') return true;
		else return false;
	}

	const identityInput = 
		<div>
			<h2>identity</h2>
			<form onSubmit={e => {e.preventDefault();}}>
				<input type="text" placeholder="name" onChange={onChangeIdentity} value={newProject.identityName} name="identityName"></input>
				<label>{nameErrMsg}</label>
				<input type="text" placeholder="mobile" onChange={onChangeIdentity} value={newProject.identityMobileNumber} name="identityMobileNumber"></input>
				<label>{mobileNumberErrMsg}</label>
				<button onClick={() => {
					if(onClickIsFineIdentity()){
						getProjectList();
						setIdentityConfirm(true);
					}else{
						setIdentityConfirm(false);
						//else의 경우를 위한 이벤트는 상시 반응형(?)으로 만들자. 말하자면 errMsg를 띄우기보단 그냥 제출 버튼에 투명도 50%를 먹이면서 클릭 자체가 안되도록 한다던가.
					}
				}}>확인</button>
			</form>
		</div>;

	// 입력된 이름, 전화번호로 등록된 projectList 받아오기
	const getProjectList = async () => {
		const response = await api.get(`/project/${newProject.identityMobileNumber}/${newProject.identityName}`);
		setProjectList(response.data);
	};

	//	About newPROJECT
	//	모든 요소가 유효한지 확인
	const onClickIsFineNewProject = (): boolean => {
		if(subjectErrMsg + descriptionErrMsg + bankAccountErrMsg + bankHostErrMsg + bankHolderNameErrMsg === '') return true;
		else return false;
	}

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

	// 적절한 형식으로 변환
	const sanitizeProjectInput = (keyword?: string) => {
		let sanitized;
		if(keyword !== undefined){
			sanitized = keyword.split(',').map(ele => {return ele.trim()}).join(', ');
			setNewProject({
				...newProject,
				projectKeyword: sanitized
			});
		}
	}

	const projectInput =
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if(!onClickIsFineNewProject()){
					//	이 경우를 위한 이벤트는 상시 반응형(?)으로 만들자. 말하자면 errMsg를 띄우기보단 그냥 제출 버튼에 투명도 50%를 먹이면서 클릭 자체가 안되도록 한다던가.
					alert('잘 입력 해줘요!!');
					return false;
				}else{
					//api.post('2');
					const result = api.post(`project`, newProject);
					console.log(result);
					//console.log('this is the END: ', newProject);
				}
			}}>
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

				<input type="text" placeholder="projectKeyword" onChange={onChangeProject} onBlur={()=>{sanitizeProjectInput(newProject.projectKeyword)}} name="projectKeyword"></input>

				<textarea placeholder="projectDescription" onChange={onChangeProject} name="projectDescription"></textarea>
				<label>{descriptionErrMsg}</label>

				<h2>about Bank</h2>
				<input type="text" placeholder="bankAccount" onChange={onChangeProject} name="bankAccount"></input>
				<label>{bankAccountErrMsg}</label>

				<input type="text" placeholder="bankHost" onChange={onChangeProject} name="bankHost"></input>
				<label>{bankHostErrMsg}</label>

				<input type="text" placeholder="bankHolderName" onChange={onChangeProject} name="bankHolderName"></input>
				<label>{bankHolderNameErrMsg}</label>

				<button type="submit">신청완료</button>
			</form>
		</div>;

	return (
		<div className="projectBoard">
			{identityConfirm ? null : identityInput}
			{identityConfirm ? <div>[{projectList}]</div> : null}
			{identityConfirm ? projectInput : null}
		</div>
	);
}
