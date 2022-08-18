// start of result sorting
export const ResultSorter = (...argument) => {
  console.log("sorting now");
  var args = argument,
    array = args[0],
    case_sensitive,
    keys_length,
    key,
    desc,
    a,
    b,
    i;

  if (typeof argument[argument.length - 1] === "boolean") {
    case_sensitive = argument[argument.length - 1];
    keys_length = argument.length - 1;
  } else {
    case_sensitive = false;
    keys_length = argument.length;
  }

  return array?.sort(function (obj1, obj2) {
    for (i = 1; i < keys_length; i++) {
      key = args[i];
      if (typeof key !== "string") {
        desc = key[1];
        key = key[0];
        a = obj1[args[i][0]];
        b = obj2[args[i][0]];
      } else {
        desc = false;
        a = obj1[args[i]];
        b = obj2[args[i]];
      }

      if (case_sensitive === false && typeof a === "string") {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }

      if (!desc) {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
      }
    }
    return 0;
  });
}; //end of objSort() function
