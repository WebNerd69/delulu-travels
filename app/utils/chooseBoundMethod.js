import * as ss from "simple-statistics";

const chooseBoundMethod = (scores, k = 1) =>{
  const n = scores.length;
  const mu = ss.mean(scores);
  const med = ss.median(scores);
  const sd = ss.standardDeviation(scores);
  const skew = ss.sampleSkewness(scores);

  const q1 = ss.quantile(scores, 0.25);
  const q3 = ss.quantile(scores, 0.75);
  const iqr = q3 - q1;
  const outliers = scores.filter(
    (x) => x < q1 - 1.5 * iqr || x > q3 + 1.5 * iqr
  ).length;

  const minSD = mu - k * sd;
  const passShare = scores.filter((x) => x >= minSD).length / n;

  const checks = {
    enoughData: n >= 30,
    symmetric: Math.abs(mu - med) / sd < 0.2,
    lowSkew: Math.abs(skew) < 0.5,
    noOutliers: outliers === 0,
  };

  const useSD = Object.values(checks).every(Boolean);
  return {method: useSD ? "sd" : "percentile"};
}

export default chooseBoundMethod