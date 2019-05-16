export interface ComparatorObject<T>{
    isLessThan: (item2: T) => boolean,
    isGreaterThan: (item2: T) => boolean,
    isEqualTo: (item2: T) => boolean
}

export type Comparator<T> = (item: T) => ComparatorObject<T>