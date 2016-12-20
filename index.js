import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import ReactDom from 'react-dom';

window.ReactDom = ReactDom;
window.React = React;

import Layout from './src/containers/LayoutContainer'
import LayoutSignup from './src/containers/LayoutSignup'
import LayoutLogin from './src/containers/LayoutLogin'
import LayoutForgetpwd from './src/containers/LayoutForgetpwd'
import LayoutResetpwd from './src/containers/LayoutResetpwd'
import LayoutFindMyOrg from './src/containers/LayoutFindMyOrg'
import LayoutProject from './src/containers/LayoutProject'

import DashboardContainer from './src/containers/DashboardContainer'
// import OrganizationList from './src/containers/OrganizationListContainer'
import OrganizationUsers from './src/containers/OrganizationUsersContainer'

// import OrganizationCompanies from './src/containers/OrganizationCompaniesContainer'
import TaskList from './src/containers/TaskListContainer'
import TagList from './src/containers/TagListContainer'
import OrganizationGeneral from './src/containers/OrganizationGeneralContainer'

import Subscription from './src/containers/SubscriptionContainer'

import PageDemo from './src/containers/LayoutDemo'

import PageTask from './src/containers/PageTask'

import CompaniesLogos from './src/containers/OrganizationLogosContainer'

import ProjectsContainer from './src/containers/ProjectsContainer'
import ProjectOverviewContainer from './src/containers/ProjectOverviewContainer'
import ProjectMessagesContainer from './src/containers/ProjectMessagesContainer'
import ProjectMessageContainer from './src/containers/ProjectMessageContainer'
// import ProjectMessageCreateContainer from './src/containers/ProjectMessageCreateContainer'
import ProjectFilesContainer from './src/containers/ProjectFilesContainer'
import ProjectFileContainer from './src/containers/ProjectFileContainer'
import ProjectPeopleContainer from './src/containers/ProjectPeopleContainer'
import ProjectTaskListsContainer from './src/containers/ProjectTaskListsContainer'
import ProjectTaskContainer from './src/containers/ProjectTaskContainer'
import ProjectTaskListContainer from './src/containers/ProjectTaskListContainer'

import LayoutTaskTemplate from './src/containers/LayoutTaskTemplate'
import ProjectTaskListsTemplateContainer from './src/containers/ProjectTaskListsTemplateContainer'


import configureStore from './src/store/configureStore.dev.js';

import {store} from './src/store/index.js';
// const store = configureStore();
// window.store = store;

import {ROOT_HOST} from './src/config.js'

import Auth from './src/helpers/auth.js'
import RequireAuth from './src/containers/RequireAuth';

import Localstore from './src/helpers/localstore.js'


import {language} from './src/lang/index.js';
window.lang = language.en;


import {
	OrganizationListContainer,
	CompanyOverviewContainer
} from './src/containers'

// If user is on Root URL then render Find My Organization page

	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
    		<Route path="/" component={LayoutLogin} />
    		<Route path="/signup" component={LayoutSignup} />
    		<Route path="/forgetpwd" component={LayoutForgetpwd} />
    		<Route path="/resetpwd" component={LayoutResetpwd} />

		    <Route path="/" component={RequireAuth(Layout)}>
		       <Route path="dashboard" component={DashboardContainer} />
		       <Route path="organization" component={OrganizationListContainer} />
		       <Route path="organization/companies" component={CompanyOverviewContainer} />
		       <Route path="organization/peoples" component={OrganizationUsers} />
               <Route path="settings/tags" component={TagList} />
               <Route path="settings/logo" component={CompaniesLogos} />
		       <Route path="settings/general" component={OrganizationGeneral} />


		       <Route path="task-templates" component={LayoutTaskTemplate}>
					<Route path="tasklists" component={ProjectTaskListsTemplateContainer} />
					{/*<Route path="tasklists/:tasklistId" component={ProjectTaskListContainer} />*/}
		       </Route>

		       <Route path="subscription" component={Subscription} />

               <Route path="demo" component={PageDemo} />

               <Route path="projects" component={ProjectsContainer} />

               <Route path="projects/:projectId" component={LayoutProject}>
               		<Route path="overview" component={ProjectOverviewContainer} />
					<Route path="tasklists" component={ProjectTaskListsContainer} />
					<Route path="tasklists/:tasklistId" component={ProjectTaskListContainer} />
					<Route path="tasks/:taskId" component={ProjectTaskContainer} />
					<Route path="messages" component={ProjectMessagesContainer} />
					<Route path="messages/:messageId" component={ProjectMessageContainer} />
					<Route path="files" component={ProjectFilesContainer} />
					<Route path="files/:fileId" component={ProjectFileContainer} />
					<Route path="people" component={ProjectPeopleContainer} />
               </Route>
               
		    </Route>

		  
		  </Router>
		</Provider>  
	), document.getElementById('root'))

