import * as containers from './containers';
import * as presentations from './presentations';

const {
    CredentialFormPlaneContainer: CredentialFormPlaneComponent,
    SettingsFormContainer: SettingsFormComponent,
    TypeFormContainer: TypeFormComponent,
    UserPermissionsPlaneContainer: UserPermissionsPlaneComponent
} = containers;

const {
    CredentialSelectInputView: CredentialSelectInputComponent,
    CredentialTextInputView: CredentialTextInputComponent,
    CredentialCheckboxInputView: CredentialCheckboxInputComponent,
    UserPermissionsTableView: UserPermissionsTableComponent,
    UserPermissionsRowView: UserPermissionsRowComponent,
    UserPermissionsPlaneContentView: UserPermissionsPlaneContentComponent
} = presentations;

export {
    CredentialFormPlaneComponent,
    SettingsFormComponent,
    TypeFormComponent,
    CredentialSelectInputComponent,
    CredentialTextInputComponent,
    CredentialCheckboxInputComponent,
    UserPermissionsTableComponent,
    UserPermissionsRowComponent,
    UserPermissionsPlaneComponent,
    UserPermissionsPlaneContentComponent,
    containers,
    presentations
};
