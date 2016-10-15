import { connect } from 'react-redux'
import { fetchProjectMessages} from '../actions/action_project';
import { fetchCategoriesTypeMessage} from '../actions/action_category';

import ProjectMessages from '../components/ProjectMessages';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
        projectMessages: state.project.messages,
        categoryList: state.category.type_message_list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectMessages: (project_id) => {
            dispatch(fetchProjectMessages(project_id)).then((response) => {
                // dispatch(fetchCategoriesTypeMessage(project_id))
            });
        }
    }
}


const ProjectMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessages)

export default ProjectMessagesContainer
