import {Text} from "react-native-paper";
import React from "react";
import {Controller} from "react-hook-form";
import {NumericTextInput} from "@/components/helpers/NumericTextInput";
import {NumericTextInputFormWrapperProps} from "@/assets/types";

/**
 * React Hook Form wrapper for numeric inputs with validation.
 *
 * @param control Form control
 * @param name Field name
 * @param value Field value
 * @param label Field label
 * @param setValue Value setter
 * @param errorValue Validation error
 * @param style Custom styles
 * @param customValidation Optional custom validation message
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