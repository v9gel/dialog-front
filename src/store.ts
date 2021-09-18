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
                    ],
                    position: {
                        x: 100,
                        y: 100
                    }
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
                    ],
                    position: {
                        x: 100,
                        y: 200
                    }
                },
                {
                    "status": "TALK",
                    "text": "Пока я тупой",
                    "buttons": [
                        {
                            "text": "Ну учись",
                            "to": "END"
                        }
                    ],
                    position: {
                        x: 100,
                        y: 300
                    }
                },
                {
                    "status": "END",
                    "text": "Пока",
                    "buttons": [],
                    position: {
                        x: 100,
                        y: 400
                    }
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
                    "buttons": [],
                    position: {
                        x: Math.floor(Math.random() * (window.innerWidth - 300)),
                        y: Math.floor(Math.random() * (window.innerHeight - 100))
                    }

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
    position: {
        x: number,
        y: number
    }
}

export default store;