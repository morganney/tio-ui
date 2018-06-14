import React from 'react';
import { FormItem } from '@hivekit/form';
import PropTypes from 'prop-types';
import { Select } from '@hivekit/select';
import { AwsIcon, DockerIcon, JfrogIcon, PlaceholderIcon } from '@hivekit/icon';

const SelectDataSourceView = ({ input, label }) => {
    const dataSourceOptions = [
        { value: 'dr', label: 'Docker' },
        { value: 'dre', label: 'Docker EE' },
        { value: 'ecr', label: 'AWS Elastic Container Registry' },
        { value: 'jfa', label: 'JFrog Artifactory' }
    ];

    const iconRenderer = (props) => {
        const iconSize = 2;
        const iconMap = {
            dr: DockerIcon,
            dre: DockerIcon,
            ecr: AwsIcon,
            jfa: JfrogIcon
        };

        let IconComponent = PlaceholderIcon;

        if (iconMap[props.value]) {
            IconComponent = iconMap[props.value];
        }

        return <IconComponent size={iconSize} />;
    };

    const handleChangeEvent = (selection) => {
        input.onChange(selection.value);
    };

    let displayValue = dataSourceOptions[0].value;

    if (input.value) {
        displayValue = input.value;
    }

    return (
        <FormItem label={label} >
            <Select
                {...input}
                value={displayValue}
                iconRenderer={iconRenderer}
                options={dataSourceOptions}
                onChange={handleChangeEvent}>
            </Select>
        </FormItem>
    );
};

SelectDataSourceView.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    value: PropTypes.string
};

export {
    SelectDataSourceView
};
