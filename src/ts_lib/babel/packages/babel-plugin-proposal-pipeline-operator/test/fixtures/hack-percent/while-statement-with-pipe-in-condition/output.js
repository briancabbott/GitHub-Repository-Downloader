let i = 0;
let sum = 0;

while (_ref2 = i, (_ref = i = _ref2 + 1, _ref <= 10)) {
  var _ref, _ref2;

  sum += i;
}

expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
