import { CreateConnectorView } from './create-connector';
import { ConnectorFormBodyView } from './connector-form-body';
import { ConnectorFormFooterView } from './connector-form-footer';
import { TextInputView } from './text-input';
import { SelectDataSourceView } from './select-data-source';
import { CheckboxInputView } from './checkbox-input';

export {
    CreateConnectorView,
    ConnectorFormBodyView,
    ConnectorFormFooterView,

    // Connector form inputs, that expect to be wrapped in Redux-form HOCs
    TextInputView,
    SelectDataSourceView,
    CheckboxInputView
};
