function qs(arr, lo, hi) {
    if (lo >= hi) {
        return;
    }
    var pivotIndex = partition(arr, lo, hi);
    qs(arr, lo, pivotIndex - 1);
    qs(arr, pivotIndex + 1, hi);
}
function partition(arr, lo, hi) {
    var pivot = arr[hi];
    var index = lo - 1;
    for (var i = lo; i < hi; ++i) {
        if (arr[i] <= pivot) {
            index++;
            var tmp = arr[i];
            arr[i] = arr[index];
            arr[index] = tmp;
        }
    }
    index++;
    arr[hi] = arr[index];
    arr[index] = pivot;
    return index;
}
;
function quick_sort(arr) {
    qs(arr, 0, arr.length - 1);
}
;
var a = [8, 7, 6, 4, 5];
quick_sort(a);
console.log(a);
