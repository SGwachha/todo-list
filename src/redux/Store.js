import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
    cards: [],
    model: '',
    datas: '',
};

const store = createReduxStore('todo-list', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_CARD':
                return {
                    ...state,
                    cards: [...state.cards, action.payload],
                };
            case 'DELETE_CARD':
                return {
                    ...state,
                    cards: state.cards.filter((_, index) => index !== action.payload),
                };
            case 'UPDATE_CARD':
                return {
                    ...state,
                    cards: state.cards.map((card, index) =>
                        index === action.payload.index ? action.payload.updatedCard : card
                    ),
                };
            case 'SET_MODEL':
                return {
                    ...state,
                    model: action.payload,
                };
            default:
                return state;
        }
    },
    actions: {
        setCard(card) {
            return {
                type: 'SET_CARD',
                payload: card,
            };
        },
        setModel(model) {
            return {
                type: 'SET_MODEL',
                payload: model,
            };
        },
        deleteCard(index) {
            return {
                type: 'DELETE_CARD',
                payload: index,
            };
        },
        updateCard(index, updatedCard) {
            return {
                type: 'UPDATE_CARD',
                payload: { index, updatedCard },
            };
        },
    },
    selectors: {
        getCard(state) {
            const { cards } = state;
            return cards;
        },
        getModel(state) {
            const { model } = state;
            return model;
        },
    },
});

register(store);

export default store;