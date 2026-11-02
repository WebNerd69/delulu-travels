import * as ss from "simple-statistics";
import  chooseBoundMethod  from "./chooseBoundMethod.js";


const SD = (scores) => {
    const mu = ss.mean(scores);
    const sd = ss.standardDeviation(scores);

    const minScore = Math.floor(mu - 1 * sd);
    return minScore;
};

const percentile = (scores) => {
    const p60 = Math.floor(ss.quantile(scores, 0.6));
    return p60;
};

const lowerBoundValue = (scores) => {
    const {method} = chooseBoundMethod(scores);
    if (method === "sd") {
        const LBval = SD(scores);
        return LBval;
    } else if (method === "percentile") {
        const LBval = percentile(scores);
        return LBval;
    } else {
        return 60;
    }
};


export default lowerBoundValue;
