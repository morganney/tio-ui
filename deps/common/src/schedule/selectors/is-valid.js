import { isValid as isFormValid } from 'redux-form';

import { STEM_NAME } from 'schedule/constants';

export const isValid = isFormValid(STEM_NAME);
