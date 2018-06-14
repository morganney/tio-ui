import { connect } from 'react-redux';

import { DeleteCredentialButtonView } from '../presentations/delete-credential-button';
import { deleteCredentialAndDoPostRender } from '../../actions';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    deleteCredentialAndDoPostRender
};

const DeleteCredentialButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteCredentialButtonView);

export {
    DeleteCredentialButtonContainer
};
