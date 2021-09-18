import { createStore } from 'vuex'
import { nanoid } from 'nanoid';

const store = createStore({
    state() {
        return {
            cards: [
                {
                    "status": "START",
                    "text": "Привет",
                    "buttons": [
                        {
                            "text": "Привет",
                            "to": "WHAT_WE_WILL_DO"
                        }
                    ]
                },
                {
                    "status": "WHAT_WE_WILL_DO",
                    "text": "Чем займемся?",
                    "buttons": [
                        {
                            "text": "Побалтаем?",
                            "to": "TALK"
                        },
                        {
                            "text": "Мне пора",
                            "to": "END"
                        }
                    ]
                },
                {
                    "status": "TALK",
                    "text": "Пока я тупой",
                    "buttons": [
                        {
                            "text": "Ну учись",
                            "to": "END"
                        }
                    ]
                },
                {
                    "status": "END",
                    "text": "Пока",
                    "buttons": []
                }
            ]
        }
    },
    mutations: {
        addCard(state) {
            state.cards.push(
                {

                    "status": nanoid(),
                    "text": "Текст сообщения",
                    "buttons": []

                }
            )
        }
    }
})

export interface ButtonData {
    text: string;
    to: string;
}

export interface CardData {
    status: string
    text: string
    buttons: ButtonData[]
}

export default store;