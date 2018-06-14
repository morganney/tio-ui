import { connect } from 'react-redux';
import { compose } from 'recompose';

import { setSpecificRepositoryFilters } from 'tio-container-security/modules/policies/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/policies/constants';
import * as repositoriesApi from 'tio-container-security/modules/repositories';

import { SpecificRepositoryInputLifecycles } from './lifecycles';

const {
    BRANCH_NAME: repositoriesBranch,
    STEM_NAME: repositoriesStem
} = repositoriesApi.constants;
const { fetchRepositories } = repositoriesApi.actions;
const mapStateToProps = (state) => {
    const { specificRepositoryFilters } = state[BRANCH_NAME][STEM_NAME];
    const { repositories } = state[repositoriesBranch][repositoriesStem];

    return {
        // Redux data
        specificRepositoryFilters,
        repositories
    };
};
const mapDispatchToProps = {
    setSpecificRepositoryFilters,
    fetchRepositories
};
const SpecificRepositoryInputContainer = compose(
    connect(mapStateToProps, mapDispatchToProps)
)(SpecificRepositoryInputLifecycles);

export {
    SpecificRepositoryInputContainer
};
