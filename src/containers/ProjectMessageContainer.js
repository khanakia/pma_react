import { connect } from 'react-redux'
import { fetchProjectMessage, fetchProjectUsers, fetchComments} from '../actions/action_project';
import { fetchCategoriesTypeMessage} from '../actions/action_category';

import ProjectMessage from '../components/ProjectMessage';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
        projectMessage: state.project.message,
        projectUsers : state.project.users,
        commentsList : state.project.comments,
        categoryList : state.category.type_message_list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectMessage: (id) => {
            dispatch(fetchProjectMessage(id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        },

        fetchProjectUsers: (project_id) => {
            dispatch(fetchProjectUsers(project_id));
        },

        fetchCategoriesTypeMessage: (project_id) => {
            dispatch(fetchCategoriesTypeMessage(project_id))
        },

        fetchComments: (project_id, object_type, object_id) => {
            dispatch(fetchComments(project_id, object_type, object_id))
        }
    }
}


const ProjectMessageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessage)

export default ProjectMessageContainer
