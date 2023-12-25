// reducer.js
import {
	ADD_FIELD,
	REMOVE_FIELD,
	SET_FORM_NAME,
	ADD_RADIO_OPTION,
	REMOVE_RADIO_OPTION,
} from "./actions";

const initialState = {
	formName: "",
	fields: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FIELD:
			return {
				...state,
				fields: state.fields.map((field, index) =>
					index === action.payload.index
						? { ...field, ...action.payload.field }
						: field,
				),
			};
		case REMOVE_FIELD:
			return {
				...state,
				fields: state.fields.filter((_, index) => index !== action.payload),
			};
		case SET_FORM_NAME:
			return {
				...state,
				formName: action.payload,
			};
		case ADD_RADIO_OPTION:
			return {
				...state,
				fields: state.fields.map((field, index) =>
					index === action.payload.fieldIndex
						? {
								...field,
								options: [
									...field.options.slice(0, action.payload.optionIndex + 1),
									action.payload.option,
									...field.options.slice(action.payload.optionIndex + 1),
								],
						  }
						: field,
				),
			};
		case REMOVE_RADIO_OPTION:
			return {
				...state,
				fields: state.fields.map((field, index) =>
					index === action.payload.fieldIndex
						? {
								...field,
								options: field.options.filter(
									(_, i) => i !== action.payload.optionIndex,
								),
						  }
						: field,
				),
			};
		default:
			return state;
	}
};

export default reducer;
