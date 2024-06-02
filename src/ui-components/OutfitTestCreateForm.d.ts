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
export declare type OutfitTestCreateFormInputValues = {
    createdAt?: string;
    owner?: string;
    season?: string;
};
export declare type OutfitTestCreateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OutfitTestCreateFormOverridesProps = {
    OutfitTestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type OutfitTestCreateFormProps = React.PropsWithChildren<{
    overrides?: OutfitTestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OutfitTestCreateFormInputValues) => OutfitTestCreateFormInputValues;
    onSuccess?: (fields: OutfitTestCreateFormInputValues) => void;
    onError?: (fields: OutfitTestCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OutfitTestCreateFormInputValues) => OutfitTestCreateFormInputValues;
    onValidate?: OutfitTestCreateFormValidationValues;
} & React.CSSProperties>;
export default function OutfitTestCreateForm(props: OutfitTestCreateFormProps): React.ReactElement;
