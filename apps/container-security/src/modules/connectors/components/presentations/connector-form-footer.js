import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { FormFooter } from '@hivekit/form';

import { CONNECTOR_REDUX_FORM } from 'tio-container-security/modules/connectors/constants';

class ConnectorFormFooterView extends Component {
    static propTypes = {
        // Presentation props
        onFormCancel: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,

        // i18n messages
        cancelText: PropTypes.string.isRequired,
        importText: PropTypes.string.isRequired
    }

    render () {
        const { onFormCancel, cancelText, importText, submit } = this.props;

        return (
            <FormFooter>
                <Button
                    mr={2}
                    kind='tertiary'
                    onClick={onFormCancel}>
                    {cancelText}
                </Button>

                <Button
                    kind='primary'
                    type='submit'
                    onClick={() => {
                        submit(CONNECTOR_REDUX_FORM);
                    }}>
                    {importText}
                </Button>
            </FormFooter>
        );
    }
}

export {
    ConnectorFormFooterView
};
