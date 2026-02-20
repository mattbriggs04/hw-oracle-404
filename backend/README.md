## Adding a new homework:
  1. Create homework_solutions/foo.py with your implementation
  2. Create app/homeworks/foo.py that defines the schema, wires the oracle
  function, and calls registry.register()
  3. Import it in app/main.py (import app.homeworks.foo)
