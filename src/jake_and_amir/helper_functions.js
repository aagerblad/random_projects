function score_mapper(score) {
  if (score == "" || score == null || score.includes("N/A")) {
    return null;
  }
  s = 0;
  if (score.includes("F")) {
    s = 0;
  } else if (score.includes("D")) {
    s = 1;
  } else if (score.includes("C")) {
    s = 2;
  } else if (score.includes("B")) {
    s = 3;
  } else if (score.includes("A")) {
    s = 4;
  }
  if (score.includes("+")) {
    s += 0.333;
  } else if (score.includes("-")) {
    s -= 0.333;
  }
  return s;
}

var data_mapper = function (d) {
  jake_score = score_mapper(d["Jake Grade"]);
  amir_score = score_mapper(d["Amir Grade"]);
  guest_score = score_mapper(d["Guest \nGrade"]);

  both_score = null;

  if (jake_score == amir_score) {
    both_score = jake_score;
    jake_score = null;
    amir_score = null;
  }

  return {
    date: Date.parse(d["Date"]),
    no: d["No."],
    jake_score: jake_score,
    jake_grade: d["Jake Grade"],
    amir_score: amir_score,
    amir_grade: d["Amir Grade"],
    guest_name: d["Guest"],
    guest_score: guest_score,
    guest_grade: d["Guest \nGrade"],
    both_score: both_score,
    title: d["Title"].replace(/\"/g, ""),
  };
};
