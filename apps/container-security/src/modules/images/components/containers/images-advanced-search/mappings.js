import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { ImagesTableMessages } from 'tio-container-security/modules/images/messages';
import { fetchImages, setAdvancedSearchFilters } from 'tio-container-security/modules/images/actions';
import { filters } from 'tio-container-security/modules/images/filters/images-advanced-search';

import { ImagesAdvancedSearchLifecycles } from './lifecycles';

import { BRANCH_NAME, STEM_NAME } from '../../../constants';

const mapStateToProps = (state, props) => {
    const {
        images,
        imagesFetching,
        advancedSearchFilters
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const { imagesPlaneFullHeader } = ImagesTableMessages;

    // il8n messages
    const searchRecordLabel = intl.formatMessage(imagesPlaneFullHeader);

    return {
        images,
        imagesFetching,
        advancedSearchFilters,
        filters,
        searchRecordLabel
    };
};

const mapDispatchToProps = {
    fetchImages,
    setAdvancedSearchFilters
};

const ImagesAdvancedSearchContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(ImagesAdvancedSearchLifecycles)
);

export {
    ImagesAdvancedSearchContainer
};
