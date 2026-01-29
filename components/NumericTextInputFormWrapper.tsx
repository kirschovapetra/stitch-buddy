import {Text} from "react-native-paper";
import React from "react";
import {Controller} from "react-hook-form";
import {NumericTextInput} from "@/components/NumericTextInput";
import {NumericTextInputFormWrapperProps} from "@/assets/types";

/**
 *
 * @param control
 * @param name
 * @param value
 * @param label
 * @param setValue
 * @param errorValue
 * @param style
 * @param customValidation
 * @constructor
 */
export function NumericTextInputFormWrapper({control, name, value, label, setValue, errorValue, style, customValidation}
                                            :NumericTextInputFormWrapperProps) {

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{
                    validate: () => {
                        if (Number(value) < 0) return `${label} must be a positive number`;
                        if (customValidation !== undefined) return customValidation;
                        return true;
                    }
                }}
                render={(field) => (
                    <NumericTextInput
                        {...field}
                        value={value}
                        label={label}
                        setValue={setValue}
                        style={style}
                        errorValue={errorValue}
                    />
                )}
            />
            {errorValue && <Text style={{ color: 'red' }}>{errorValue.message}</Text>}
        </>
    );
}