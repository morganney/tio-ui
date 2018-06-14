import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Utils } from 'tio-alloy';
import { parse, getDatetimeInitialValues } from 'schedule/utils';
import {
    values,
    isPristine
} from 'schedule/selectors';
import {
    BRANCH_NAME,
    STEM_NAME
} from 'schedule/constants';
import {
    weekdays,
    repeatBy,
    frequencies
} from 'schedule/initialization-data';

import { ScheduleLifecycle } from './lifecycle';

const mapStateToProps = (state, { config: { schedule } }) => {
    const slice = state[BRANCH_NAME][STEM_NAME];
    const timezones = slice.timezones.map((zone) => {
        const { name, value } = zone;
        const label = name.replace(/_/gi, ' ');

        return {
            label,
            value
        };
    });
    const formValues = values(state);
    const pristine = isPristine(state);
    let initialValues = {
        enabled: false,
        frequency: frequencies[0].value,
        interval: 1,
        timezone: 'Zulu',
        repeatOn: [weekdays[(new Date()).getDay()].value],
        repeatBy: repeatBy[0].value,
        ...getDatetimeInitialValues()
    };

    if (pristine && schedule) {
        initialValues = { ...initialValues, ...parse(schedule) };
    }

    return {
        timezones,
        initialValues,
        frequency: formValues ? formValues.frequency : initialValues.frequency
    };
};
const ScheduleContainer = Utils.compose(
    connect(mapStateToProps),
    reduxForm({
        form: STEM_NAME,
        destroyOnUnmount: false
    })
)(ScheduleLifecycle);

export {
    ScheduleContainer as ScheduleComponent
};
