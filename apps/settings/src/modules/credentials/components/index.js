import * as containers from './containers';
import * as presentations from './presentations';

const {
    CredentialsContainer: CredentialsComponent,
    CredentialsPlaneContainer: CredentialsPlaneComponent,
    DeleteCredentialButtonContainer: DeleteCredentialButtonComponent
} = containers;

const {
    TableRowIconView: TableRowIconComponent
} = presentations;

export {
    CredentialsPlaneComponent,
    CredentialsComponent,
    DeleteCredentialButtonComponent,
    TableRowIconComponent,
    containers,
    presentations
};
