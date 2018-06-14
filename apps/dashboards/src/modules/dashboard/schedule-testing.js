// TODO: remove this file when done developing tio-common.schedule

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@hivekit/button';
import { Plane } from '@hivekit/plane';
import { Flex, Box } from '@hivekit/layout';
import { Form, FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';
import { TimeIcon } from '@hivekit/icon';
import { Field, reduxForm } from 'redux-form';

import { schedule } from 'tio-common';
import { Utils } from 'tio-alloy';

const { components: { ScheduleComponent } } = schedule;

const Input = ({ input }) => {
    const props = {
        ...input,
        placeholder: 'Enter some text'
    };

    return (
        <FormItem>
            <TextInput { ...props } />
        </FormItem>
    );
};
Input.propTypes = {
    input: PropTypes.object.isRequired
};

class Schedule extends Component {
    static propTypes = {
        summary: PropTypes.string.isRequired,
        getTimezones: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        scheduleIsValid: PropTypes.bool.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            display: 'closed',
            showForm: false
        };

        this.onClickButton = this.onClickButton.bind(this);
        this.openPreview = this.openPreview.bind(this);
    }

    componentDidMount () {
        this.props.getTimezones();
    }

    onClickButton () {
        this.setState({ display: 'partial' });
    }

    openPreview () {
        const { handleSubmit } = this.props;
        const config = {
            schedule: {
                enabled: true,
                repeatRule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR',
                start: 'TZID=US/Pacific:20180618T130000',
                type: 'ical'
            }
        };
        const renderForm = () => {
            return (
                <Fragment>
                    <Form onSubmit={handleSubmit}>
                        <ScheduleComponent config={config} />
                        <Field
                            name='scheduleTesting'
                            component={Input}
                        />
                        <Button kind='primary' type='submit' disabled={!this.props.scheduleIsValid}>Submit</Button>
                    </Form>
                    <h3>Exports Summary</h3>
                    <p>{this.props.summary}</p>
                </Fragment>
            );
        };
        const renderAction = () => {
            const html = schedule.utils.summary(config.schedule, true);

            return (
                <Fragment>
                    <Flex>
                        <Box width={1}>
                            <Button kind='primary' onClick={() => {
                                this.setState({ showForm: true });
                            }}>
                                <TimeIcon />
                            </Button>
                            <Button>
                                cancel
                            </Button>
                        </Box>
                    </Flex>
                    <Flex>
                        <Box width={1} dangerouslySetInnerHTML={{ __html: html }} />
                    </Flex>
                </Fragment>
            );
        };

        return (
            <Fragment>
                { !this.state.showForm && renderAction() }
                { this.state.showForm && renderForm() }
            </Fragment>
        );
    }

    render () {
        return (
            <Fragment>
                <Flex>
                    <Box mx='auto' my={100}>
                        <Button onClick={this.onClickButton}>
                            Open plane
                        </Button>
                    </Box>
                </Flex>
                <Plane preview={this.openPreview} display={this.state.display} onChange={(state) => {
                    if (state === 'closed') {
                        this.setState({ showForm: false });
                    }
                }}>
                    Stuff in Plane
                </Plane>
            </Fragment>
        );
    }
}

const payloadSelector = schedule.utils.createPayloadSelector((values) => {
    // Just to test that the store values don't change
    values.startDate = 'foobar';

    return { ...values, decorated: true };
});
const mapStateToProps = (state) => {
    const scheduleIsValid = schedule.selectors.isValid(state);

    return {
        scheduleIsValid,
        summary: schedule.selectors.summary(state),
        onSubmit: (values, dispatch) => {
            if (scheduleIsValid) {
                dispatch({
                    type: 'schedule-testing/POST-PUT-form-data',
                    payload: {
                        myAppsFormValues: values,
                        scheduleData: {
                            payload: payloadSelector(state)
                        }
                    }
                });
            }
        }
    };
};

const ScheduleTesting = Utils.compose(
    connect(mapStateToProps, { getTimezones: schedule.actions.getTimezones }),
    reduxForm({ form: 'scheduleTesting' })
)(Schedule);

export {
    ScheduleTesting
};
