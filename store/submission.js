export const state = () => ({
  data: {
    _id: '',
    exam_start: 0,
    exam_end: 0,
    answers: []
  }
})

export const mutations = {
  addAnswer (state, text) {
    state.data.answers.push(text)
  },
  setAnswers(state, ans) {
    state.data.answers = ans
  },
  editAnswer (state, {id,value}) {
    Object.assign(state.data.answers[id], value)
  },
  setData (state, data) {
    state.data = data
  }


}
