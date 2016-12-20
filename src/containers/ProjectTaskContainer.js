import { connect } from 'react-redux'
import { fetchProjectTask, fetchProjectUsers, fetchComments } from '../actions/action_project';

import ProjectTask from '../components/ProjectTask';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
        projectTask: state.project.task,
        projectUsers : state.project.users,
        commentsList : state.project.comments
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectTask: (id) => {
            dispatch(fetchProjectTask(id)).then((response) => {
            });
        },

        fetchProjectUsers: (project_id) => {
            dispatch(fetchProjectUsers(project_id));
        },

        fetchComments: (project_id, object_type, object_id) => {
            dispatch(fetchComments(project_id, object_type, object_id))
        }
    }
}


const ProjectTaskContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTask)

export default ProjectTaskContainer
