import {Text} from "react-native-paper";
import React from "react";
import {Controller} from "react-hook-form";
import {NumericTextInput} from "@/components/NumericTextInput";
export function NumericTextInputFormWrapper({control, name, value, label, setValue, errorValue,
                                     style, customValidation}:
                                 {control?:any, name:any, value:any, label?:any, setValue:any, errorValue?:any,
                                     style?:any, customValidation?:any}) {

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{
                    validate: () => {
                        if (Number(value) < 0) return "${label} must be a positive number";
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