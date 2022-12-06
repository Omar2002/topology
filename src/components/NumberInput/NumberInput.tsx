import * as React from 'react';
import {ChangeEvent} from 'react';

interface NumberInputProps {
    value: number;
    enabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    convert?: (value: string) => number;
    onChange: (value: number) => void;
}

export const NumberInput = (props: NumberInputProps) => {
    const {
        onChange,
        value,
        enabled = true,
        convert = Number.parseFloat,
        min = -Infinity,
        max = Infinity,
        step,
    } = props;

    const onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newValue = Math.min(max, Math.max(min, convert(e.currentTarget.value)));
        onChange(Number.isNaN(newValue) ? 0 : newValue);
    }, [onChange]);

    return (
        <input
            type='number'
            readOnly={!enabled}
            onChange={onChangeHandler}
            value={value}
            step={step}
        />
    );
}
