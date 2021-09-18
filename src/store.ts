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
                            id: "fjf",
                            "text": "Привет",
                            "to": "WHAT_WE_WILL_DO",
                            position: {
                                x: 250,
                                y: 164
                            }
                        }
                    ],
                    position: {
                        x: 140,
                        y: 31
                    }
                },
                {
                    "status": "WHAT_WE_WILL_DO",
                    "text": "Чем займемся?",
                    "buttons": [
                        {
                            id: '43',
                            "text": "Побалтаем?",
                            "to": "TALK",
                            position: {

                            }
                        },
                        {
                            id: '53',
                            "text": "Мне пора",
                            "to": "END",
                            position: {

                            }
                        }
                    ],
                    position: {
                        x: 290,
                        y: 161
                    }
                },
                {
                    "status": "TALK",
                    "text": "Пока я тупой",
                    "buttons": [
                        {
                            id: '234',
                            "text": "Ну учись",
                            "to": "END",
                            position: {

                            }
                        }
                    ],
                    position: {
                        x: 51,
                        y: 366
                    }
                },
                {
                    "status": "END",
                    "text": "Пока",
                    "buttons": [],
                    position: {
                        x: 280,
                        y: 524
                    }
                }
            ],
            lines: []
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
        },
        changeCardPosition(state, payload) {
            const card = state.cards.find(e => {
                return e.status === payload.status;
            })

            card.position.x = payload.x
            card.position.y = payload.y



            // console.log(state.lines)
        },
        lineCalc(state) {
            state.lines.splice(0, state.lines.length);
            state.cards.map(c1 => {
                c1.buttons.map((b, index) => {
                    const end = state.cards.find(c2 => c2.status === b.to);
                    if (end) {
                        
                        const buttonWidth = (300 / c1.buttons.length) - ((c1.buttons.length - 1) * 5)
                        console.log(b.text, buttonWidth, index)


                        state.lines.push(
                            {
                                start: {
                                    x: c1.position.x + (buttonWidth/2) + ((buttonWidth + 5) * (index)),
                                    y: c1.position.y + 64
                                },
                                end: {
                                    x: end.position.x + 150,
                                    y: end.position.y
                                }
                            }
                        )
                    }
                })
            })

            // state.lines = lines;
            // state.lines.reverse()
        }
    },
    // getters: {
    //     lines1: (state) => {
    //         const lines = [];
    //         state.cards.map(c1 => {
    //             c1.buttons.map(b => {
    //                 const end = state.cards.find(c2 => c2.status === b.to);
    //                 if (end) {
    //                     lines.push(
    //                         {
    //                             start: b.position,
    //                             end: {
    //                                 x: end.position.x + 150,
    //                                 y: end.position.y
    //                             }
    //                         }
    //                     )
    //                 }
    //             })
    //         })
    //         console.log(lines)
    //         return lines;
    //     },
    //     line2: (state) => {
    //         lineCalc(state)
    //     }
    // }
})

store.commit('lineCalc')

export interface Coordinates {
    x: number,
    y: number
}

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