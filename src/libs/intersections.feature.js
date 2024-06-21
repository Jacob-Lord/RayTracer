//create a new data structure called an intersection
export class Intersection {
    constructor(t, s) {
        this.t = t;
        this.object = s;
    }
}

export function intersections(xs) {
    insertionSort(xs); //ensure intersection list is sorted
    return xs;
}

export function hit(xs) {
    //xs list is pre-sorted, so find smallest non-negative by iterating thru
    for (let i = 0; i < (xs.length); i++) {
        if (xs[i].t >= 0) {
            return xs[i];
        }
    }
    return;
}

//sort intersection list using insertion sort (can be switched to different sorting algo. for better efficiency if scene demmands high n value)
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let currentValue = arr[i]
      let j
      for (j = i - 1; j >= 0 && arr[j].t > currentValue.t; j--) {
        arr[j + 1] = arr[j]
      }
      arr[j + 1] = currentValue
    }
    return arr
  }

