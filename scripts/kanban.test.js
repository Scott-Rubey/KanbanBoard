const kanban = require('./kanban');

test('tests populateBacklog for error', () => {
    expect(() => kanban.populateBacklog()).toThrow();
  });