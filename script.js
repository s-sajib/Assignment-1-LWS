// select add Match elements
const addMatchButton = document.querySelector(".lws-addMatch");
addMatchButton.addEventListener("click", addMatch);

const resetButton = document.querySelector(".lws-reset");
resetButton.addEventListener("click", reset);
// initial state
const initialState = [
  {
    value: 120,
  },
];

// create reducer function
function matchReducer(state = initialState, action) {
  if (action.type === "add") {
    return [...state, { value: 120 }];
  } else if (action.type === "increment") {
    let duplicateState = [...state];
    duplicateState[action.payload.index] = {
      value:
        Number(duplicateState[action.payload.index].value) +
        Number(action.payload.value),
    };
    return duplicateState;
  } else if (action.type === "decrement") {
    let duplicateState = [...state];
    const result =
      Number(duplicateState[action.payload.index].value) -
      Number(action.payload.value);
    duplicateState[action.payload.index] = {
      value: result < 0 ? 0 : result,
    };
    return duplicateState;
  } else if (action.type === "reset") {
    let duplicateState = [...state];
    duplicateState.map((state) => (state.value = 120));
    return duplicateState;
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(matchReducer);

// to render Rows
const renderRows = () => {
  const currentStates = store.getState();
  const matchContainer = document.getElementById("matchContainer");
  const clonedMatch = document.querySelector(".match").cloneNode(true);
  if (currentStates.length === 1) {
    matchContainer.innerHTML = "";
  }
  currentStates.map((state, index) => {
    clonedMatch.querySelector(".lws-matchName").innerText = `Match ${
      index + 1
    }`;
    clonedMatch
      .querySelector(".lws-increment")
      .setAttribute("name", `increment-${index + 1}`);
    clonedMatch
      .querySelector(".lws-increment")
      .setAttribute("id", `increment-${index + 1}`);

    clonedMatch.querySelector(".lws-increment").value = null;

    clonedMatch
      .querySelector(".lws-decrement")
      .setAttribute("name", `decrement-${index + 1}`);
    clonedMatch.querySelector(".lws-decrement").value = null;
    clonedMatch.querySelector(".lws-singleResult").innerText = state.value;
    clonedMatch
      .querySelector(".lws-singleResult")
      .setAttribute("name", `result-${index + 1}`);
    matchContainer.appendChild(clonedMatch);
  });
  document
    .querySelectorAll(".lws-increment")
    ?.forEach((field) => field.addEventListener("keydown", increaseScore));
  document
    .querySelectorAll(".incrementForm")
    ?.forEach((field) =>
      field.addEventListener("submit", (event) => event.preventDefault())
    );
  document
    .querySelectorAll(".lws-decrement")
    ?.forEach((field) => field.addEventListener("keydown", decreaseScore));
  document
    .querySelectorAll(".decrementForm")
    ?.forEach((field) =>
      field.addEventListener("submit", (event) => event.preventDefault())
    );
};

renderRows();

function addMatch() {
  store.dispatch({ type: "add" });
  renderRows();
}

function increaseScore(event) {
  if (event.key === "Enter" || event.key === "Enter") {
    store.dispatch({
      type: "increment",
      payload: {
        index: Number(event.target.name.split("-")[1]) - 1,
        value: event.target.value,
      },
    });
  }
}
function decreaseScore(event) {
  if (event.key === "Enter" || event.key === "Enter") {
    store.dispatch({
      type: "decrement",
      payload: {
        index: Number(event.target.name.split("-")[1]) - 1,
        value: event.target.value,
      },
    });
  }
}

function updateScores() {
  const scoreElements = document.querySelectorAll(".lws-singleResult");
  const scores = store.getState();
  scoreElements?.forEach((scoreElement, index) => {
    scoreElement.innerText = scores[index].value;
  });
}

function cleanInputFields() {
  const incrementFields = document.querySelectorAll(".lws-increment");
  const decrementFields = document.querySelectorAll(".lws-decrement");
  incrementFields?.forEach((field) => (field.value = null));
  decrementFields?.forEach((field) => (field.value = null));
}

function reset() {
  store.dispatch({ type: "reset" });
}

store.subscribe(updateScores);
store.subscribe(cleanInputFields);
