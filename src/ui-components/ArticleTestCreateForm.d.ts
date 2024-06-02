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
export declare type ArticleTestCreateFormInputValues = {
    image?: string;
    seasons?: string[];
    usage?: string;
    createdAt?: string;
    owner?: string;
};
export declare type ArticleTestCreateFormValidationValues = {
    image?: ValidationFunction<string>;
    seasons?: ValidationFunction<string>;
    usage?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArticleTestCreateFormOverridesProps = {
    ArticleTestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    seasons?: PrimitiveOverrideProps<SelectFieldProps>;
    usage?: PrimitiveOverrideProps<SelectFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArticleTestCreateFormProps = React.PropsWithChildren<{
    overrides?: ArticleTestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ArticleTestCreateFormInputValues) => ArticleTestCreateFormInputValues;
    onSuccess?: (fields: ArticleTestCreateFormInputValues) => void;
    onError?: (fields: ArticleTestCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArticleTestCreateFormInputValues) => ArticleTestCreateFormInputValues;
    onValidate?: ArticleTestCreateFormValidationValues;
} & React.CSSProperties>;
export default function ArticleTestCreateForm(props: ArticleTestCreateFormProps): React.ReactElement;
