import React, { useState, useEffect } from 'react';
import { IdentityInput, ProjectInput, ProjectList } from './Element';
import './Speak.css';

// TYPE & INTERFACE
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
	bankAccount: number | ''
	bankHost: string
	bankHolderName: string
}

type modeType = 'identityInput' | 'getProjectList' | 'createNewProjectInput' | 'updateProject';

interface IProject {
	attendee_id: string | null 
	attendee_messsage: string | null
	bank_account: number
	bank_holder_name: string
	bank_host: string
	confirmatory: number | null
	confirmatory_log: string | null
	id: number
	mobile_number: string
	name: string
	project_date: string
	project_description: string
	project_hour: number
	project_keyword: string
	project_subject: string
	project_time: number
	registered_datetime: string
	visited: number | null
}

export const Speak = () => {

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
			bankAccount: '',
			bankHost: '',
			bankHolderName:'' 
			},
	}

	const [ mode, setMode ] = useState<modeType>('identityInput');
	const [ projectList, setProjectList ] = useState<IProject[] | null>(null);
	const [ newProject, setNewProject ] = useState<INewProject>(initialValues.initNewProject);
	const [ isIdentified, setIsIdentified ] = useState(false);
	const [ classNames, setClassNames ] = useState<'speaker_identity' | 'speaker_project'>('speaker_identity');
	const [ whatToUpdate, setWhatToUpdate ] = useState<IProject | null>(null);

	useEffect(() => {
		if(projectList !== null) setIsIdentified(true);
	}, [projectList])

	//	그냥 경우에 따라 className바꿔주는 것. 
	useEffect(() => {
		if(isIdentified){
			setClassNames('speaker_project');
			setMode('getProjectList');
		}
		else setClassNames('speaker_identity');
	}, [isIdentified])

	let article = null;

	switch (mode){
		case 'identityInput':
			article = <IdentityInput newProject={newProject} setNewProject={setNewProject} setProjectList={setProjectList}></IdentityInput>;
			break;
		case 'getProjectList':
			article = <ProjectList projectList={projectList} whoami={{name: newProject.identityName, mobileNumber: newProject.identityMobileNumber}} setMode={setMode} setWhatToUpdate={setWhatToUpdate}></ProjectList>;
			break;
		case 'createNewProjectInput':
			article = <ProjectInput mode={'create'} newProject={newProject} setNewProject={setNewProject}></ProjectInput>;
			break;
		case 'updateProject':
			article = <ProjectInput mode={'update'} whatToUpdate={whatToUpdate} newProject={newProject} setNewProject={setNewProject}></ProjectInput>;
			break;
	}

	return (
		<div className={classNames}>
			{article}
		</div>
	);
}
