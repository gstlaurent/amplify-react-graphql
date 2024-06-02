/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OutfitCreateFormInputValues = {
    createdAt?: string;
    owner?: string;
    season?: string;
};
export declare type OutfitCreateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OutfitCreateFormOverridesProps = {
    OutfitCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type OutfitCreateFormProps = React.PropsWithChildren<{
    overrides?: OutfitCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OutfitCreateFormInputValues) => OutfitCreateFormInputValues;
    onSuccess?: (fields: OutfitCreateFormInputValues) => void;
    onError?: (fields: OutfitCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OutfitCreateFormInputValues) => OutfitCreateFormInputValues;
    onValidate?: OutfitCreateFormValidationValues;
} & React.CSSProperties>;
export default function OutfitCreateForm(props: OutfitCreateFormProps): React.ReactElement;
