# Debugger failure scenarios

## Case 1: Step Into stops debugging (node 14)

```
Node version: v14.15.0
js-debug: js-debug-nightly v2020.11.2617
```

### Repro:

1. Run "Case 1" launch profile (see `.vscode/launch.json`)
2. _Result:_ Debugger will stop on `debugger` statement on line 2 of `index.js`
3. Click 'Step Into' debugger command
4. _Result:_ Execution moves to `console.log` on line 3
5. Click 'Step Into' debugger command
6. _Result:_ Debugging stops, execution completes

### Expected behaviour:

Step Into should step over and keep debugging if there isn't anything to step into.

### Trace log:

See [case1.log.json](case1.log.json)

---

## Case 2: Step Into goes all over the place (node 12)

```
Node version: v12.20.0
js-debug: js-debug-nightly v2020.11.2617
```

### Repro:

1. Run "Case 2" launch profile (see `.vscode/launch.json`)
2. _Result:_ Debugger will stop on `debugger` statement on line 2 of `index.js`
3. Click 'Step Into' debugger command
4. _Result:_ Execution moves to `console.log` on line 3
5. Click 'Step Into' debugger command (1)
6. _Result:_ Execution stays on line 3
7. Click 'Step Into' debugger command (2)
8. _Result:_ Execution stays on line 3
9. Click 'Step Into' debugger command (3)
10. _Result:_ Execution stays on line 3
11. Click 'Step Into' debugger command (4)
12. _Result:_ Execution stays on line 3
13. Click 'Step Into' debugger command (5)
14. _Result:_ Execution moves to line 8
15. Click 'Step Into' debugger command (6)
16. _Result:_ Execution moves to line 11
17. Click 'Step Into' debugger command (7)
18. _Result:_ Execution moves to line 5
19. Click 'Step Into' debugger command (8)
20. _Result:_ Execution stays on line 5
21. Click 'Step Into' debugger command (9)
22. _Result:_ Execution stays on line 5
23. Click 'Step Into' debugger command (10)
24. _Result:_ Execution stays on line 5
25. Click 'Step Into' debugger command (11)
26. _Result:_ Debugging completes

### Expected behaviour:

Step Into should step each line once only and follow logical execution flow, including the `.then` callback after execution of `main()`.

### Trace log:

See [case2.log.json](case2.log.json)

---

## Case 3a: Attach ignores skip_files

```
Node version: v12.20.0 and v14.15.0 (both tested)
js-debug: js-debug-nightly v2020.11.2617
```

## Repro

1. Run `node --inspect-brk index.js`
2. Run "Case 3" attach profile (see `.vscode/launch.json`)
3. Click "Continue" debugging command
4. _Result:_ debugging pauses at `debugger` statement on line 2
5. Click "Step Over" debugging command (1)
6. _Result:_ debugging moves to line 3
7. Click "Step Over" debugging command (2)
8. _Result:_ debugging moves to line 4
9. Click "Step Over" debugging command (3)
10. _Result:_ debugging moves to line 5
11. Click "Step Over" debugging command (4)
12. _Result:_ debugging moves to line 6
13. Click "Step Over" debugging command (5)
14. _Result:_ debugging jumps in to `_stream_writable.js` node internal

### Expected behaviour:

The `skipFiles` setting should be respected.

### Trace log:

See [case3a.log.json](case3a.log.json)

---

## Case 3b: Attach ignores skip_files (alternative)

```
Node version: v12.20.0 and v14.15.0 (both tested)
js-debug: js-debug-nightly v2020.11.2617
```

## Repro

1. Run `node --inspect-brk index.js`
2. Run "Case 3" attach profile (see `.vscode/launch.json`)
3. Click "Continue" debugging command
4. _Result:_ debugging pauses at `debugger` statement on line 2
5. Click "Step Into" debugging command (1)
6. _Result:_ debugging moves to line 3
7. Click "Step Into" debugging command (2)
8. _Result:_ debugging moves to `tty.js` node internal

### Expected behaviour:

The `skipFiles` setting should be respected.

### Trace log:

See [case3b.log.json](case3b.log.json)
