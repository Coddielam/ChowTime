import { useEffect, useRef } from "react";

import { useRef } from 'react';

export function useEffectDelayed (callback, delay) {

    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current();
    }, [savedCallback])
}