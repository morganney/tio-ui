import { Utils } from 'tio-alloy';

import { CreateConnectorContainer, ConnectorFormBodyContainer, ConnectorFormFooterContainer } from './containers';
import {
    // Views to be binded to a container
    CreateConnectorView,
    ConnectorFormBodyView,
    ConnectorFormFooterView,

    // Views with no binding container
    TextInputView as TextInputComponent,
    SelectDataSourceView as SelectDataSourceComponent,
    CheckboxInputView as CheckboxInputComponent
} from './presentations';

const CreateConnectorComponent = Utils.bindPresentationToContainer(CreateConnectorView, CreateConnectorContainer);
const ConnectorFormBodyComponent = Utils.bindPresentationToContainer(ConnectorFormBodyView, ConnectorFormBodyContainer);
const ConnectorFormFooterComponent = Utils.bindPresentationToContainer(
    ConnectorFormFooterView,
    ConnectorFormFooterContainer
);

export {
    CreateConnectorComponent,
    ConnectorFormBodyComponent,
    ConnectorFormFooterComponent,
    TextInputComponent,
    SelectDataSourceComponent,
    CheckboxInputComponent
};
