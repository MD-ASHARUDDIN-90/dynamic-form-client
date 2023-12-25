// actions.js
export const ADD_FIELD = "ADD_FIELD";
export const REMOVE_FIELD = "REMOVE_FIELD";
export const SET_FORM_NAME = "SET_FORM_NAME";
export const ADD_RADIO_OPTION = "ADD_RADIO_OPTION";
export const REMOVE_RADIO_OPTION = "REMOVE_RADIO_OPTION";

export const addField = (field, index) => ({
	type: ADD_FIELD,
	payload: { field, index },
});

export const removeField = (index) => ({
	type: REMOVE_FIELD,
	payload: index,
});

export const setFormName = (formName) => ({
	type: SET_FORM_NAME,
	payload: formName,
});

export const addRadioOption = (fieldIndex, option, optionIndex) => ({
	type: ADD_RADIO_OPTION,
	payload: { fieldIndex, option, optionIndex },
});

export const removeRadioOption = (fieldIndex, optionIndex) => ({
	type: REMOVE_RADIO_OPTION,
	payload: { fieldIndex, optionIndex },
});
