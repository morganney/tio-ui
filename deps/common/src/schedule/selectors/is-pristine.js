import { isPristine as isFormPristine } from 'redux-form';

import { STEM_NAME } from 'schedule/constants';

export const isPristine = isFormPristine(STEM_NAME);
