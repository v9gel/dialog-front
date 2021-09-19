import {createStore} from 'vuex'
import {nanoid} from 'nanoid';

const mousePosition = {
    x: 0,
    y: 0
}

const store = createStore({
    state() {
        return {
            lineDraged: false,
            mousePosition: {
                x: 0,
                y: 0
            },
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
                            position: {}
                        },
                        {
                            id: '53',
                            "text": "Мне пора",
                            "to": "END",
                            position: {}
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
                            position: {}
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
        },
        changeMousePosition(state, payload) {
            state.mousePosition.x = payload.x
            state.mousePosition.y = payload.y
        },
        lineCalc(state) {
            state.lines.splice(0, state.lines.length);
            state.cards.map(c1 => {
                c1.buttons.map((b, index) => {
                    const end = state.cards.find(c2 => c2.status === b.to || b.to === 'MOUSE');
                    if (end) {
                        const buttonWidth = (300 / c1.buttons.length) - ((c1.buttons.length - 1) * 5)
                        // console.log(b.to)

                        let endLine = {
                            x: end.position.x + 150,
                            y: end.position.y
                        }
                        if (b.to === 'MOUSE') {
                            endLine.x = state.mousePosition.x;
                            endLine.y = state.mousePosition.y;
                            // console.log(111111)
                        }

                        state.lines.push(
                            {
                                start: {
                                    x: c1.position.x + 300,
                                    y: c1.position.y + c1.height + (37/2) + 5 + (index * (37 + 5))
                                },
                                end: endLine
                                // end: {
                                //     x: end.position.x + 150,
                                //     y: end.position.y
                                // }
                            }
                        )
                    }
                })
            })
        },
        updateCardHeight(state, payload){
            const card = state.cards.find(e => e.status === payload.status)
            card.height = payload.height;
        },
        addButton(state, payload) {
            const card = state.cards.find(e => e.status === payload)
            card.buttons.push({
                id: nanoid(),
                "text": "Кнопка",
                "to": null,
                position: {}
            })
        },
        editButton(state, payload) {
            const card = state.cards.find(e => e.status === payload.cardStatus);
            const button = card.buttons.find(e => e.id === payload.buttonId);

            if (payload.to === 'MOUSE') {
                state.lineDraged = true;
            }
            button.to = payload.to;
            card.buttons.reverse().reverse()
        },
        removeDragedLine(state, payload) {
            state.cards.map(c1 => {
                const button = c1.buttons.map(b => {
                    if (b.to === 'MOUSE') {
                        b.to = payload;
                    }
                })
                // if (end) {
                //     const buttonWidth = (300 / c1.buttons.length) - ((c1.buttons.length - 1) * 5)
                //     // console.log(b.to)

                //     let endLine = {
                //         x: end.position.x + 150,
                //         y: end.position.y
                //     }
                //     if (b.to === 'MOUSE') {
                //         endLine.x = state.mousePosition.x;
                //         endLine.y = state.mousePosition.y;
                //         // console.log(111111)
                //     }

                //     state.lines.push(
                //         {
                //             start: {
                //                 x: c1.position.x + (buttonWidth / 2) + ((buttonWidth + 5) * (index)),
                //                 y: c1.position.y + 64
                //             },
                //             end: endLine
                //             // end: {
                //             //     x: end.position.x + 150,
                //             //     y: end.position.y
                //             // }
                //         }
                //     )
                // }
            })
        }
        // addLine(state, payload) {

        // }
    },
})

store.commit('lineCalc')

// window.addEventListener(
//     'mousemove', e => {
//         mousePosition.x = e.offsetX;
//         mousePosition.y = e.offsetY;
//         store.commit('lineCalc')
//     }

// )

export interface Coordinates {
    x: number,
    y: number
}

export interface ButtonData {
    id: string;
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
    },
    height: number
}


export default store;