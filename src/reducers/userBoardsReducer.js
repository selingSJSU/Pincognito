import actionTypes from '../actions/types.js';

var recentlyUnfollowed = null;

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_USER_BOARDS:
			var newState = state.slice();
			for(var i=0; i<state.length; i++){
				if(state[i].boardID === action.payload.boardID){
					newState[i] = action.payload;
					return newState;
				}
			}

			if(recentlyUnfollowed === action.payload.boardID){
				recentlyUnfollowed = null;
				return state;
			}

			return state.concat(action.payload);
		case actionTypes.CREATE_USER_BOARD:
			return state;
		case actionTypes.STOP_FETCHING_USER_BOARDS:
			return [];
		case actionTypes.FETCH_USER_BOARD_IMAGE:
			var newState = state.slice();
			for(var i=0; i<state.length; i++){
				if(state[i].boardID === action.payload.boardID){
					newState[i] = action.payload;
					return newState;
				}
			}
			return state;
		case actionTypes.FETCH_USER_REMOVED_BOARDS:
			var newState = state.slice();
			var index = -1;
			for(var i=0; i<state.length; i++){
				if(state[i].boardID === action.payload){
					index = i;
				}
			}

			if(index >= 0){
				newState.splice(index, 1);
				recentlyUnfollowed = action.payload;
				return newState;
			}

			return state;
		case actionTypes.RESET_STATE:
			return [];

		case actionTypes.FOLLOW_BOARD:
			return state;
	}
	return state;
}