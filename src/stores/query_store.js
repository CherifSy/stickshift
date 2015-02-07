var Dispatcher = require('../dispatcher.js'),
  QueryConstants = require('../constants/query_constants.js'),
  makeStore = require('../make_store.js');

var _results = [];

var QueryStore = makeStore({
  all: () => _results,
  getByPath: (path) => {
    var r = _results.filter(r => r.path === path);
    if (r.length) return r[0];
  },
  dispatcherIndex: Dispatcher.register(payload => {
    var action = payload.action;
    switch (action.actionType) {
      case QueryConstants.QUERY_LISTED:
        _results = action.value;
        break;
      default:
        return true;
    }
    QueryStore.emitChange(action.actionType);
    return true;
  })
});

QueryStore.setMaxListeners(1000);
module.exports = QueryStore;
